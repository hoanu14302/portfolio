import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      recipientEmail,
      amount,
      effectName,
      effectTag,
      effectDescription,
      pythonCode,
      transactionRef,
      senderNote,
    } = body;

    if (!recipientEmail || !recipientEmail.includes("@")) {
      return NextResponse.json(
        { error: "Vui lòng nhập địa chỉ email hợp lệ để nhận mã nguồn." },
        { status: 400 }
      );
    }

    const orderId = transactionRef || `EFF-${Date.now().toString(36).toUpperCase()}`;
    const formattedAmount = Number(amount || 50000).toLocaleString("vi-VN") + " VNĐ";

    // 1. Ghi nhận giao dịch vào Supabase nếu có cấu hình
    if (isSupabaseConfigured) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/effect_orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            order_id: orderId,
            recipient_email: recipientEmail,
            amount: Number(amount || 50000),
            effect_name: effectName,
            status: "paid_confirmed",
            created_at: new Date().toISOString(),
          }),
        });
      } catch (dbErr) {
        console.warn("Could not log order to Supabase:", dbErr);
      }
    }

    // 2. Gửi email qua SMTP App Password (Gmail / Custom SMTP) hoặc Resend API
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASSWORD || process.env.EMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSentViaApi = false;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b; background: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px;">
          <h2 style="color: #4F46E5; margin: 0; font-size: 20px;">ĐÀO HOA NỮ — PYTHON IMAGE EFFECTS STUDIO</h2>
          <p style="color: #64748b; font-size: 14px; margin-top: 5px;">Mã đơn hàng: <strong>${orderId}</strong></p>
        </div>
        
        <p>Xin chào quý khách,</p>
        <p>Cảm ơn bạn đã ủng hộ và thanh toán số tiền <strong>${formattedAmount}</strong> cho hiệu ứng ảnh Python <strong>"${effectName}"</strong>.</p>
        
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #cbd5e1;">
          <p style="margin: 0 0 8px 0; font-weight: bold; color: #1e293b;">Thông tin hiệu ứng:</p>
          <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px;">
            <li><strong>Tên:</strong> ${effectName}</li>
            <li><strong>Phân loại:</strong> ${effectTag || "AI Custom Effect"}</li>
            <li><strong>Mô tả:</strong> ${effectDescription || "Không có mô tả"}</li>
          </ul>
        </div>

        <p style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Mã nguồn Python OpenCV & NumPy:</p>
        <div style="background: #0f172a; color: #38bdf8; padding: 16px; border-radius: 8px; overflow-x: auto; font-family: monospace; font-size: 13px; margin: 0 0 20px 0;">
          <pre style="margin: 0; white-space: pre-wrap;">${pythonCode}</pre>
        </div>

        <p style="font-size: 13px; color: #64748b; line-height: 1.6;">Nếu bạn có nhu cầu tích hợp sâu vào hệ thống hoặc cần viết thêm module theo yêu cầu, vui lòng liên hệ Zalo: <strong>0967.223.771</strong> hoặc email <strong>hoanu14302@gmail.com</strong>.</p>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="text-align: center; font-size: 12px; color: #94a3b8; margin: 0;">© 2026 Đào Hoa Nữ Studio. All rights reserved.</p>
      </div>
    `;
    const emailSubject = `[Bàn Giao Mã Nguồn Python] Hiệu ứng: ${effectName} (Đơn hàng #${orderId})`;

    // Ưu tiên 1: Gửi qua Gmail / SMTP App Password bằng nodemailer nếu có cấu hình
    if (smtpUser && smtpPass) {
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: Number(process.env.SMTP_PORT || 465),
          secure: Number(process.env.SMTP_PORT || 465) === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Dao Hoa Nu Studio" <${smtpUser}>`,
          to: recipientEmail,
          subject: emailSubject,
          html: emailHtml,
        });

        emailSentViaApi = true;
      } catch (smtpErr) {
        console.warn("SMTP App Password delivery error:", smtpErr);
      }
    }

    // Ưu tiên 2: Fallback qua Resend API nếu chưa gửi được bằng SMTP và có RESEND_API_KEY
    if (!emailSentViaApi && resendApiKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Dao Hoa Nu Studio <effects@resend.dev>",
            to: [recipientEmail],
            subject: emailSubject,
            html: emailHtml,
          }),
        });

        if (resendRes.ok) {
          emailSentViaApi = true;
        }
      } catch (mailErr) {
        console.warn("Resend API delivery error:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      orderId,
      emailSentViaApi,
      recipientEmail,
      amount: formattedAmount,
      message: `Đã xác nhận thanh toán và gửi mã nguồn hiệu ứng "${effectName}" tới email ${recipientEmail}!`,
    });
  } catch (err: any) {
    console.error("Send Effect Email Error:", err);
    return NextResponse.json(
      { error: err.message || "Lỗi xử lý gửi email." },
      { status: 500 }
    );
  }
}
