-- ============================================================
-- Supabase SQL Schema: Lưu trữ các hiệu ứng ảnh do Gemini AI sinh ra
-- ============================================================

CREATE TABLE IF NOT EXISTS generated_effects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  tag TEXT NOT NULL,
  intensity_default INT DEFAULT 85,
  param_a_label TEXT NOT NULL,
  param_a_default INT DEFAULT 65,
  param_b_label TEXT NOT NULL,
  param_b_default INT DEFAULT 45,
  python_code TEXT NOT NULL,
  filter_type TEXT DEFAULT 'custom_effect',
  author_name TEXT DEFAULT 'Đào Hoa Nữ AI Studio',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bật Row Level Security (RLS)
ALTER TABLE generated_effects ENABLE ROW LEVEL SECURITY;

-- Cho phép mọi người đọc hiệu ứng công khai
CREATE POLICY "Public effects read access" ON generated_effects
  FOR SELECT USING (true);

-- Cho phép insert hiệu ứng mới
CREATE POLICY "Public effects insert access" ON generated_effects
  FOR INSERT WITH CHECK (true);
