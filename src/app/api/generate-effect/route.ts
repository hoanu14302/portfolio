import { NextRequest, NextResponse } from "next/server";
import { supabaseDb, isSupabaseConfigured, GeneratedEffectRecord } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = (body.prompt || "").trim();

    if (!prompt) {
      return NextResponse.json({ error: "Vui lòng nhập mô tả hiệu ứng mong muốn." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    let generatedEffect: Omit<GeneratedEffectRecord, "id" | "created_at">;

    if (apiKey) {
      // Gọi Gemini API REST Endpoint
      const systemInstruction = `Bạn là chuyên gia thị giác máy tính và lập trình hiệu ứng ảnh Python (OpenCV, NumPy, Pillow).
Nhiệm vụ của bạn: Khi nhận được ý tưởng/mô tả hiệu ứng từ người dùng, hãy sinh ra cấu hình hiệu ứng hoàn chỉnh theo đúng định dạng JSON sau:
{
  "name": "Tên hiệu ứng tiếng Việt / Anh ngắn gọn hấp dẫn",
  "category": "Thể loại (vd: Color Grading, Vintage, Cyberpunk, Art Stylize, Lighting...)",
  "description": "Mô tả chi tiết thuật toán và thẩm mỹ của hiệu ứng",
  "tag": "Tag ngắn gọn (vd: 3D LUT / Glow / AI)",
  "intensity_default": 85,
  "param_a_label": "Tên tham số A điều chỉnh (vd: Bloom Radius, Warmth, Contrast)",
  "param_a_default": 65,
  "param_b_label": "Tên tham số B điều chỉnh (vd: Shadow Depth, Grain Noise, Saturation)",
  "param_b_default": 50,
  "python_code": "Code Python OpenCV/NumPy hoàn chỉnh, sạch sẽ chuẩn PEP8 để chạy hiệu ứng này",
  "filter_type": "canvas_filter_mode"
}
Chỉ trả về duy nhất chuỗi JSON hợp lệ, không bọc markdown khác ngoài JSON.`;

      // 1. Tự động lấy danh sách model đang hoạt động từ Google API cho API Key này
      let availableModels: string[] = ["gemini-3.6-flash", "gemini-2.5-flash", "gemini-2.0-flash"];
      try {
        const listRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey.trim()}`
        );
        if (listRes.ok) {
          const listData = await listRes.json();
          const models = (listData.models || [])
            .filter((m: any) => m.supportedGenerationMethods?.includes("generateContent"))
            .map((m: any) => m.name.replace("models/", ""));
          
          if (models.length > 0) {
            // Ưu tiên flash hoặc pro
            const flashModels = models.filter((m: string) => m.includes("flash"));
            const otherModels = models.filter((m: string) => !m.includes("flash"));
            availableModels = [...flashModels, ...otherModels];
            console.log("Active Gemini Models for Key:", availableModels);
          }
        }
      } catch (e) {
        console.warn("Could not list models:", e);
      }

      let parsed: any = null;
      let lastErrorMessage = "";

      for (const model of availableModels) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemInstruction}\n\nÝ tưởng hiệu ứng của người dùng: "${prompt}"` }],
                },
              ],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.7,
              },
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              parsed = JSON.parse(text);
              break;
            }
          } else {
            const errBody = await response.text();
            lastErrorMessage = `Model ${model} failed (${response.status}): ${errBody}`;
            console.error("Gemini API details:", lastErrorMessage);
          }
        } catch (fetchErr: any) {
          lastErrorMessage = fetchErr.message || String(fetchErr);
          console.error("Gemini fetch exception:", fetchErr);
        }
      }

      if (!parsed) {
        throw new Error(lastErrorMessage || "Không thể kết nối với Gemini API hoặc API Key không hợp lệ.");
      }

      generatedEffect = {
        prompt,
        name: parsed.name || `Hiệu ứng AI: ${prompt.slice(0, 30)}`,
        category: parsed.category || "AI Custom Effect",
        description: parsed.description || `Hiệu ứng được tối ưu hóa tự động từ ý tưởng: "${prompt}"`,
        tag: parsed.tag || "Gemini AI Engine",
        intensity_default: parsed.intensity_default || 85,
        param_a_label: parsed.param_a_label || "Tham số chính",
        param_a_default: parsed.param_a_default || 65,
        param_b_label: parsed.param_b_label || "Độ tương phản phụ",
        param_b_default: parsed.param_b_default || 50,
        python_code: parsed.python_code || `# Custom AI Python Pipeline for: ${prompt}`,
        filter_type: parsed.filter_type || "ai_generated",
        author_name: "Gemini AI + Đào Hoa Nữ Studio",
      };
    } else {
      // Fallback: Thông minh tạo cấu trúc thuật toán dựa trên từ khóa prompt
      const lower = prompt.toLowerCase();
      const isWarm = lower.includes("vintage") || lower.includes("vàng") || lower.includes("retro") || lower.includes("polaroid");
      const isCyber = lower.includes("cyber") || lower.includes("neon") || lower.includes("tím") || lower.includes("futuristic");
      const isBlackWhite = lower.includes("đen trắng") || lower.includes("monochrome") || lower.includes("noir");

      const name = isCyber
        ? `Cyber Neon Glow: ${prompt}`
        : isWarm
        ? `Vintage Golden Mood: ${prompt}`
        : isBlackWhite
        ? `Cinematic Film Noir: ${prompt}`
        : `Custom AI Stylizer: ${prompt}`;

      const pythonCode = `import cv2
import numpy as np

def apply_custom_effect(image_bgr: np.ndarray, intensity: float = 0.85, param_a: float = 0.65, param_b: float = 0.50) -> np.ndarray:
    """
    Hiệu ứng tự động tạo từ prompt: "${prompt}"
    Tối ưu hóa đa tầng ma trận NumPy & OpenCV
    """
    img_float = image_bgr.astype(np.float32) / 255.0
    b, g, r = cv2.split(img_float)
    
    # Ma trận chuyển đổi màu sắc theo prompt
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    ${
      isCyber
        ? `r += (1.0 - luminance) * 0.35 * intensity * param_a
    b += luminance * 0.40 * intensity * param_b`
        : isWarm
        ? `r += luminance * 0.25 * intensity * param_a
    g += luminance * 0.12 * intensity
    b -= luminance * 0.15 * intensity * param_b`
        : `gray = (luminance * 255).astype(np.uint8)
    return cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)`
    }
    
    merged = cv2.merge([b, g, r])
    result = np.clip(merged ** 0.92, 0.0, 1.0)
    return (result * 255).astype(np.uint8)`;

      generatedEffect = {
        prompt,
        name,
        category: isCyber ? "Cyberpunk / Neon" : isWarm ? "Vintage / Film Look" : "Creative Stylization",
        description: `Thuật toán xử lý ma trận ảnh Python được thiết kế chuyên biệt cho ý tưởng: "${prompt}".`,
        tag: "AI Generated / NumPy",
        intensity_default: 85,
        param_a_label: isCyber ? "Neon Glow Saturation" : "Warmth Factor",
        param_a_default: 65,
        param_b_label: isCyber ? "Reflection Contrast" : "Shadow Fading",
        param_b_default: 50,
        python_code: pythonCode,
        filter_type: isCyber ? "cyber_neon" : isWarm ? "vintage_warm" : "custom_ai",
        author_name: "Đào Hoa Nữ AI Studio",
      };
    }

    // Lưu vào Supabase nếu đã cấu hình
    let recordId = `gen-${Date.now()}`;
    const inserted = await supabaseDb.insertEffect(generatedEffect);
    if (inserted && inserted.id) {
      recordId = inserted.id;
    }

    const fullRecord: GeneratedEffectRecord = {
      id: recordId,
      ...generatedEffect,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, effect: fullRecord });
  } catch (err: any) {
    console.error("Effect Generation Error:", err);
    return NextResponse.json(
      { error: err.message || "Lỗi trong quá trình tạo hiệu ứng ảnh." },
      { status: 500 }
    );
  }
}
