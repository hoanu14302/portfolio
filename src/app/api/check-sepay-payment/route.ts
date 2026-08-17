import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const amount = Number(searchParams.get("amount") || 0);

    if (!code) {
      return NextResponse.json(
        { success: false, paid: false, error: "Thiếu mã chuyển khoản (code)." },
        { status: 400 }
      );
    }

    const sepayApiToken = process.env.SEPAY_API_TOKEN || process.env.SEPAY_TOKEN;
    const sepayAccount = process.env.SEPAY_ACCOUNT || "19074348194016";

    // Nếu người dùng đã cấu hình SePay API Token trong .env
    if (sepayApiToken) {
      try {
        const sepayRes = await fetch(
          `https://my.sepay.vn/userapi/transactions/list?account_number=${sepayAccount}&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${sepayApiToken}`,
              "Content-Type": "application/json",
            },
            next: { revalidate: 0 },
          }
        );

        if (sepayRes.ok) {
          const data = await sepayRes.json();
          const transactions = data.transactions || [];

          // Tìm giao dịch khớp mã code hoặc số tiền
          const matchedTx = transactions.find((tx: any) => {
            const content = (tx.transaction_content || tx.description || "").toUpperCase();
            const txAmount = Number(tx.amount_in || tx.amount || 0);
            const isCodeMatched = content.includes(code.toUpperCase());
            const isAmountMatched = amount <= 0 || txAmount >= amount;
            return isCodeMatched && isAmountMatched;
          });

          if (matchedTx) {
            return NextResponse.json({
              success: true,
              paid: true,
              transaction: matchedTx,
              message: "Đã xác nhận thanh toán thành công qua SePay!",
            });
          }

          return NextResponse.json({
            success: true,
            paid: false,
            message: "Chưa tìm thấy giao dịch khớp mã chuyển khoản.",
          });
        }
      } catch (apiErr) {
        console.warn("SePay API query failed, checking fallback:", apiErr);
      }
    }

    // Fallback: Nếu chưa có SePay API Token bí mật, trả về hướng dẫn hoặc cho phép fallback
    return NextResponse.json({
      success: true,
      paid: false,
      hasApiToken: Boolean(sepayApiToken),
      message: sepayApiToken
        ? "Đang chờ biến động số dư từ SePay..."
        : "Chưa cấu hình SEPAY_API_TOKEN trong .env. Có thể kích hoạt auto-check bằng cách thêm SEPAY_API_TOKEN.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Lỗi kiểm tra trạng thái thanh toán." },
      { status: 500 }
    );
  }
}
