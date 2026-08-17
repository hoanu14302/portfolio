"use client";

import { useThemeMode } from "@/components/ThemeRegistry";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import AutoFixHighRounded from "@mui/icons-material/AutoFixHighRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import CloudUploadRounded from "@mui/icons-material/CloudUploadRounded";
import CodeRounded from "@mui/icons-material/CodeRounded";
import CompareArrowsRounded from "@mui/icons-material/CompareArrowsRounded";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import LocalCafeRounded from "@mui/icons-material/LocalCafeRounded";
import QrCode2Rounded from "@mui/icons-material/QrCode2Rounded";
import RestartAltRounded from "@mui/icons-material/RestartAltRounded";
import TuneRounded from "@mui/icons-material/TuneRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Slider from "@mui/material/Slider";
import StackBase, { type StackProps } from "@mui/material/Stack";
import { type SxProps, type Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useRef, useState } from "react";

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
  const mergedSx = {
    ...sx,
    justifyContent,
    alignItems,
    flexWrap,
  } as SxProps<Theme>;
  return <StackBase {...props} sx={mergedSx} />;
}

// ── SePay config ─────────────────────────────────────────────────────────────
const SEPAY_BANK = "Techcombank";
const SEPAY_ACCOUNT = "19074348194016";
const SEPAY_ACCOUNT_NAME = "DAO HOA NU";

const DONATE_AMOUNTS = [
  { label: "10k", value: 10000 },
  { label: "20k", value: 20000 },
  { label: "50k", value: 50000 },
  { label: "100k", value: 100000 },
];

function buildSepayQrUrl(amount: number, transferCode: string): string {
  const description = encodeURIComponent(transferCode);
  return `https://qr.sepay.vn/img?bank=${SEPAY_BANK}&acc=${SEPAY_ACCOUNT}&template=compact&amount=${amount}&des=${description}`;
}

type EffectPreset =
  | "cinematic_lut"
  | "glow_bloom"
  | "neon_stylize"
  | "lens_warp"
  | "motion_blur"
  | "hdr_tonemap"
  | "film_grain"
  | "glitch_pixel";

interface PresetConfig {
  id: EffectPreset;
  name: string;
  category: string;
  description: string;
  tag: string;
  defaults: {
    intensity: number;
    paramA: number; // e.g. Radius / Warmth / Distortion
    paramB: number; // e.g. Contrast / Glow Spread / Noise
  };
  paramALabel: string;
  paramBLabel: string;
  pythonSnippet: (intensity: number, paramA: number, paramB: number) => string;
}

const PRESETS: PresetConfig[] = [
  {
    id: "cinematic_lut",
    name: "Cinematic 3D LUT & Teal-Orange",
    category: "Color Grading",
    description:
      "Phân tách tone màu điện ảnh Hollywood: Tăng cường sắc da ấm áp kết hợp phủ tone xanh Teal mờ ảo ở vùng tối.",
    tag: "3D LUT / Color Grading",
    defaults: { intensity: 85, paramA: 65, paramB: 45 },
    paramALabel: "Teal/Orange Contrast",
    paramBLabel: "Shadow Depth",
    pythonSnippet: (intensity, paramA, paramB) =>
      `from python_effects import apply_cinematic_teal_orange\nimport cv2\n\nimage = cv2.imread("input.jpg")\nresult = apply_cinematic_teal_orange(image, intensity=${(intensity / 100).toFixed(2)}, teal_contrast=${(paramA / 100).toFixed(2)}, shadow_depth=${(paramB / 100).toFixed(2)})\ncv2.imwrite("output.jpg", result)`,
  },
  {
    id: "glow_bloom",
    name: "Anamorphic Glow & Soft Bloom",
    category: "Lighting & Flare",
    description:
      "Trích xuất dải sáng cao (High Dynamic Luminance) và khuếch tán đa tầng Gaussian Blur tạo hiệu ứng hào quang mềm mại.",
    tag: "Gaussian Bloom / Light Bleed",
    defaults: { intensity: 75, paramA: 80, paramB: 60 },
    paramALabel: "Bloom Radius (Kernel)",
    paramBLabel: "Threshold Luminance",
    pythonSnippet: (intensity, paramA, paramB) =>
      `from python_effects import apply_anamorphic_bloom\nimport cv2\n\nimage = cv2.imread("input.jpg")\nresult = apply_anamorphic_bloom(image, intensity=${(intensity / 100).toFixed(2)}, kernel_radius=${Math.floor(paramA / 5) * 2 + 1})\ncv2.imwrite("output.jpg", result)`,
  },
  {
    id: "neon_stylize",
    name: "Cyberpunk Neon & Edge Glow",
    category: "Stylization",
    description:
      "Nhận diện biên cạnh Sobel / Canny, kết hợp dải màu Neon Gradient và hoà trộn dạng Screen Compositing.",
    tag: "Sobel Edge / Stylization",
    defaults: { intensity: 90, paramA: 70, paramB: 85 },
    paramALabel: "Neon Saturation",
    paramBLabel: "Edge Sensitivity",
    pythonSnippet: (intensity, _paramA, paramB) =>
      `from python_effects import apply_cyberpunk_neon_edge\nimport cv2\n\nimage = cv2.imread("input.jpg")\nresult = apply_cyberpunk_neon_edge(image, intensity=${(intensity / 100).toFixed(2)}, sensitivity=${paramB})\ncv2.imwrite("output.jpg", result)`,
  },
  {
    id: "lens_warp",
    name: "Mesh Warp & Chromatic Distortion",
    category: "Geometric Distortion",
    description:
      "Biến dạng toạ độ ma trận (Mesh Grid Remap), tách kênh quang sai màu sắc (RGB Chromatic Aberration) và hiệu ứng mắt cá Fisheye.",
    tag: "Remap / Fisheye / Warp",
    defaults: { intensity: 65, paramA: 75, paramB: 50 },
    paramALabel: "Fisheye Curve",
    paramBLabel: "RGB Chromatic Shift",
    pythonSnippet: (intensity, _paramA, paramB) =>
      `from python_effects import apply_mesh_warp_chromatic\nimport cv2\n\nimage = cv2.imread("input.jpg")\nresult = apply_mesh_warp_chromatic(image, warp_factor=${(intensity / 100).toFixed(2)}, chromatic_shift=${Math.floor(paramB / 10)})\ncv2.imwrite("output.jpg", result)`,
  },
  {
    id: "motion_blur",
    name: "Motion Blur & Radial Speed Zoom",
    category: "Motion Effects",
    description:
      "Mô phỏng vệt chuyển động tốc độ cao (Linear Motion Streaks) và phóng đại quang học hướng tâm (Radial Speed Zoom).",
    tag: "Motion Blur / Radial Zoom",
    defaults: { intensity: 75, paramA: 60, paramB: 65 },
    paramALabel: "Góc hướng chuyển động (Angle)",
    paramBLabel: "Độ phóng tâm (Zoom Strength)",
    pythonSnippet: (intensity, paramA, paramB) =>
      `from python_effects import apply_motion_radial_blur\nimport cv2\n\nimage = cv2.imread("input.jpg")\nresult = apply_motion_radial_blur(image, intensity=${(intensity / 100).toFixed(2)}, blur_angle=${(paramA / 100).toFixed(2)}, zoom_strength=${(paramB / 100).toFixed(2)})\ncv2.imwrite("output.jpg", result)`,
  },
  {
    id: "hdr_tonemap",
    name: "Adaptive Tone Mapping & HDR Boost",
    category: "Dynamic Range",
    description:
      "Cân bằng dải sáng động cục bộ (CLAHE / Reinhard Tone Mapping), phục hồi chi tiết vùng tối mà không cháy sáng.",
    tag: "CLAHE / Tone Mapping",
    defaults: { intensity: 80, paramA: 60, paramB: 70 },
    paramALabel: "Detail Sharpness",
    paramBLabel: "Shadow Recovery",
    pythonSnippet: (intensity) =>
      `from python_effects import apply_hdr_adaptive_tonemap\nimport cv2\n\nimage = cv2.imread("input.jpg")\nresult = apply_hdr_adaptive_tonemap(image, intensity=${(intensity / 100).toFixed(2)})\ncv2.imwrite("output.jpg", result)`,
  },
  {
    id: "film_grain",
    name: "Analog 35mm Film Grain & Vignette",
    category: "Vintage Aesthetics",
    description:
      "Mô phỏng cấu trúc hạt phim nhựa bạc 35mm (Silver Halide Grain), làm tối 4 góc góc quang học (Optical Vignette).",
    tag: "Film Simulation / Grain",
    defaults: { intensity: 70, paramA: 55, paramB: 65 },
    paramALabel: "Grain Texture Size",
    paramBLabel: "Vignette Darkness",
    pythonSnippet: (intensity, _paramA, paramB) =>
      `from python_effects import apply_analog_film_grain\nimport cv2\n\nimage = cv2.imread("input.jpg")\nresult = apply_analog_film_grain(image, grain_intensity=${(intensity / 100).toFixed(2)}, vignette_darkness=${(paramB / 100).toFixed(2)})\ncv2.imwrite("output.jpg", result)`,
  },
  {
    id: "glitch_pixel",
    name: "Glitch Kỹ Thuật Số & Lệch Kênh (Pixel Slicing)",
    category: "Digital Glitch",
    description:
      "Cắt lát các dải ngang ngẫu nhiên (Horizontal Pixel Shifting), gây nhiễu tín hiệu CRT và giật lệch khung hình.",
    tag: "Digital Glitch / Slicing",
    defaults: { intensity: 75, paramA: 70, paramB: 50 },
    paramALabel: "Độ lệch dải ngang (Slice Shift)",
    paramBLabel: "Mật độ đường nhiễu (Noise Density)",
    pythonSnippet: (intensity, paramA, paramB) =>
      `from python_effects import apply_pixel_glitch\nimport cv2\n\nimage = cv2.imread("input.jpg")\nresult = apply_pixel_glitch(image, intensity=${(intensity / 100).toFixed(2)}, max_shift=${Math.floor(paramA * 0.6)}, noise_density=${(paramB / 100).toFixed(2)})\ncv2.imwrite("output.jpg", result)`,
  },
];

