"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StackBase, { type StackProps } from "@mui/material/Stack";
import { type SxProps, type Theme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

type ResponsiveStackProps = Omit<StackProps, "sx"> & {
  justifyContent?: string | Record<string, string>;
  alignItems?: string | Record<string, string>;
  flexWrap?: string | Record<string, string>;
  sx?: Record<string, unknown>;
};

function Stack({
  justifyContent,
  alignItems,
  flexWrap,
  sx,
  ...props
}: ResponsiveStackProps) {
  const mergedSx = { ...sx, justifyContent, alignItems, flexWrap } as SxProps<Theme>;
  return <StackBase {...props} sx={mergedSx} />;
}
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import EmailRounded from "@mui/icons-material/EmailRounded";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CalculateRounded from "@mui/icons-material/CalculateRounded";
import SendRounded from "@mui/icons-material/SendRounded";
import SpeedRounded from "@mui/icons-material/SpeedRounded";
import StorageRounded from "@mui/icons-material/StorageRounded";
import { useThemeMode } from "@/components/ThemeRegistry";

export interface EffectsProjectEstimatorProps {
  language?: "vn" | "en";
}

const EFFECT_OPTIONS = [
  {
    id: "color_grading",
    labelVn: "Color Grading (3D LUT, Film Look, Tone Mapping)",
    labelEn: "Color Grading (3D LUT, Film Look, Tone Mapping)",
    defaultDays: 2,
  },
  {
    id: "glow_lighting",
    labelVn: "Lighting & Bloom (Glow, Flares, Anamorphic Streak)",
    labelEn: "Lighting & Bloom (Glow, Flares, Anamorphic Streak)",
    defaultDays: 2,
  },
  {
    id: "stylization",
    labelVn: "Stylization & Anime / Cyberpunk Edge Outlines",
    labelEn: "Stylization & Anime / Cyberpunk Edge Outlines",
    defaultDays: 3,
  },
  {
    id: "mesh_warp",
    labelVn: "Biến dạng Mesh Warp & Optical Flow / Motion Distortion",
    labelEn: "Geometric Mesh Warp & Optical Flow / Motion Distortion",
    defaultDays: 4,
  },
  {
    id: "ai_enhancement",
    labelVn: "Tích hợp AI / Deep Learning (Face Restore, Super Resolution)",
    labelEn: "AI / Deep Learning Integration (Face Restore, Super Resolution)",
    defaultDays: 5,
  },
  {
    id: "compositing",
    labelVn: "Hệ thống Layer Compositing / Hot-swappable Pipeline",
    labelEn: "Layer Compositing System / Hot-swappable Pipeline",
    defaultDays: 3,
  },
];

const DELIVERY_FORMATS = [
  {
    id: "python_package",
    labelVn: "Python Module / Package (.py clean PEP8)",
    labelEn: "Python Module / Package (.py clean PEP8)",
    multiplier: 1.0,
  },
  {
    id: "rest_api",
    labelVn: "FastAPI REST API / Microservice Docker",
    labelEn: "FastAPI REST API / Microservice Docker",
    multiplier: 1.2,
  },
  {
    id: "cli_batch",
    labelVn: "CLI Tool xử lý ảnh hàng loạt (Batch Processor)",
    labelEn: "High-Throughput CLI Batch Processor",
    multiplier: 1.1,
  },
  {
    id: "gpu_accel",
    labelVn: "Module tối ưu hóa GPU (CuPy / Taichi Real-time)",
    labelEn: "GPU Accelerated Module (CuPy / Taichi Real-time)",
    multiplier: 1.4,
  },
];

export default function EffectsProjectEstimator({ language = "en" }: EffectsProjectEstimatorProps = {}) {
  const { mode } = useThemeMode();
  const isEn = language === "en";
  const t = (vn: string, en: string) => (isEn ? en : vn);

  const [selectedEffects, setSelectedEffects] = useState<string[]>(["color_grading", "glow_lighting"]);
  const [deliveryFormat, setDeliveryFormat] = useState<string>("python_package");
  const [performanceReq, setPerformanceReq] = useState<string>("optimized");
  const [clientName, setClientName] = useState<string>("");
  const [clientContact, setClientContact] = useState<string>("");
  const [projectNotes, setProjectNotes] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const toggleEffect = (id: string) => {
    setSelectedEffects((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate estimated days
  const baseDays = selectedEffects.reduce((acc, effId) => {
    const found = EFFECT_OPTIONS.find((o) => o.id === effId);
    return acc + (found?.defaultDays || 2);
  }, 0);

  const formatObj = DELIVERY_FORMATS.find((f) => f.id === deliveryFormat) || DELIVERY_FORMATS[0];
  const totalEstimatedDays = Math.max(3, Math.round(baseDays * formatObj.multiplier));

  // Generate Email Text & Subject
  const recipientEmail = "hoanu14302@gmail.com";
  const recipientPhone = "0967223771";
  const selectedEffectLabels = selectedEffects
    .map((id) => {
      const o = EFFECT_OPTIONS.find((eff) => eff.id === id);
      return o ? (isEn ? o.labelEn : o.labelVn) : "";
    })
    .filter(Boolean)
    .join("\n  - ");

  const emailSubject = encodeURIComponent(
    `[${isEn ? "Order Python Image Effects" : "Đặt Dự Án Hiệu Ứng Ảnh Python"}] Inquiry from ${clientName || (isEn ? "Client" : "Khách hàng")}`
  );

  const emailBody = encodeURIComponent(
    isEn
      ? `Dear Dao Hoa Nu, I would like to inquire/order image effect modules with the following specs:

- Client / Company: ${clientName || "N/A"}
- Contact Info (Email/Phone): ${clientContact || "N/A"}
- Requested Modules:
  - ${selectedEffectLabels || "None"}
- Delivery Format: ${formatObj.labelEn}
- Performance Requirement: ${performanceReq === "standard" ? "Standard CPU" : performanceReq === "optimized" ? "NumPy Vectorized (High Speed)" : "GPU CuPy/Taichi Realtime"}
- Estimated Delivery: ~${totalEstimatedDays} business days
- Additional Project Notes:
${projectNotes || "(Let's discuss further)"}

Looking forward to your quotation and timeline proposal!`
      : `Chào Đào Hoa Nữ, tôi muốn đặt hàng dự án / module hiệu ứng ảnh với thông tin sau:

- Họ tên / Đơn vị: ${clientName || "Chưa điền"}
- Thông tin liên hệ (Email/Zalo/SĐT): ${clientContact || "Chưa điền"}
- Các hiệu ứng quan tâm:
  - ${selectedEffectLabels || "Chưa chọn"}
- Định dạng bàn giao mong muốn: ${formatObj.labelVn}
- Yêu cầu hiệu năng: ${performanceReq === "standard" ? "Tiêu chuẩn CPU" : performanceReq === "optimized" ? "Tối ưu hóa NumPy Vectorization" : "Tăng tốc GPU CuPy/Taichi Realtime"}
- Dự kiến tiến độ bàn giao: ~${totalEstimatedDays} ngày làm việc
- Mô tả thêm về dự án / Yêu cầu đặc biệt:
${projectNotes || "(Vui lòng trao đổi thêm)"}

Mong nhận được phản hồi và báo giá chi tiết sớm!`
  );

  const mailtoLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;

  const handleCopyInquiry = () => {
    const rawText = isEn
      ? `[PYTHON IMAGE EFFECTS PROJECT INQUIRY]
To: Dao Hoa Nu (hoanu14302@gmail.com - 0967223771)
Client: ${clientName || "N/A"}
Contact: ${clientContact || "N/A"}
Requested Modules:\n- ${selectedEffectLabels}
Format: ${formatObj.labelEn}
Estimated Timeline: ~${totalEstimatedDays} business days
Notes: ${projectNotes || "Discuss directly"}`
      : `[ĐẶT HÀNG DỰ ÁN HIỆU ỨNG ẢNH PYTHON]
Gửi đến: Đào Hoa Nữ (hoanu14302@gmail.com - 0967223771)
Khách hàng: ${clientName || "Chưa điền"}
Liên hệ: ${clientContact || "Chưa điền"}
Hiệu ứng yêu cầu:\n- ${selectedEffectLabels}
Định dạng bàn giao: ${formatObj.labelVn}
Thời gian ước tính: ~${totalEstimatedDays} ngày
Mô tả thêm: ${projectNotes || "Trao đổi trực tiếp"}`;

    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "var(--radius-xl, 24px)",
        border: "1px solid",
        borderColor: mode === "light" ? "#E2E8F0" : "rgba(255,255,255,0.08)",
        background: mode === "light" ? "#FFFFFF" : "#12151F",
        color: mode === "light" ? "#0F172A" : "#F8FAFC",
        p: { xs: 2.5, md: 4 },
        boxShadow: mode === "light" ? "0 20px 45px -15px rgba(0,0,0,0.06)" : "0 20px 40px -15px rgba(0,0,0,0.5)",
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
        <CalculateRounded sx={{ color: "var(--color-primary, #4F46E5)" }} />
        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-text-primary)" }}>
          {t("Ước Tính Dự Án & Đặt Hàng Module Hiệu Ứng", "Project Timeline Estimator & Module Ordering")}
        </Typography>
      </Stack>

      <Typography variant="body2" sx={{ color: "var(--color-text-secondary)", mb: 3 }}>
        {t(
          "Lựa chọn các loại hiệu ứng, định dạng bàn giao và yêu cầu hiệu năng để nhận dự toán tiến độ & tạo nhanh yêu cầu đặt hàng tới chúng tôi.",
          "Select effect modules, delivery formats, and performance targets to estimate development timeline & initiate project inquiry."
        )}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.2fr 0.8fr" },
          gap: 4,
        }}
      >
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "var(--color-text-primary)" }}>
            {t("1. Chọn các hiệu ứng & tính năng cần lập trình:", "1. Select required effect modules & algorithms:")}
          </Typography>
          <FormGroup sx={{ mb: 3 }}>
            {EFFECT_OPTIONS.map((eff) => (
              <FormControlLabel
                key={eff.id}
                control={
                  <Checkbox
                    checked={selectedEffects.includes(eff.id)}
                    onChange={() => toggleEffect(eff.id)}
                    sx={{ color: "var(--color-primary)" }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: "var(--color-text-primary)" }}>
                    {isEn ? eff.labelEn : eff.labelVn}
                  </Typography>
                }
                sx={{
                  m: 0,
                  py: 0.5,
                  px: 1,
                  borderRadius: "8px",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
                }}
              />
            ))}
          </FormGroup>

          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "var(--color-text-primary)" }}>
            {t("2. Định dạng bàn giao sản phẩm:", "2. Desired delivery format:")}
          </Typography>
          <RadioGroup
            value={deliveryFormat}
            onChange={(e) => setDeliveryFormat(e.target.value)}
            sx={{ mb: 3 }}
          >
            {DELIVERY_FORMATS.map((fmt) => (
              <FormControlLabel
                key={fmt.id}
                value={fmt.id}
                control={<Radio sx={{ color: "var(--color-primary)" }} />}
                label={
                  <Typography variant="body2" sx={{ color: "var(--color-text-primary)" }}>
                    {isEn ? fmt.labelEn : fmt.labelVn}
                  </Typography>
                }
                sx={{
                  m: 0,
                  py: 0.5,
                  px: 1,
                  borderRadius: "8px",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
                }}
              />
            ))}
          </RadioGroup>

          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "var(--color-text-primary)" }}>
            {t("3. Yêu cầu tối ưu hiệu năng:", "3. Performance & acceleration requirements:")}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {[
              {
                id: "standard",
                label: t("Tiêu chuẩn (Python/OpenCV)", "Standard (Python/OpenCV)"),
                icon: <StorageRounded fontSize="small" />,
              },
              {
                id: "optimized",
                label: t("NumPy Vectorized (Tốc độ cao)", "NumPy Vectorized (High Speed)"),
                icon: <SpeedRounded fontSize="small" />,
              },
              {
                id: "gpu",
                label: t("GPU CuPy/Taichi (Realtime)", "GPU CuPy/Taichi (Realtime)"),
                icon: <SpeedRounded fontSize="small" />,
              },
            ].map((perf) => (
              <Chip
                key={perf.id}
                label={perf.label}
                icon={perf.icon}
                clickable
                onClick={() => setPerformanceReq(perf.id)}
                color={performanceReq === perf.id ? "primary" : "default"}
                variant={performanceReq === perf.id ? "filled" : "outlined"}
                sx={{
                  py: 2,
                  borderRadius: "10px",
                  borderColor: performanceReq === perf.id ? "var(--color-primary)" : "var(--color-border)",
                  color: performanceReq === perf.id ? "#fff" : "var(--color-text-primary)",
                  bgcolor: performanceReq === perf.id ? "var(--color-primary, #4F46E5)" : "transparent",
                }}
              />
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            bgcolor: mode === "light" ? "#F8FAFC" : "rgba(255,255,255,0.02)",
            border: "1px solid var(--color-border)",
            borderRadius: "18px",
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: "var(--color-text-primary)" }}>
              {t("Bản Tổng Hợp & Đề Xuất Lộ Trình", "Summary & Timeline Proposal")}
            </Typography>

            <Box
              sx={{
                p: 2,
                borderRadius: "12px",
                bgcolor: mode === "light" ? "rgba(79, 70, 229, 0.06)" : "rgba(91, 107, 255, 0.08)",
                border: "1px solid",
                borderColor: mode === "light" ? "rgba(79, 70, 229, 0.15)" : "rgba(91, 107, 255, 0.2)",
                mb: 2.5,
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ color: "var(--color-text-secondary)" }}>
                  {t("Số lượng module đã chọn:", "Selected modules:")}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "var(--color-primary)" }}>
                  {selectedEffects.length} {t("module", "modules")}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" sx={{ color: "var(--color-text-secondary)" }}>
                  {t("Thời gian hoàn thiện dự kiến:", "Estimated timeline:")}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "var(--color-success, #10b981)" }}>
                  ~{totalEstimatedDays} {t("ngày làm việc", "business days")}
                </Typography>
              </Stack>
            </Box>

            <Typography variant="caption" sx={{ fontWeight: 600, color: "var(--color-text-secondary)", display: "block", mb: 1.5 }}>
              {t("Thông tin liên hệ của bạn:", "Your contact details:")}
            </Typography>

            <Stack spacing={1.5} sx={{ mb: 2.5 }}>
              <TextField
                size="small"
                placeholder={t("Tên của bạn hoặc Tên doanh nghiệp", "Your name or Company name")}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    color: "var(--color-text-primary)",
                    "& fieldset": { borderColor: "var(--color-border)" },
                  },
                }}
              />
              <TextField
                size="small"
                placeholder={t("Email hoặc Số điện thoại / Zalo", "Email or Phone / Zalo / WhatsApp")}
                value={clientContact}
                onChange={(e) => setClientContact(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    color: "var(--color-text-primary)",
                    "& fieldset": { borderColor: "var(--color-border)" },
                  },
                }}
              />
              <TextField
                size="small"
                multiline
                rows={2}
                placeholder={t("Mô tả ngắn yêu cầu bài toán hoặc link ảnh tham khảo...", "Brief project description or reference links...")}
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    color: "var(--color-text-primary)",
                    "& fieldset": { borderColor: "var(--color-border)" },
                  },
                }}
              />
            </Stack>
          </Box>

          <Stack spacing={1.5}>
            <Button
              component="a"
              href={mailtoLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              fullWidth
              startIcon={<SendRounded />}
              sx={{
                py: 1.2,
                borderRadius: "12px",
                bgcolor: "var(--color-primary, #4F46E5)",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "0.95rem",
                "&:hover": { bgcolor: "#4338CA" },
              }}
            >
              {t("Gửi Yêu Cầu Báo Giá Trực Tiếp", "Send Direct Project Inquiry")}
            </Button>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <Button
                variant="outlined"
                fullWidth
                size="small"
                startIcon={copied ? <CheckCircleRounded sx={{ color: "#10b981" }} /> : <ContentCopyRounded />}
                onClick={handleCopyInquiry}
                sx={{
                  py: 1,
                  borderRadius: "10px",
                  borderColor: "var(--color-border)",
                  color: copied ? "#10b981" : "var(--color-text-primary)",
                  textTransform: "none",
                  fontSize: "0.8rem",
                }}
              >
                {copied ? t("Đã sao chép yêu cầu!", "Copied to Clipboard!") : t("Sao chép nội dung", "Copy Inquiry Text")}
              </Button>

              <Button
                variant="outlined"
                fullWidth
                size="small"
                startIcon={<EmailRounded />}
                component="a"
                href={`https://zalo.me/${recipientPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  py: 1,
                  borderRadius: "10px",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-primary)",
                  textTransform: "none",
                  fontSize: "0.8rem",
                }}
              >
                {t("Chat Zalo: 0967.223.771", "Zalo: 0967.223.771")}
              </Button>

              <Button
                component="a"
                href={`mailto:${recipientEmail}`}
                variant="outlined"
                fullWidth
                size="small"
                startIcon={<EmailRounded />}
                sx={{
                  py: 1,
                  borderRadius: "10px",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-primary)",
                  textTransform: "none",
                  fontSize: "0.8rem",
                }}
              >
                {recipientEmail}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
