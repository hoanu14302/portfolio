export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export interface GeneratedEffectRecord {
  id: string;
  prompt: string;
  name: string;
  category: string;
  description: string;
  tag: string;
  intensity_default: number;
  param_a_label: string;
  param_a_default: number;
  param_b_label: string;
  param_b_default: number;
  python_code: string;
  filter_type: string;
  author_name?: string;
  created_at?: string;
}

// Initial seeded effects
export const DEFAULT_COMMUNITY_EFFECTS: GeneratedEffectRecord[] = [
  {
    id: "seed-1",
    prompt: "Vintage 90s Polaroid Film with soft warm glow and scratches",
    name: "90s Polaroid Instant Film",
    category: "Vintage Film",
    description: "Mô phỏng chất ảnh máy ảnh phim lấy liền Polaroid thập niên 90 với tone màu vàng ấm, viền ảnh mờ nhẹ và hạt analog.",
    tag: "Polaroid / Vintage 90s",
    intensity_default: 80,
    param_a_label: "Warmth & Amber Tone",
    param_a_default: 70,
    param_b_label: "Faded Contrast",
    param_b_default: 55,
    python_code: `import cv2
import numpy as np

def apply_polaroid_90s(image_bgr: np.ndarray, intensity: float = 0.80, warmth: float = 0.70) -> np.ndarray:
    """Hiệu ứng ảnh phim lấy liền Polaroid 1990s"""
    img = image_bgr.astype(np.float32) / 255.0
    b, g, r = cv2.split(img)
    # Tăng sắc vàng ấm
    r += warmth * 0.15 * intensity
    b -= warmth * 0.12 * intensity
    # Nâng vùng tối (Faded shadows)
    merged = cv2.merge([b, g, r])
    faded = np.clip(merged * 0.85 + 0.12 * intensity, 0.0, 1.0)
    return (faded * 255).astype(np.uint8)`,
    filter_type: "vintage_polaroid",
    author_name: "Đào Hoa Nữ AI Studio",
    created_at: new Date().toISOString(),
  },
  {
    id: "seed-2",
    prompt: "Cyberpunk Tokyo Neon Rain with reflective wet surface glow",
    name: "Tokyo Cyber Rain & Wet Glow",
    category: "Cyberpunk / Sci-Fi",
    description: "Ánh sáng Neon phản chiếu trên đường phố mưa Tokyo: Tách dải sáng tím Magenta và xanh Cyan phản quang cao.",
    tag: "Neon Rain / Reflection",
    intensity_default: 90,
    param_a_label: "Magenta / Cyan Spread",
    param_a_default: 75,
    param_b_label: "Wet Surface Reflection",
    param_b_default: 65,
    python_code: `import cv2
import numpy as np

def apply_tokyo_cyber_rain(image_bgr: np.ndarray, intensity: float = 0.90) -> np.ndarray:
    """Hiệu ứng Tokyo Cyberpunk Neon Rain"""
    gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
    _, highlights = cv2.threshold(gray, 190, 255, cv2.THRESH_BINARY)
    neon_cyan = np.zeros_like(image_bgr)
    neon_cyan[:, :, 0] = highlights  # Blue
    neon_cyan[:, :, 1] = (highlights * 0.8).astype(np.uint8)  # Green
    glow = cv2.GaussianBlur(neon_cyan, (25, 25), 0)
    return cv2.addWeighted(image_bgr, 1.0, glow, intensity * 0.9, 0)`,
    filter_type: "cyber_rain",
    author_name: "Gemini 2.5 Flash",
    created_at: new Date().toISOString(),
  },
];

/**
 * Supabase REST API Service (Không cần thư viện nặng, chạy siêu nhanh và tương thích mọi môi trường)
 */
export const supabaseDb = {
  async fetchEffects(limit: number = 20): Promise<GeneratedEffectRecord[]> {
    if (!isSupabaseConfigured) {
      return DEFAULT_COMMUNITY_EFFECTS;
    }

    try {
      const url = `${supabaseUrl}/rest/v1/generated_effects?select=*&order=created_at.desc&limit=${limit}`;
      const res = await fetch(url, {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        next: { revalidate: 30 },
      });

      if (!res.ok) {
        console.warn("Supabase fetch failed:", res.statusText);
        return DEFAULT_COMMUNITY_EFFECTS;
      }

      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data : DEFAULT_COMMUNITY_EFFECTS;
    } catch (err) {
      console.warn("Supabase fetch error:", err);
      return DEFAULT_COMMUNITY_EFFECTS;
    }
  },

  async insertEffect(effect: Omit<GeneratedEffectRecord, "id" | "created_at">): Promise<GeneratedEffectRecord | null> {
    if (!isSupabaseConfigured) {
      return null;
    }

    try {
      const url = `${supabaseUrl}/rest/v1/generated_effects`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(effect),
      });

      if (!res.ok) {
        console.warn("Supabase insert failed:", res.statusText);
        return null;
      }

      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data[0] : null;
    } catch (err) {
      console.warn("Supabase insert error:", err);
      return null;
    }
  },
};