const SAMPLE_IMAGES = [
  { id: "portrait", name: "Chân dung (Portrait)", src: "/hoa-nu.png" },
  { id: "cyber", name: "Cyber Avatar", src: "/hoa-nu-avatar-2.png" },
  { id: "art", name: "Creative Asset", src: "/logo-black.png" },
];

import { GeneratedEffectRecord } from "@/lib/supabase";

export interface ImageEffectsStudioProps {
  activeCustomEffect?: GeneratedEffectRecord | null;
  language?: "vn" | "en";
}

export default function ImageEffectsStudio({
  activeCustomEffect,
  language = "en",
}: ImageEffectsStudioProps = {}) {
  const { mode } = useThemeMode();
  const isEn = language === "en";
  const t = (vn: string, en: string) => (isEn ? en : vn);

  const [selectedPreset, setSelectedPreset] = useState<string>("cinematic_lut");
  const [currentCustomEffect, setCurrentCustomEffect] =
    useState<GeneratedEffectRecord | null>(null);
  const [currentImageSrc, setCurrentImageSrc] = useState<string>("/hoa-nu.png");
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [intensity, setIntensity] = useState<number>(85);
  const [paramA, setParamA] = useState<number>(65);
  const [paramB, setParamB] = useState<number>(45);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Integrated AI Prompt State
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

  // Checkout & Email Delivery Modal State
  const [openCheckoutModal, setOpenCheckoutModal] = useState<boolean>(false);
  const [buyerEmail, setBuyerEmail] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<number>(50000);
  const [customAmountInput, setCustomAmountInput] = useState<string>("");
  const [transferCode, setTransferCode] = useState<string>("");
  const [isVerifyingSepay, setIsVerifyingSepay] = useState<boolean>(false);
  const [isPaymentVerified, setIsPaymentVerified] = useState<boolean>(false);
  const [isSubmittingPayment, setIsSubmittingPayment] =
    useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sourceImageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  const handleGenerateAIEffect = async (customPromptText?: string) => {
    const promptToSend = (
      typeof customPromptText === "string" ? customPromptText : aiPrompt
    ).trim();
    if (!promptToSend) return;

    setIsGeneratingAI(true);
    setAiError(null);
    setAiSuccessMessage(null);

    try {
      const res = await fetch("/api/generate-effect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptToSend,
          authorName: "Đào Hoa Nữ AI Studio",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(
          data.error ||
            t("Không thể tạo hiệu ứng lúc này.", "Failed to generate effect."),
        );
      }

      const generated = data.effect;
      setCurrentCustomEffect(generated);
      setSelectedPreset("custom_ai");
      setIntensity(generated.intensity_default || 85);
      setParamA(generated.param_a_default || 65);
      setParamB(generated.param_b_default || 45);
      setAiSuccessMessage(
        t(
          `Đã tạo thành công hiệu ứng "${generated.name}"!`,
          `Successfully generated effect "${generated.name}"!`,
        ),
      );
    } catch (err: any) {
      setAiError(
        err.message ||
          t("Lỗi khi kết nối Gemini API.", "Error connecting to Gemini API."),
      );
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Sync if activeCustomEffect prop changes
  useEffect(() => {
    if (activeCustomEffect) {
      setCurrentCustomEffect(activeCustomEffect);
      setSelectedPreset("custom_ai");
      setIntensity(activeCustomEffect.intensity_default || 85);
      setParamA(activeCustomEffect.param_a_default || 65);
      setParamB(activeCustomEffect.param_b_default || 45);
    }
  }, [activeCustomEffect]);

  const activePresetConfig =
    currentCustomEffect && selectedPreset === "custom_ai"
      ? {
          id: "custom_ai",
          name: currentCustomEffect.name,
          category: currentCustomEffect.category,
          description: currentCustomEffect.description,
          tag: currentCustomEffect.tag,
          defaults: {
            intensity: currentCustomEffect.intensity_default || 85,
            paramA: currentCustomEffect.param_a_default || 65,
            paramB: currentCustomEffect.param_b_default || 45,
          },
          paramALabel: currentCustomEffect.param_a_label,
          paramBLabel: currentCustomEffect.param_b_label,
          pythonSnippet: () => currentCustomEffect.python_code,
        }
      : PRESETS.find((p) => p.id === selectedPreset) || PRESETS[0];

  // Reset parameters when preset changes
  const handlePresetSelect = (presetId: string) => {
    setSelectedPreset(presetId);
    if (presetId === "custom_ai" && currentCustomEffect) {
      setIntensity(currentCustomEffect.intensity_default || 85);
      setParamA(currentCustomEffect.param_a_default || 65);
      setParamB(currentCustomEffect.param_b_default || 45);
      return;
    }
    const target = PRESETS.find((p) => p.id === presetId);
    if (target) {
      setIntensity(target.defaults.intensity);
      setParamA(target.defaults.paramA);
      setParamB(target.defaults.paramB);
    }
  };

  // Render effect on canvas using 2D image processing simulation
  const applyEffectToCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = sourceImageRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = img.naturalWidth || 600;
    canvas.height = img.naturalHeight || 600;

    // Draw original image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const len = data.length;

    const factor = intensity / 100;
    const pA = paramA / 100;
    const pB = paramB / 100;

    if (selectedPreset === "motion_blur") {
      // Motion Blur & Radial Speed Zoom Simulation
      const w = canvas.width;
      const h = canvas.height;
      const originalData = new Uint8ClampedArray(data);
      const angleRad = pA * Math.PI;
      const cosA = Math.cos(angleRad);
      const sinA = Math.sin(angleRad);
      const maxStreak = Math.floor(25 * factor);
      const zoomSamples = Math.max(3, Math.floor(8 * pB * factor));
      const cx = w * 0.5;
      const cy = h * 0.5;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let sumR = 0, sumG = 0, sumB = 0, count = 0;

          // Linear Motion Streak sampling
          for (let step = -maxStreak; step <= maxStreak; step += 2) {
            const sx = Math.round(x + step * cosA);
            const sy = Math.round(y + step * sinA);
            if (sx >= 0 && sx < w && sy >= 0 && sy < h) {
              const idx = (sy * w + sx) * 4;
              sumR += originalData[idx];
              sumG += originalData[idx + 1];
              sumB += originalData[idx + 2];
              count++;
            }
          }

          // Radial Zoom sampling
          if (zoomSamples > 0) {
            const dx = x - cx;
            const dy = y - cy;
            for (let z = 1; z <= zoomSamples; z++) {
              const scale = 1 + (z / zoomSamples) * 0.15 * pB * factor;
              const zx = Math.round(cx + dx * scale);
              const zy = Math.round(cy + dy * scale);
              if (zx >= 0 && zx < w && zy >= 0 && zy < h) {
                const zIdx = (zy * w + zx) * 4;
                sumR += originalData[zIdx] * 0.8;
                sumG += originalData[zIdx + 1] * 0.8;
                sumB += originalData[zIdx + 2] * 0.8;
                count += 0.8;
              }
            }
          }

          const outIdx = (y * w + x) * 4;
          const motionR = count > 0 ? sumR / count : originalData[outIdx];
          const motionG = count > 0 ? sumG / count : originalData[outIdx + 1];
          const motionB = count > 0 ? sumB / count : originalData[outIdx + 2];

          data[outIdx] = Math.min(255, Math.max(0, originalData[outIdx] * (1 - factor) + motionR * factor));
          data[outIdx + 1] = Math.min(255, Math.max(0, originalData[outIdx + 1] * (1 - factor) + motionG * factor));
          data[outIdx + 2] = Math.min(255, Math.max(0, originalData[outIdx + 2] * (1 - factor) + motionB * factor));
          data[outIdx + 3] = 255;
        }
      }
    } else if (selectedPreset === "glitch_pixel") {
      // Digital Glitch & Horizontal Slice Shift
      const w = canvas.width;
      const h = canvas.height;
      const originalData = new Uint8ClampedArray(data);
      const numSlices = Math.floor(25 * factor);
      const maxShift = Math.floor(pA * 80 * factor);

      for (let s = 0; s < numSlices; s++) {
        const sliceH = Math.floor(Math.random() * 30 + 5);
        const startY = Math.floor(Math.random() * (h - sliceH));
        const shift = Math.floor((Math.random() - 0.5) * maxShift * 2);

        for (let y = startY; y < startY + sliceH && y < h; y++) {
          for (let x = 0; x < w; x++) {
            const srcX = (x - shift + w) % w;
            const srcIdx = (y * w + srcX) * 4;
            const dstIdx = (y * w + x) * 4;

            // Kênh Red và Blue tách nhẹ tạo chromatic aberration
            data[dstIdx] = originalData[srcIdx];
            data[dstIdx + 1] = originalData[dstIdx + 1];
            data[dstIdx + 2] = originalData[((y * w + ((srcX + 6) % w)) * 4) + 2];
          }
        }
      }
    } else if (selectedPreset === "cinematic_lut") {
      // Teal & Orange tone mapping
      for (let i = 0; i < len; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;

        // Shadow -> Teal (Boost Blue & Green, reduce Red)
        const shadowMask = Math.max(0, 1 - (lum / 255) * (1 + pB));
        let newB = b + shadowMask * 60 * factor;
        let newG = g + shadowMask * 25 * factor;
        let newR = r - shadowMask * 20 * factor;

        // Highlights -> Warm/Orange (Boost Red & Yellow)
        const highlightMask = Math.min(1, (lum / 255) * (1 + pA));
        newR += highlightMask * 45 * factor;
        newG += highlightMask * 18 * factor;

        data[i] = Math.min(255, Math.max(0, newR));
        data[i + 1] = Math.min(255, Math.max(0, newG));
        data[i + 2] = Math.min(255, Math.max(0, newB));
      }
    } else if (selectedPreset === "glow_bloom") {
      // Soft light & Bloom boost
      for (let i = 0; i < len; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;

        if (lum > 140) {
          const glow = ((lum - 140) / 115) * 50 * factor * pA;
          data[i] = Math.min(255, r + glow * 1.2);
          data[i + 1] = Math.min(255, g + glow * 1.1);
          data[i + 2] = Math.min(255, b + glow * 1.3);
        }
      }
    } else if (selectedPreset === "neon_stylize") {
      // Cyberpunk Neon Edge & Stylization
      for (let i = 0; i < len; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;

        // Darken shadows, pop saturated cyber pink/cyan
        const edge = Math.abs(r - g) + Math.abs(g - b);
        if (edge > 30 * (1 - pB * 0.5)) {
          data[i] = Math.min(255, r * 0.3 + 220 * factor); // Magenta
          data[i + 1] = Math.min(255, g * 0.3 + 30 * factor);
          data[i + 2] = Math.min(255, b * 0.3 + 240 * factor);
        } else {
          data[i] = Math.min(255, r * 0.4 + lum * 0.2 * (1 - factor));
          data[i + 1] = Math.min(255, g * 0.5 + lum * 0.4 * factor);
          data[i + 2] = Math.min(255, b * 0.8 + lum * 0.6 * factor);
        }
      }
    } else if (selectedPreset === "hdr_tonemap") {
      // S-curve & Local contrast HDR enhancement
      for (let i = 0; i < len; i += 4) {
        for (let c = 0; c < 3; c++) {
          const val = data[i + c] / 255;
          // S-curve tone mapping
          const enhanced =
            val < 0.5 ? 2 * val * val : 1 - 2 * (1 - val) * (1 - val);
          const finalVal =
            (1 - factor) * val +
            factor *
              ((1 - pA * 0.5) * enhanced + pA * 0.5 * Math.pow(val, 0.75));
          data[i + c] = Math.min(255, Math.max(0, finalVal * 255));
        }
      }
    } else if (selectedPreset === "film_grain") {
      // 35mm Analog Film Noise & Vignette
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxDist = Math.sqrt(cx * cx + cy * cy);

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const idx = (y * canvas.width + x) * 4;
          const noise = (Math.random() - 0.5) * 40 * factor;

          // Vignette
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          const vignette = 1 - (dist / maxDist) * 0.6 * pB;

          data[idx] = Math.min(
            255,
            Math.max(0, (data[idx] + noise) * vignette),
          );
          data[idx + 1] = Math.min(
            255,
            Math.max(0, (data[idx + 1] + noise) * vignette),
          );
          data[idx + 2] = Math.min(
            255,
            Math.max(0, (data[idx + 2] + noise) * vignette),
          );
        }
      }
    } else if (selectedPreset === "lens_warp") {
      // Chromatic offset simulation
      const shift = Math.floor(8 * factor * pB);
      const width = canvas.width;
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const idx = (y * width + x) * 4;
          const redIdx = (y * width + Math.min(width - 1, x + shift)) * 4;
          const blueIdx = (y * width + Math.max(0, x - shift)) * 4;
          data[idx] = data[redIdx]; // Red channel shifted
          data[idx + 2] = data[blueIdx + 2]; // Blue channel shifted
        }
      }
    } else if (selectedPreset === "custom_ai") {
      // Dynamic Gemini AI Custom Effect Simulation (Dựa trên tên, prompt và tag của AI Effect)
      const promptText = ((currentCustomEffect?.name || "") + " " + (currentCustomEffect?.prompt || "") + " " + (currentCustomEffect?.description || "") + " " + (currentCustomEffect?.tag || "")).toLowerCase();
      
      const isMotion = promptText.includes("motion") || promptText.includes("blur") || promptText.includes("chuyển động") || promptText.includes("vệt mờ") || promptText.includes("zoom") || promptText.includes("speed");
      const isGlitch = promptText.includes("glitch") || promptText.includes("slice") || promptText.includes("nhiễu") || promptText.includes("crt") || promptText.includes("pixel");
      const isCyber = promptText.includes("cyber") || promptText.includes("neon") || promptText.includes("tokyo") || promptText.includes("magenta") || promptText.includes("cyan");
      const isWarmVintage = promptText.includes("vintage") || promptText.includes("polaroid") || promptText.includes("film") || promptText.includes("retro") || promptText.includes("warm") || promptText.includes("gold") || promptText.includes("sunset");
      const isBlackWhite = promptText.includes("đen trắng") || promptText.includes("black") || promptText.includes("monochrome") || promptText.includes("noir");

      if (isMotion) {
        // Motion / Speed Zoom simulation
        const w = canvas.width;
        const h = canvas.height;
        const originalData = new Uint8ClampedArray(data);
        const maxStreak = Math.floor(25 * factor);
        const cx = w * 0.5;
        const cy = h * 0.5;

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            let sumR = 0, sumG = 0, sumB = 0, count = 0;
            for (let step = -maxStreak; step <= maxStreak; step += 3) {
              const sx = x + step;
              if (sx >= 0 && sx < w) {
                const idx = (y * w + sx) * 4;
                sumR += originalData[idx];
                sumG += originalData[idx + 1];
                sumB += originalData[idx + 2];
                count++;
              }
            }
            const outIdx = (y * w + x) * 4;
            const motionR = count > 0 ? sumR / count : originalData[outIdx];
            const motionG = count > 0 ? sumG / count : originalData[outIdx + 1];
            const motionB = count > 0 ? sumB / count : originalData[outIdx + 2];

            data[outIdx] = Math.min(255, Math.max(0, originalData[outIdx] * (1 - factor) + motionR * factor));
            data[outIdx + 1] = Math.min(255, Math.max(0, originalData[outIdx + 1] * (1 - factor) + motionG * factor));
            data[outIdx + 2] = Math.min(255, Math.max(0, originalData[outIdx + 2] * (1 - factor) + motionB * factor));
          }
        }
      } else if (isGlitch) {
        const w = canvas.width;
        const h = canvas.height;
        const originalData = new Uint8ClampedArray(data);
        const numSlices = Math.floor(25 * factor);
        const maxShift = Math.floor(pA * 80 * factor);

        for (let s = 0; s < numSlices; s++) {
          const sliceH = Math.floor(Math.random() * 30 + 5);
          const startY = Math.floor(Math.random() * (h - sliceH));
          const shift = Math.floor((Math.random() - 0.5) * maxShift * 2);

          for (let y = startY; y < startY + sliceH && y < h; y++) {
            for (let x = 0; x < w; x++) {
              const srcX = (x - shift + w) % w;
              const srcIdx = (y * w + srcX) * 4;
              const dstIdx = (y * w + x) * 4;

              data[dstIdx] = originalData[srcIdx];
              data[dstIdx + 1] = originalData[dstIdx + 1];
              data[dstIdx + 2] = originalData[((y * w + ((srcX + 6) % w)) * 4) + 2];
            }
          }
        }
      } else {
        for (let i = 0; i < len; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;

        if (isCyber) {
          // Cyberpunk Neon Look: Saturated Pink/Magenta highlights, Cyan/Blue shadows & High Contrast
          const glow = lum > 130 ? ((lum - 130) / 125) * 90 * factor * pA : 0;
          const shadow = 1.0 - lum / 255;
          
          let newR = r * (1.1 + (pA - 0.5) * 1.0 * factor) + glow * 1.6;
          let newG = g * 0.65 + shadow * 35 * factor * pB;
          let newB = b * (1.3 + (pB - 0.5) * 1.2 * factor) + shadow * 80 * factor + glow * 0.9;
          
          // S-curve contrast pop
          r = ((newR / 255 - 0.5) * (1.35 + factor * 0.45) + 0.5) * 255;
          g = ((newG / 255 - 0.5) * (1.25 + factor * 0.35) + 0.5) * 255;
          b = ((newB / 255 - 0.5) * (1.35 + factor * 0.45) + 0.5) * 255;
        } else if (isWarmVintage) {
          // Vintage / Polaroid Warm Amber Film Look
          const fade = 30 * factor * pB;
          let newR = r * (1.0 + 0.4 * factor * pA) + 20 * factor + fade;
          let newG = g * (1.0 + 0.18 * factor) + fade * 0.8;
          let newB = b * (1.0 - 0.35 * factor * pA) + fade * 0.5;
          r = newR;
          g = newG;
          b = newB;
        } else if (isBlackWhite) {
          // Noir / Cinematic B&W
          let bw = lum + (lum > 128 ? 35 * factor * pA : -35 * factor * pB);
          r = (1 - factor) * r + factor * bw;
          g = (1 - factor) * g + factor * bw;
          b = (1 - factor) * b + factor * bw;
        } else {
          // General AI Stylizer (Dynamic Matrix Boost)
          let newR = r + (pA > 0.5 ? (lum / 255) * 80 * factor * (pA - 0.5) * 2 : -(lum / 255) * 40 * factor);
          let newG = g + (lum > 128 ? 40 * factor * pB : -20 * factor);
          let newB = b + (pB > 0.5 ? (1.0 - lum / 255) * 95 * factor * (pB - 0.5) * 2 : 35 * factor);
          r = newR;
          g = newG;
          b = newB;
        }

        data[i] = Math.min(255, Math.max(0, r));
        data[i + 1] = Math.min(255, Math.max(0, g));
        data[i + 2] = Math.min(255, Math.max(0, b));
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [selectedPreset, intensity, paramA, paramB, currentCustomEffect]);

  // Load and trigger effect processing whenever image changes
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = currentImageSrc;
    img.onload = () => {
      sourceImageRef.current = img;
      applyEffectToCanvas();
    };
  }, [currentImageSrc, applyEffectToCanvas]);

  // Re-run canvas effect whenever parameters or preset changes
  useEffect(() => {
    if (sourceImageRef.current) {
      applyEffectToCanvas();
    }
  }, [applyEffectToCanvas]);

  // Handle custom user image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCurrentImageSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Download resulting canvas image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `effects-studio-${selectedPreset}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Khôi phục phiên chuyển khoản gần nhất từ localStorage nếu khách lỡ F5
  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem("sepay_active_order");
      if (savedOrder) {
        const parsed = JSON.parse(savedOrder);
        if (parsed.transferCode) {
          setTransferCode(parsed.transferCode);
          if (parsed.buyerEmail) setBuyerEmail(parsed.buyerEmail);
          if (parsed.paymentAmount) setPaymentAmount(parsed.paymentAmount);
          if (parsed.isVerified) setIsPaymentVerified(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Open checkout & email delivery modal
  const handleOpenCheckout = () => {
    setPaymentSuccess(false);
    setPaymentError(null);

    // Kiểm tra xem đã có mã cũ đang active chưa, nếu chưa có thì sinh mã mới
    let currentCode = transferCode;
    if (!currentCode) {
      currentCode = `EFF${Math.floor(100000 + Math.random() * 900000)}`;
      setTransferCode(currentCode);
    }

    try {
      localStorage.setItem(
        "sepay_active_order",
        JSON.stringify({
          transferCode: currentCode,
          buyerEmail,
          paymentAmount,
          isVerified: isPaymentVerified,
        }),
      );
    } catch {
      // ignore
    }

    setOpenCheckoutModal(true);
  };

  // Check SePay payment verification API
  const handleCheckSepayPayment = async (manual: boolean = true) => {
    if (!transferCode) return;
    if (manual) setIsVerifyingSepay(true);
    setPaymentError(null);

    const currentAmount = customAmountInput
      ? Number(customAmountInput.replace(/\D/g, "")) || paymentAmount
      : paymentAmount;

    try {
      const res = await fetch(
        `/api/check-sepay-payment?code=${encodeURIComponent(transferCode)}&amount=${currentAmount}`,
      );
      const data = await res.json();

      if (data.success && data.paid) {
        setIsPaymentVerified(true);
        try {
          localStorage.setItem(
            "sepay_active_order",
            JSON.stringify({
              transferCode,
              buyerEmail,
              paymentAmount: currentAmount,
              isVerified: true,
            }),
          );
        } catch {
          // ignore
        }
        if (manual) {
          setPaymentError(null);
        }
      } else {
        if (manual) {
          setPaymentError(
            t(
              "Chưa tìm thấy chuyển khoản khớp mã " +
                transferCode +
                ". Nếu bạn vừa chuyển, vui lòng chờ 5-10 giây rồi thử lại.",
              "No transfer matching code " +
                transferCode +
                " found yet. If you just transferred, please wait 5-10 seconds and retry.",
            ),
          );
        }
      }
    } catch (err: any) {
      if (manual) {
        setPaymentError(
          t(
            "Lỗi kết nối kiểm tra SePay: " + (err.message || ""),
            "Connection error while checking SePay: " + (err.message || ""),
          ),
        );
      }
    } finally {
      if (manual) setIsVerifyingSepay(false);
    }
  };

  // Auto poll SePay every 4 seconds while modal is open and not yet verified
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (openCheckoutModal && !isPaymentVerified && !paymentSuccess && transferCode) {
      interval = setInterval(() => {
        handleCheckSepayPayment(false);
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [openCheckoutModal, isPaymentVerified, paymentSuccess, transferCode, paymentAmount, customAmountInput]);

  // Download raw Python file directly to device
  const handleDownloadPythonFile = () => {
    const snippet = activePresetConfig.pythonSnippet(intensity, paramA, paramB);
    const blob = new Blob([snippet], { type: "text/x-python;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${(activePresetConfig.name || "effect").toLowerCase().replace(/[^a-z0-9]+/g, "_")}.py`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Submit payment confirmation & send email via API
  const handleConfirmPaymentAndSendEmail = async () => {
    if (!buyerEmail.trim() || !buyerEmail.includes("@")) {
      setPaymentError(
        t(
          "Vui lòng nhập địa chỉ email hợp lệ để nhận mã nguồn.",
          "Please enter a valid email address to receive source code.",
        ),
      );
      return;
    }

    const currentAmount = customAmountInput
      ? Number(customAmountInput.replace(/\D/g, "")) || paymentAmount
      : paymentAmount;

    setIsSubmittingPayment(true);
    setPaymentError(null);

    try {
      const snippet = activePresetConfig.pythonSnippet(
        intensity,
        paramA,
        paramB,
      );
      const res = await fetch("/api/send-effect-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: buyerEmail.trim(),
          amount: currentAmount,
          effectName: activePresetConfig.name,
          effectTag: activePresetConfig.tag,
          effectDescription: activePresetConfig.description,
          pythonCode: snippet,
          transactionRef: transferCode || `EFF-${Date.now().toString(36).toUpperCase()}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gửi email thất bại.");
      }

      // Xóa order khỏi pending sau khi đã hoàn tất
      try {
        localStorage.removeItem("sepay_active_order");
      } catch {
        // ignore
      }

      // Tự động tải file Python về máy ngay lập tức
      handleDownloadPythonFile();
      setPaymentSuccess(true);
    } catch (err: any) {
      setPaymentError(err.message || "Lỗi xử lý gửi email.");
    } finally {
      setIsSubmittingPayment(false);
    }
  };

  // Copy Python snippet
  const handleCopyCode = () => {
    const snippet = activePresetConfig.pythonSnippet(intensity, paramA, paramB);
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Split-view drag handlers
  const handlePointerDown = () => {
    isDraggingRef.current = true;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
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
        boxShadow:
          mode === "light"
            ? "0 20px 45px -15px rgba(0,0,0,0.06)"
            : "0 20px 40px -15px rgba(0,0,0,0.5)",
      }}
    >
      {/* Studio Header */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 2.5 }}
      >
        <Box sx={{ flex: 1, minWidth: 0, pr: { md: 2 } }}>
          <Stack
            direction="row"
            spacing={1.2}
            alignItems="center"
            sx={{ mb: 0.5 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: mode === "light" ? "#0F172A" : "#FFFFFF",
              }}
            >
              Live Python Effects Studio
            </Typography>
            <Chip
              label="Real-time Preview"
              size="small"
              sx={{
                bgcolor:
                  mode === "light"
                    ? "rgba(79, 70, 229, 0.08)"
                    : "rgba(91, 107, 255, 0.15)",
                color: "var(--color-primary, #4F46E5)",
                fontWeight: 700,
                fontSize: "0.72rem",
                height: 22,
              }}
            />
          </Stack>
          <Typography
            variant="body2"
            sx={{
              color:
                mode === "light" ? "#64748B" : "var(--color-text-secondary)",
              fontSize: "0.85rem",
            }}
          >
            {t(
              "Trải nghiệm trực tiếp các thuật toán xử lý ảnh Python (Color Grading, Bloom, Stylize, Warp...) ngay trên trình duyệt.",
              "Interactive live preview of Python image processing algorithms (Color Grading, Bloom, Stylize, Warp...) directly in your browser.",
            )}
          </Typography>
        </Box>

        {/* Action Buttons Toolbar - Strict Single Row */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            flexShrink: 0,
            flexWrap: "nowrap",
            width: { xs: "100%", sm: "auto" },
            overflowX: { xs: "auto", sm: "visible" },
            pb: { xs: 0.5, sm: 0 },
          }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={() => setShowCode(!showCode)}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              borderColor: mode === "light" ? "#CBD5E1" : "var(--color-border)",
              color: mode === "light" ? "#334155" : "var(--color-text-primary)",
              fontSize: "0.8rem",
              py: 0.6,
              px: 1.5,
              whiteSpace: "nowrap",
              flexShrink: 0,
              "&:hover": { borderColor: "var(--color-primary)" },
            }}
          >
            {showCode ? t("Ẩn Code", "Hide Code") : t("Xem Code", "View Code")}
          </Button>

          <Button
            variant="outlined"
            size="small"
            onClick={handleDownload}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              borderColor: mode === "light" ? "#CBD5E1" : "var(--color-border)",
              color: mode === "light" ? "#334155" : "var(--color-text-primary)",
              fontSize: "0.8rem",
              py: 0.6,
              px: 1.5,
              whiteSpace: "nowrap",
              flexShrink: 0,
              "&:hover": { borderColor: "var(--color-primary)" },
            }}
          >
            {t("Tải Ảnh", "Download Image")}
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={handleOpenCheckout}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "0.825rem",
              py: 0.6,
              px: 1.8,
              whiteSpace: "nowrap",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(245, 158, 11, 0.25)",
              "&:hover": { opacity: 0.95 },
            }}
          >
            {t("Buy Me a Coffee & Tải Code", "Buy Me a Coffee & Get Code")}
          </Button>
        </Stack>
      </Stack>

      {/* SLEEK AI PROMPT BAR */}
      <Box
        sx={{
          p: 1.5,
          mb: 2.5,
          borderRadius: "16px",
          bgcolor: mode === "light" ? "#F8FAFC" : "rgba(255, 255, 255, 0.03)",
          border: "1px solid",
          borderColor:
            mode === "light" ? "#E2E8F0" : "rgba(255, 255, 255, 0.08)",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems="center"
        >
          <TextField
            fullWidth
            size="small"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder={t(
              "Nhập ý tưởng hiệu ứng AI (VD: Màu phim vintage ấm 1970, Tokyo Cyberpunk, Hoàng hôn cinematic...)",
              "Enter AI effect idea (e.g. 1970s vintage warm film, Tokyo Cyberpunk, Sunset cinematic glow...)",
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleGenerateAIEffect();
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: mode === "light" ? "#FFFFFF" : "rgba(10, 11, 16, 0.5)",
                borderRadius: "10px",
                color: mode === "light" ? "#0F172A" : "#FFFFFF",
                fontSize: "0.875rem",
                "& fieldset": {
                  borderColor:
                    mode === "light" ? "#CBD5E1" : "rgba(255,255,255,0.12)",
                },
                "&:hover fieldset": { borderColor: "var(--color-primary)" },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={() => handleGenerateAIEffect()}
            disabled={isGeneratingAI || !aiPrompt.trim()}
            startIcon={
              isGeneratingAI ? (
                <CircularProgress size={15} color="inherit" />
              ) : undefined
            }
            sx={{
              whiteSpace: "nowrap",
              minWidth: { sm: "140px" },
              py: 0.85,
              px: 2,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.85rem",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
              "&:hover": { opacity: 0.95 },
            }}
          >
            {isGeneratingAI
              ? t("Đang xử lý...", "Generating...")
              : t("Tạo bằng AI", "Generate with AI")}
          </Button>
        </Stack>

        {/* Quick Suggestions inline */}
        <Stack
          direction="row"
          spacing={0.8}
          flexWrap="wrap"
          alignItems="center"
          sx={{ mt: 1.2 }}
        >
          <Typography
            variant="caption"
            sx={{
              color:
                mode === "light" ? "#64748B" : "var(--color-text-secondary)",
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          >
            {t("Gợi ý:", "Suggestions:")}
          </Typography>
          {[
            { vn: "Vệt mờ chuyển động Motion Blur", en: "Motion Radial Speed Zoom" },
            { vn: "Tokyo Cyberpunk Neon", en: "Tokyo Cyberpunk Neon" },
            { vn: "Màu phim Polaroid 1970s", en: "1970s Polaroid Film" },
            { vn: "Hoàng hôn HDR Golden Glow", en: "HDR Golden Sunset Glow" },
            {
              vn: "Biến dạng quang sai Fisheye",
              en: "Fisheye & Chromatic Shift",
            },
          ].map((promptItem, idx) => (
            <Chip
              key={idx}
              label={t(promptItem.vn, promptItem.en)}
              size="small"
              onClick={() => {
                const text = t(promptItem.vn, promptItem.en);
                setAiPrompt(text);
                handleGenerateAIEffect(text);
              }}
              clickable
              sx={{
                fontSize: "0.72rem",
                height: 24,
                bgcolor:
                  mode === "light" ? "#FFFFFF" : "rgba(255,255,255,0.05)",
                border: "1px solid",
                borderColor:
                  mode === "light" ? "#E2E8F0" : "rgba(255,255,255,0.08)",
                color: mode === "light" ? "#334155" : "#E2E8F0",
                "&:hover": {
                  borderColor: "var(--color-primary)",
                  bgcolor:
                    mode === "light"
                      ? "rgba(79, 70, 229, 0.06)"
                      : "rgba(91, 107, 255, 0.15)",
                },
              }}
            />
          ))}
        </Stack>

        {aiError && (
          <Alert
            severity="error"
            sx={{ mt: 1.2, borderRadius: "8px", py: 0.2, fontSize: "0.8rem" }}
          >
            {aiError}
          </Alert>
        )}

        {aiSuccessMessage && (
          <Alert
            severity="success"
            sx={{
              mt: 1.2,
              borderRadius: "8px",
              py: 0.5,
              alignItems: "center",
              "& .MuiAlert-message": { width: "100%" },
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={1}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontSize: "0.825rem" }}
              >
                {aiSuccessMessage}
              </Typography>
              <Button
                variant="contained"
                size="small"
                startIcon={<LocalCafeRounded sx={{ fontSize: "1rem" }} />}
                onClick={handleOpenCheckout}
                sx={{
                  bgcolor: "#F59E0B",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.775rem",
                  textTransform: "none",
                  borderRadius: "6px",
                  py: 0.4,
                  px: 1.2,
                  whiteSpace: "nowrap",
                  "&:hover": { bgcolor: "#D97706" },
                }}
              >
                {t("Buy Me a Coffee & Tải code", "Buy Me a Coffee & Get Code")}
              </Button>
            </Stack>
          </Alert>
        )}
      </Box>

      {/* Preset Selector Bar */}
      <Box sx={{ mb: 2.5 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ overflowX: "auto", pb: 0.5 }}
        >
          {currentCustomEffect && (
            <Chip
              label={currentCustomEffect.name}
              onClick={() => handlePresetSelect("custom_ai")}
              clickable
              color={selectedPreset === "custom_ai" ? "primary" : "default"}
              variant={selectedPreset === "custom_ai" ? "filled" : "outlined"}
              sx={{
                fontWeight: selectedPreset === "custom_ai" ? 700 : 500,
                fontSize: "0.8rem",
                height: 32,
                borderRadius: "10px",
                borderColor:
                  selectedPreset === "custom_ai"
                    ? "#06B6D4"
                    : "rgba(6, 182, 212, 0.4)",
                bgcolor:
                  selectedPreset === "custom_ai"
                    ? "#06B6D4"
                    : "rgba(6, 182, 212, 0.08)",
                color: selectedPreset === "custom_ai" ? "#fff" : "#0891B2",
              }}
            />
          )}
          {PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.id;
            return (
              <Chip
                key={preset.id}
                label={preset.name}
                onClick={() => handlePresetSelect(preset.id)}
                clickable
                color={isSelected ? "primary" : "default"}
                variant={isSelected ? "filled" : "outlined"}
                sx={{
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: "0.8rem",
                  height: 32,
                  borderRadius: "10px",
                  borderColor: isSelected
                    ? "var(--color-primary)"
                    : mode === "light"
                      ? "#E2E8F0"
                      : "rgba(255,255,255,0.1)",
                  bgcolor: isSelected
                    ? "var(--color-primary, #4F46E5)"
                    : "transparent",
                  color: isSelected
                    ? "#fff"
                    : mode === "light"
                      ? "#334155"
                      : "#E2E8F0",
                  "&:hover": {
                    bgcolor: isSelected
                      ? "var(--color-primary)"
                      : mode === "light"
                        ? "#F1F5F9"
                        : "rgba(255,255,255,0.05)",
                  },
                }}
              />
            );
          })}
        </Stack>
      </Box>

      {/* Main Studio Workspace Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 340px" },
          gap: 3,
        }}
      >
        {/* Left Side: Interactive Before / After Canvas Display */}
        <Box>
          <Box
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerMove={handlePointerMove}
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "4/3",
              maxHeight: "520px",
              borderRadius: "18px",
              overflow: "hidden",
              bgcolor: "#000",
              cursor: "ew-resize",
              userSelect: "none",
              touchAction: "none",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Background Layer: Processed Canvas (Effect Applied) */}
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />

            {/* Foreground Layer: Original Image (Clipped by slider position) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImageSrc}
              alt="Original"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                display: "block",
                pointerEvents: "none",
              }}
            />

            {/* Draggable Divider Line */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${sliderPos}%`,
                width: "3px",
                bgcolor: "#fff",
                boxShadow: "0 0 10px rgba(0,0,0,0.7)",
                transform: "translateX(-50%)",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  bgcolor: "#fff",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                }}
              >
                <CompareArrowsRounded fontSize="small" />
              </Box>
            </Box>

            {/* Labels for Before / After */}
            <Box
              sx={{
                position: "absolute",
                bottom: 12,
                left: 12,
                px: 1.5,
                py: 0.5,
                borderRadius: "8px",
                bgcolor: "rgba(0,0,0,0.65)",
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: 600,
                backdropFilter: "blur(4px)",
                pointerEvents: "none",
              }}
            >
              {t("Ảnh gốc (Before)", "Original (Before)")}
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: 12,
                right: 12,
                px: 1.5,
                py: 0.5,
                borderRadius: "8px",
                bgcolor: "rgba(91, 107, 255, 0.85)",
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: 600,
                backdropFilter: "blur(4px)",
                pointerEvents: "none",
              }}
            >
              {t("Hiệu ứng:", "Effect:")} {activePresetConfig.name}
            </Box>
          </Box>

          {/* Sample Images & Upload Control */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="caption"
                sx={{ color: "var(--color-text-secondary)", fontWeight: 600 }}
              >
                {t("Ảnh mẫu:", "Samples:")}
              </Typography>
              {SAMPLE_IMAGES.map((img) => (
                <Button
                  key={img.id}
                  size="small"
                  onClick={() => setCurrentImageSrc(img.src)}
                  variant={
                    currentImageSrc === img.src ? "contained" : "outlined"
                  }
                  sx={{
                    textTransform: "none",
                    fontSize: "0.75rem",
                    borderRadius: "8px",
                    px: 1.2,
                    py: 0.3,
                    borderColor: "var(--color-border)",
                    bgcolor:
                      currentImageSrc === img.src
                        ? "var(--color-primary)"
                        : "transparent",
                  }}
                >
                  {img.name}
                </Button>
              ))}
            </Stack>

            <Button
              component="label"
              size="small"
              startIcon={<CloudUploadRounded />}
              variant="outlined"
              sx={{
                textTransform: "none",
                fontSize: "0.8rem",
                borderRadius: "10px",
                borderColor: "var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            >
              {t("Upload ảnh của bạn", "Upload Custom Image")}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          </Stack>
        </Box>

        {/* Right Side: Parameter Tuning & Effect Info */}
        <Box>
          <Card
            elevation={0}
            sx={{
              bgcolor: "rgba(255,255,255,0.02)",
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              p: 2.5,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                {t("Thông số thuật toán", "Algorithm Parameters")}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.825rem",
                  mb: 3,
                }}
              >
                {activePresetConfig.description}
              </Typography>

              {/* Slider 1: Intensity */}
              <Box sx={{ mb: 2.5 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 0.5 }}
                >
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 600, color: "var(--color-text-primary)" }}
                  >
                    {t("Cường độ hiệu ứng (Intensity)", "Effect Intensity")}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "var(--color-primary)", fontWeight: 700 }}
                  >
                    {intensity}%
                  </Typography>
                </Stack>
                <Slider
                  value={intensity}
                  min={0}
                  max={100}
                  onChange={(_, val) => setIntensity(val as number)}
                  sx={{ color: "var(--color-primary, #5B6BFF)" }}
                />
              </Box>

              {/* Slider 2: Param A */}
              <Box sx={{ mb: 2.5 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 0.5 }}
                >
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 600, color: "var(--color-text-primary)" }}
                  >
                    {activePresetConfig.paramALabel}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "var(--color-primary)", fontWeight: 700 }}
                  >
                    {paramA}%
                  </Typography>
                </Stack>
                <Slider
                  value={paramA}
                  min={0}
                  max={100}
                  onChange={(_, val) => setParamA(val as number)}
                  sx={{ color: "var(--color-primary, #5B6BFF)" }}
                />
              </Box>

              {/* Slider 3: Param B */}
              <Box sx={{ mb: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 0.5 }}
                >
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 600, color: "var(--color-text-primary)" }}
                  >
                    {activePresetConfig.paramBLabel}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "var(--color-primary)", fontWeight: 700 }}
                  >
                    {paramB}%
                  </Typography>
                </Stack>
                <Slider
                  value={paramB}
                  min={0}
                  max={100}
                  onChange={(_, val) => setParamB(val as number)}
                  sx={{ color: "var(--color-primary, #5B6BFF)" }}
                />
              </Box>
            </Box>

            {/* Quick Actions at bottom */}
            <Box>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={() => {
                  setIntensity(activePresetConfig.defaults.intensity);
                  setParamA(activePresetConfig.defaults.paramA);
                  setParamB(activePresetConfig.defaults.paramB);
                }}
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {t("Đặt lại thông số mặc định", "Reset to Default Values")}
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>

      {/* Collapsible Python Code Inspector */}
      {showCode && (
        <Box
          sx={{
            mt: 3,
            p: 2.5,
            borderRadius: "16px",
            bgcolor: "#0d1117",
            border: "1px solid #30363d",
            color: "#c9d1d9",
            fontFamily: "monospace",
            fontSize: "0.85rem",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1.5 }}
          >
            <Typography
              variant="caption"
              sx={{ color: "#8b949e", fontWeight: 600 }}
            >
              {t(
                "Mã nguồn Python Pipeline (NumPy & OpenCV)",
                "Python Pipeline Implementation (NumPy & OpenCV)",
              )}
            </Typography>
            <Button
              size="small"
              onClick={handleCopyCode}
              sx={{
                color: copiedCode ? "#2ea043" : "#c9d1d9",
                textTransform: "none",
                fontSize: "0.75rem",
              }}
            >
              {copiedCode
                ? t("Đã sao chép!", "Copied!")
                : t("Sao chép Code", "Copy Code")}
            </Button>
          </Stack>
          <Box
            component="pre"
            sx={{
              overflowX: "auto",
              m: 0,
              p: 1.5,
              borderRadius: "8px",
              bgcolor: "rgba(0,0,0,0.4)",
              lineHeight: 1.5,
            }}
          >
            {activePresetConfig.pythonSnippet(intensity, paramA, paramB)}
          </Box>
        </Box>
      )}
      {/* BUY ME A COFFEE & EMAIL DELIVERY MODAL */}
      <Dialog
        open={openCheckoutModal}
        onClose={() => setOpenCheckoutModal(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "24px",
            backgroundColor:
              mode === "light" ? "#FFFFFF !important" : "#14151C !important",
            color:
              mode === "light" ? "#0F172A !important" : "#F8FAFC !important",
            backgroundImage: "none !important",
            border: "1px solid",
            borderColor:
              mode === "light"
                ? "#E2E8F0 !important"
                : "rgba(255,255,255,0.12) !important",
            boxShadow:
              mode === "light"
                ? "0 25px 50px -12px rgba(0,0,0,0.12)"
                : "0 25px 50px -12px rgba(0,0,0,0.7)",
            p: { xs: 1.5, sm: 2.5 },
          },
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "24px",
              backgroundColor:
                mode === "light" ? "#FFFFFF !important" : "#14151C !important",
              color:
                mode === "light" ? "#0F172A !important" : "#F8FAFC !important",
              backgroundImage: "none !important",
              border: "1px solid",
              borderColor:
                mode === "light"
                  ? "#E2E8F0 !important"
                  : "rgba(255,255,255,0.12) !important",
              p: { xs: 1.5, sm: 2.5 },
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            pb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.01em",
              color:
                mode === "light"
                  ? "#0F172A !important"
                  : "#FFFFFF !important",
            }}
          >
            {t(
              "Buy Me a Coffee & Tải Mã Nguồn",
              "Buy Me a Coffee & Get Source Code",
            )}
          </Typography>
          <IconButton
            onClick={() => setOpenCheckoutModal(false)}
            size="small"
            sx={{
              color:
                mode === "light" ? "#64748B !important" : "#94A3B8 !important",
            }}
          >
            <CloseRounded />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 1 }}>
          {paymentSuccess ? (
            /* SUCCESS VIEW */
            <Box sx={{ textAlign: "center", py: 3 }}>
              <CheckCircleRounded
                sx={{ fontSize: "4rem", color: "#10B981", mb: 2 }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  color:
                    mode === "light"
                      ? "#0F172A !important"
                      : "#FFFFFF !important",
                }}
              >
                {t(
                  "Cảm Ơn Bạn Đã Ủng Hộ!",
                  "Thank You for Buying Me a Coffee!",
                )}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color:
                    mode === "light"
                      ? "#475569 !important"
                      : "#94A3B8 !important",
                  mb: 3,
                  maxWidth: 440,
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                {t(
                  `Mã nguồn Python của hiệu ứng "${activePresetConfig.name}" đã được tự động gửi đến hòm thư ${buyerEmail} và file .py đã tải về máy của bạn.`,
                  `The full Python source code of "${activePresetConfig.name}" has been sent to ${buyerEmail} and the .py file was downloaded to your device.`,
                )}
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent="center"
                sx={{ mb: 2 }}
              >
                <Button
                  variant="contained"
                  onClick={handleDownloadPythonFile}
                  sx={{
                    borderRadius: "12px",
                    bgcolor: "var(--color-primary, #4F46E5)",
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  {t("Tải lại file Python (.py)", "Download .py Again")}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCopyCode}
                  sx={{
                    borderRadius: "12px",
                    borderColor:
                      mode === "light" ? "#CBD5E1" : "var(--color-border)",
                    color:
                      mode === "light"
                        ? "#0F172A"
                        : "var(--color-text-primary)",
                    textTransform: "none",
                  }}
                >
                  {t("Sao chép Code", "Copy Code")}
                </Button>
              </Stack>
            </Box>
          ) : (
            /* COFFEE DONATE FORM & SEPAY QR */
            <Box>
              {/* Effect Meta Card */}
              <Box
                sx={{
                  p: 2,
                  mb: 2.5,
                  borderRadius: "14px",
                  bgcolor:
                    mode === "light"
                      ? "#F8FAFC !important"
                      : "rgba(255,255,255,0.04) !important",
                  border: "1px solid",
                  borderColor:
                    mode === "light"
                      ? "#E2E8F0 !important"
                      : "rgba(255,255,255,0.08) !important",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 0.5 }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 800,
                      color: "var(--color-primary, #4F46E5)",
                    }}
                  >
                    {activePresetConfig.name}
                  </Typography>
                  <Chip
                    label={activePresetConfig.tag || "Python Module"}
                    size="small"
                    sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                  />
                </Stack>
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      mode === "light"
                        ? "#475569 !important"
                        : "#94A3B8 !important",
                    fontSize: "0.825rem",
                    lineHeight: 1.5,
                  }}
                >
                  {activePresetConfig.description}
                </Typography>
              </Box>

              {/* Step 1: Buyer Email */}
              <Box sx={{ mb: 2.5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color:
                      mode === "light"
                        ? "#0F172A !important"
                        : "#F8FAFC !important",
                  }}
                >
                  {t(
                    "1. Địa chỉ Email nhận file & mã nguồn Python:",
                    "1. Recipient Email for Python Source Code:",
                  )}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  placeholder={t(
                    "vidu: yourname@gmail.com",
                    "e.g. yourname@gmail.com",
                  )}
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      bgcolor:
                        mode === "light"
                          ? "#FFFFFF !important"
                          : "rgba(10, 11, 16, 0.6) !important",
                      color:
                        mode === "light"
                          ? "#0F172A !important"
                          : "#FFFFFF !important",
                      "& fieldset": {
                        borderColor:
                          mode === "light"
                            ? "#CBD5E1 !important"
                            : "rgba(255,255,255,0.15) !important",
                      },
                      "&:hover fieldset": {
                        borderColor: "var(--color-primary) !important",
                      },
                    },
                  }}
                />
              </Box>

              {/* Step 2: Buy Me a Coffee Amount Selection */}
              <Box sx={{ mb: 2.5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color:
                      mode === "light"
                        ? "#0F172A !important"
                        : "#F8FAFC !important",
                  }}
                >
                  {t(
                    "2. Chọn mức mời cà phê (Buy Me a Coffee):",
                    "2. Select coffee / donation amount:",
                  )}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  sx={{ mb: 1.5 }}
                >
                  {DONATE_AMOUNTS.map((tier) => {
                    const isSelected =
                      paymentAmount === tier.value && !customAmountInput;
                    return (
                      <Chip
                        key={tier.value}
                        label={`${tier.label} (${tier.value.toLocaleString("vi-VN")} đ)`}
                        clickable
                        onClick={() => {
                          setPaymentAmount(tier.value);
                          setCustomAmountInput("");
                        }}
                        sx={{
                          py: 2,
                          borderRadius: "10px",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          borderColor: isSelected
                            ? "#F59E0B !important"
                            : mode === "light"
                              ? "#CBD5E1 !important"
                              : "rgba(255,255,255,0.15) !important",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          bgcolor: isSelected
                            ? "#F59E0B !important"
                            : mode === "light"
                              ? "#FFFFFF !important"
                              : "#1A1D27 !important",
                          color: isSelected
                            ? "#FFFFFF !important"
                            : mode === "light"
                              ? "#0F172A !important"
                              : "#F8FAFC !important",
                          "&:hover": {
                            borderColor: "#F59E0B !important",
                            bgcolor: isSelected
                              ? "#D97706 !important"
                              : mode === "light"
                                ? "#F1F5F9 !important"
                                : "#242836 !important",
                          },
                        }}
                      />
                    );
                  })}
                </Stack>
                <TextField
                  fullWidth
                  size="small"
                  placeholder={t(
                    "Hoặc nhập số tiền tùy ý khác (VNĐ)...",
                    "Or enter custom amount (VNĐ)...",
                  )}
                  value={customAmountInput}
                  onChange={(e) => setCustomAmountInput(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      bgcolor:
                        mode === "light"
                          ? "#FFFFFF !important"
                          : "rgba(10, 11, 16, 0.6) !important",
                      color:
                        mode === "light"
                          ? "#0F172A !important"
                          : "#FFFFFF !important",
                      "& fieldset": {
                        borderColor:
                          mode === "light"
                            ? "#CBD5E1 !important"
                            : "rgba(255,255,255,0.15) !important",
                      },
                      "&:hover fieldset": {
                        borderColor: "var(--color-primary) !important",
                      },
                    },
                  }}
                />
              </Box>

              {/* Step 3: SePay QR Payment Display */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: "16px",
                  bgcolor:
                    mode === "light"
                      ? "#F8FAFC !important"
                      : "rgba(255,255,255,0.03) !important",
                  border: "1px solid",
                  borderColor: isPaymentVerified
                    ? "#10B981 !important"
                    : mode === "light"
                      ? "#E2E8F0 !important"
                      : "rgba(255,255,255,0.08) !important",
                  mb: 2,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1.5 }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 800,
                      color:
                        mode === "light"
                          ? "#0F172A !important"
                          : "#F8FAFC !important",
                    }}
                  >
                    {t(
                      "3. Quét mã QR SePay (Xác thực tự động)",
                      "3. Scan SePay QR (Instant Verification)",
                    )}
                  </Typography>

                  {isPaymentVerified ? (
                    <Chip
                      label={t("Đã thanh toán thành công ✓", "Payment Verified ✓")}
                      color="success"
                      size="small"
                      sx={{ fontWeight: 700 }}
                    />
                  ) : (
                    <Chip
                      icon={<CircularProgress size={12} color="inherit" />}
                      label={t("Đang chờ chuyển khoản...", "Waiting for transfer...")}
                      size="small"
                      sx={{
                        bgcolor: "rgba(245, 158, 11, 0.15)",
                        color: "#F59E0B",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    />
                  )}
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems="center"
                >
                  <Box
                    component="img"
                    src={buildSepayQrUrl(
                      customAmountInput
                        ? Number(customAmountInput.replace(/\D/g, "")) ||
                            paymentAmount
                        : paymentAmount,
                      transferCode || "EFFSTUDIO",
                    )}
                    alt="SePay QR Techcombank"
                    sx={{
                      width: { xs: 170, sm: 195 },
                      height: { xs: 170, sm: 195 },
                      borderRadius: "14px",
                      border: "1px solid",
                      borderColor:
                        mode === "light" ? "#E2E8F0" : "rgba(255,255,255,0.1)",
                      bgcolor: "#FFFFFF",
                      p: 0.8,
                      flexShrink: 0,
                    }}
                  />

                  <Box sx={{ width: "100%" }}>
                    <Stack spacing={0.8}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography
                          variant="caption"
                          sx={{
                            color:
                              mode === "light"
                                ? "#64748B !important"
                                : "#94A3B8 !important",
                          }}
                        >
                          {t("Ngân hàng:", "Bank:")}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color:
                              mode === "light"
                                ? "#0F172A !important"
                                : "#F8FAFC !important",
                          }}
                        >
                          {SEPAY_BANK}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography
                          variant="caption"
                          sx={{
                            color:
                              mode === "light"
                                ? "#64748B !important"
                                : "#94A3B8 !important",
                          }}
                        >
                          {t("Số tài khoản:", "Account No:")}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 800,
                            color: "var(--color-primary)",
                            letterSpacing: "0.03em",
                          }}
                        >
                          {SEPAY_ACCOUNT}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography
                          variant="caption"
                          sx={{
                            color:
                              mode === "light"
                                ? "#64748B !important"
                                : "#94A3B8 !important",
                          }}
                        >
                          {t("Chủ tài khoản:", "Account Holder:")}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color:
                              mode === "light"
                                ? "#0F172A !important"
                                : "#F8FAFC !important",
                          }}
                        >
                          {SEPAY_ACCOUNT_NAME}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography
                          variant="caption"
                          sx={{
                            color:
                              mode === "light"
                                ? "#64748B !important"
                                : "#94A3B8 !important",
                          }}
                        >
                          {t("Số tiền:", "Amount:")}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 800, color: "#F59E0B" }}
                        >
                          {(customAmountInput
                            ? Number(customAmountInput.replace(/\D/g, "")) ||
                            paymentAmount
                            : paymentAmount
                          ).toLocaleString("vi-VN")}{" "}
                          VNĐ
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography
                          variant="caption"
                          sx={{
                            color:
                              mode === "light"
                                ? "#64748B !important"
                                : "#94A3B8 !important",
                          }}
                        >
                          {t("Mã nội dung CK:", "Transfer Code:")}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 800,
                            fontFamily: "monospace",
                            fontSize: "0.9rem",
                            color: "#F59E0B !important",
                            bgcolor: "rgba(245, 158, 11, 0.1)",
                            px: 0.8,
                            py: 0.2,
                            borderRadius: "4px",
                          }}
                        >
                          {transferCode || "EFFSTUDIO"}
                        </Typography>
                      </Stack>
                    </Stack>

                    {/* Khôi phục mã chuyển khoản cũ nếu khách đã chuyển trước đó */}
                    <Box sx={{ mt: 1.5, pt: 1, borderTop: "1px dashed", borderColor: mode === "light" ? "#E2E8F0" : "rgba(255,255,255,0.08)" }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <TextField
                          size="small"
                          placeholder={t("Đã chuyển trước đó? Nhập mã EFF...", "Transferred earlier? Enter EFF code...")}
                          value={transferCode}
                          onChange={(e) => {
                            const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
                            setTransferCode(val);
                            setIsPaymentVerified(false);
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              fontSize: "0.75rem",
                              height: 32,
                              borderRadius: "8px",
                              fontFamily: "monospace",
                              bgcolor: mode === "light" ? "#FFFFFF" : "rgba(255,255,255,0.03)",
                            },
                          }}
                        />
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            const newCode = `EFF${Math.floor(100000 + Math.random() * 900000)}`;
                            setTransferCode(newCode);
                            setIsPaymentVerified(false);
                          }}
                          sx={{
                            textTransform: "none",
                            fontSize: "0.72rem",
                            height: 32,
                            px: 1,
                            borderRadius: "8px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {t("Tạo mã mới", "New Code")}
                        </Button>
                      </Stack>
                    </Box>

                    <Button
                      fullWidth
                      size="small"
                      variant="outlined"
                      onClick={() => handleCheckSepayPayment(true)}
                      disabled={isVerifyingSepay || isPaymentVerified}
                      startIcon={
                        isVerifyingSepay ? (
                          <CircularProgress size={14} color="inherit" />
                        ) : undefined
                      }
                      sx={{
                        mt: 1.5,
                        borderRadius: "8px",
                        textTransform: "none",
                        fontSize: "0.8rem",
                        borderColor: isPaymentVerified
                          ? "#10B981"
                          : mode === "light"
                            ? "#CBD5E1"
                            : "rgba(255,255,255,0.2)",
                        color: isPaymentVerified
                          ? "#10B981"
                          : mode === "light"
                            ? "#0F172A"
                            : "#FFFFFF",
                      }}
                    >
                      {isPaymentVerified
                        ? t("Hệ thống đã nhận được tiền ✓", "Payment Confirmed ✓")
                        : isVerifyingSepay
                          ? t("Đang kiểm tra SePay...", "Checking SePay...")
                          : t("Kiểm tra trạng thái chuyển khoản", "Check Payment Status")}
                    </Button>
                  </Box>
                </Stack>
              </Box>

              {paymentError && (
                <Alert severity="warning" sx={{ mb: 2, borderRadius: "10px", fontSize: "0.825rem" }}>
                  {paymentError}
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>

        {!paymentSuccess && (
          <DialogActions
            sx={{ px: 2, pb: 2, pt: 1, justifyContent: "space-between" }}
          >
            <Button
              onClick={() => setOpenCheckoutModal(false)}
              variant="text"
              sx={{
                textTransform: "none",
                color:
                  mode === "light"
                    ? "#64748B !important"
                    : "#94A3B8 !important",
                "&:hover": {
                  color:
                    mode === "light"
                      ? "#0F172A !important"
                      : "#FFFFFF !important",
                },
              }}
            >
              {t("Hủy bỏ", "Cancel")}
            </Button>
            <Button
              variant="contained"
              disabled={isSubmittingPayment || !buyerEmail.trim()}
              onClick={handleConfirmPaymentAndSendEmail}
              startIcon={
                isSubmittingPayment ? (
                  <CircularProgress size={16} color="inherit" />
                ) : undefined
              }
              sx={{
                borderRadius: "12px",
                background: isPaymentVerified
                  ? "linear-gradient(135deg, #10B981 0%, #059669 100%) !important"
                  : "linear-gradient(135deg, #F59E0B 0%, #D97706 100%) !important",
                color: "#FFFFFF !important",
                fontWeight: 700,
                textTransform: "none",
                px: 3,
                boxShadow: isPaymentVerified
                  ? "0 4px 14px rgba(16, 185, 129, 0.3)"
                  : "0 4px 14px rgba(245, 158, 11, 0.3)",
                "&:hover": { opacity: 0.95 },
              }}
            >
              {isSubmittingPayment
                ? t("Đang gửi email & tải mã nguồn...", "Sending email & downloading...")
                : isPaymentVerified
                  ? t("Lấy mã nguồn Python ngay", "Get Python Code Now")
                  : t("Tôi đã chuyển khoản & Nhận mã nguồn", "I have transferred & Get code")}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
}
