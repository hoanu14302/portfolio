"use client";

import ImageEffectsStudio from "@/components/ImageEffectsStudio";
import { useThemeMode } from "@/components/ThemeRegistry";
import { GeneratedEffectRecord } from "@/lib/supabase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import StackBase, { type StackProps } from "@mui/material/Stack";
import { type SxProps, type Theme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

// Clean MUI Icons matching Portfolio Design Language
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import HubRounded from "@mui/icons-material/HubRounded";
import KeyboardArrowUpRounded from "@mui/icons-material/KeyboardArrowUpRounded";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import NorthEastRounded from "@mui/icons-material/NorthEastRounded";

const eyebrowSx = {
  color: "var(--color-text-secondary)",
  fontFamily: "var(--font-mono)",
  fontSize: "0.8125rem",
  letterSpacing: "0.08em",
  lineHeight: 1.2,
  textTransform: "uppercase",
};

export default function ImageEffectsBusinessPage() {
  const { mode, toggleTheme } = useThemeMode();
  const [language, setLanguage] = useState<"vn" | "en">("en");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedAIEffect, setSelectedAIEffect] =
    useState<GeneratedEffectRecord | null>(null);

  const isEnglish = language === "en";
  const t = (vn: string, en: string) => (isEnglish ? en : vn);

  const contactEmail = "hoanu14302@gmail.com";
  const contactPhone = "0967223771";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const WORKFLOW_STEPS = [
    {
      step: "01",
      title: t("Nhận Yêu Cầu & Ảnh Mẫu", "Requirements & Reference Brief"),
      desc: t(
        "Khách hàng gửi brief, mô tả hiệu ứng mong muốn hoặc link ảnh/video tham khảo (moodboard).",
        "Client provides creative brief, desired visual style, or reference moodboards.",
      ),
    },
    {
      step: "02",
      title: t("Phân Tích & Chốt Milestone", "Technical Specs & Milestones"),
      desc: t(
        "Trao đổi giải pháp kỹ thuật, lựa chọn stack (NumPy/OpenCV/GPU), chốt thời gian bàn giao và báo giá.",
        "Agree on algorithm stack (NumPy/GPU CuPy), delivery schedule, and transparent quotation.",
      ),
    },
    {
      step: "03",
      title: t("Lập Trình & Benchmark", "Algorithm Implementation & Tuning"),
      desc: t(
        "Phát triển module hiệu ứng cắm-rút (plug & play), benchmark hiệu năng và tinh chỉnh màu sắc sắc nét.",
        "Engineer modular hot-swappable plugins, vectorize matrix math, and profile real-time FPS.",
      ),
    },
    {
      step: "04",
      title: t("Bàn Giao & Hỗ Trợ Tích Hợp", "Delivery & Integration Support"),
      desc: t(
        "Bàn giao full source code Python, video/ảnh test demo, tài liệu API và hỗ trợ nhúng vào hệ thống.",
        "Deliver clean PEP8 Python codebase, API documentation, unit tests, and integration assistance.",
      ),
    },
  ];

  const PIPELINE_STAGES = [
    {
      step: t("Giai đoạn 1", "Stage 1"),
      title: "Ingestion & Decoupling",
      desc: t(
        "Nhận ảnh từ Buffer, Base64, File hoặc RTSP Stream. Tách luồng I/O bất đồng bộ.",
        "Asynchronous ingestion from memory buffer, base64, raw files, or video streams.",
      ),
      color: "var(--color-primary, #4F46E5)",
    },
    {
      step: t("Giai đoạn 2", "Stage 2"),
      title: "Color Space & Tensors",
      desc: t(
        "Chuyển đổi LAB / HSV / RGB, chuẩn hóa mảng đa chiều NumPy/CuPy không sao chép thừa (Zero-copy).",
        "Color space conversion (LAB/HSV/RGB) with zero-copy NumPy/CuPy tensor normalization.",
      ),
      color: "#06B6D4",
    },
    {
      step: t("Giai đoạn 3", "Stage 3"),
      title: "Modular Effects Layer",
      desc: t(
        "Áp dụng chuỗi hiệu ứng (LUT, Bloom, Warp, Stylize) theo kiến trúc Filter Chain hot-swappable.",
        "Hot-swappable filter chaining for LUT grading, bloom extraction, and geometric warping.",
      ),
      color: "#10B981",
    },
    {
      step: t("Giai đoạn 4", "Stage 4"),
      title: "Rendering & Export",
      desc: t(
        "Compositing lớp phủ, khử răng cưa và xuất định dạng JPEG/PNG/WebP hoặc stream qua API.",
        "Alpha blending compositing, edge anti-aliasing, and ultra-fast JPEG/WebP export.",
      ),
      color: "#F59E0B",
    },
  ];

  const VALUE_PILLARS = [
    {
      num: "01",
      title: t("Kiến Trúc Modular Độc Lập", "Modular Hot-Swappable Design"),
      desc: t(
        "Hiệu ứng được đóng gói thành module độc lập, dễ dàng gắn vào / tháo ra (plug & play) và tái sử dụng.",
        "Clean, decoupled Python modules ready to plug into any backend service, desktop app, or pipeline.",
      ),
    },
    {
      num: "02",
      title: t("Tối Ưu Vectorization & GPU", "Vectorized & GPU Acceleration"),
      desc: t(
        "Khai thác tối đa sức mạnh ma trận NumPy, GPU CuPy & Taichi cho tốc độ xử lý hàng loạt thời gian thực.",
        "Maximized matrix vectorization with NumPy & GPU CuPy/Taichi for lightning-fast high-throughput throughput.",
      ),
    },
    {
      num: "03",
      title: t("Cinematic LUT & Shaders", "Cinematic LUTs & Shaders"),
      desc: t(
        "Chuyên sâu 3D LUT, Tone mapping dải sáng động cao (HDR), Glow/Bloom đa tầng và biến dạng Mesh Warp.",
        "Advanced Hollywood 3D LUT grading, dynamic tone mapping, multi-pass bloom, and optical distortions.",
      ),
    },
    {
      num: "04",
      title: t("Tích Hợp AI & Deep Learning", "AI & Deep Learning Models"),
      desc: t(
        "Sẵn sàng nhúng các mô hình AI Style Transfer, Phục chế khuôn mặt (Face Restore) và Super Resolution.",
        "Seamless integration with lightweight ONNX / TensorRT models for restoration and neural style transfers.",
      ),
    },
  ];

  return (
    <Box
      id="top"
      sx={{
        position: "relative",
        minHeight: "100vh",
        bgcolor: "var(--color-background)",
        color: "var(--color-text-primary)",
        overflowX: "hidden",
      }}
    >
      {/* Background ambient glow blobs matching Portfolio */}
      <Box
        className="glow-blob glow-blob-primary"
        sx={{
          width: { xs: 250, md: 500 },
          height: { xs: 250, md: 500 },
          top: -100,
          left: -100,
        }}
      />
      <Box
        className="glow-blob glow-blob-secondary"
        sx={{
          width: { xs: 300, md: 600 },
          height: { xs: 300, md: 600 },
          top: "25%",
          right: -150,
        }}
      />
      <Box
        className="glow-blob glow-blob-tertiary"
        sx={{
          width: { xs: 250, md: 500 },
          height: { xs: 250, md: 500 },
          top: "60%",
          left: -150,
        }}
      />

      {/* Sticky Top Navigation Bar matching Portfolio AppBar */}
      <AppBar
        position="sticky"
        elevation={0}
        className="glass-panel"
        sx={{
          borderBottom: "1px solid var(--color-border) !important",
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            minHeight: "64px !important",
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            px: { xs: 2, md: 0 },
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          {/* Brand Logo & Back to Main Portfolio */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button
              component={Link}
              href="/"
              startIcon={<ArrowBackRounded fontSize="small" />}
              sx={{
                color: "var(--color-text-secondary)",
                textTransform: "none",
                fontSize: "0.85rem",
                borderRadius: "var(--radius-full)",
                px: 1.5,
                "&:hover": {
                  color: "var(--color-text-primary)",
                  bgcolor: "var(--color-surface)",
                },
              }}
            >
              {t("Về Portfolio", "Back to Portfolio")}
            </Button>

            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 1,
                pl: 1,
                borderLeft: "1px solid var(--color-border)",
              }}
            >
              <Image
                src={mode === "light" ? "/logo-black.png" : "/logo-white.png"}
                alt=""
                width={28}
                height={28}
                aria-hidden="true"
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "var(--color-text-primary)",
                }}
              >
                Đào Hoa Nữ
              </Typography>
            </Box>
          </Stack>

          {/* Section Navigation Links */}
          <Stack
            component="nav"
            direction="row"
            spacing={0.5}
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {[
              ["#studio-demo", t("Live Studio", "Live Studio")],
              ["#pipeline", t("Kiến Trúc Pipeline", "Pipeline Arch")],
              ["#workflow", t("Quy Trình", "Workflow")],
              ["#contact", t("Liên Hệ", "Contact")],
            ].map(([href, label]) => (
              <Button
                key={href}
                href={href}
                sx={{
                  color: "var(--color-text-secondary)",
                  textTransform: "none",
                  fontSize: "0.85rem",
                  px: 1.5,
                  borderRadius: "var(--radius-full)",
                  "&:hover": {
                    color: "var(--color-text-primary)",
                    bgcolor: "var(--color-surface)",
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Stack>

          {/* Theme Mode & EN-VN Language Switcher */}
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={toggleTheme}
              aria-label={t("Chuyển chế độ sáng/tối", "Toggle light/dark mode")}
              size="small"
              sx={{
                p: "6px",
                color: "var(--color-text-secondary)",
                bgcolor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-full)",
                "&:hover": {
                  color: "var(--color-text-primary)",
                  bgcolor: "var(--color-elevated)",
                },
              }}
            >
              {mode === "dark" ? (
                <LightModeRounded fontSize="small" />
              ) : (
                <DarkModeRounded fontSize="small" />
              )}
            </IconButton>

            <ToggleButtonGroup
              value={language}
              exclusive
              onChange={(_, value: "vn" | "en" | null) =>
                value && setLanguage(value)
              }
              aria-label={t("Chọn ngôn ngữ", "Choose language")}
              size="small"
              sx={{
                p: "3px",
                gap: "2px",
                bgcolor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-full)",
                "& .MuiToggleButtonGroup-grouped": {
                  m: 0,
                  px: 1,
                  py: 0.5,
                  minWidth: 32,
                  border: 0,
                  borderRadius: "var(--radius-full) !important",
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  lineHeight: 1,
                  "&.Mui-selected": {
                    bgcolor: "var(--color-primary)",
                    color: "#FFFFFF",
                  },
                },
              }}
            >
              <ToggleButton value="vn">VN</ToggleButton>
              <ToggleButton value="en">EN</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main Container */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        {/* HERO SECTION */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 7, md: 10 },
            maxWidth: 880,
            mx: "auto",
          }}
        >
          <Typography
            component="p"
            sx={{ ...eyebrowSx, mb: 2, color: "var(--color-primary)" }}
          >
            {t(
              "GIẢI PHÁP LẬP TRÌNH HIỆU ỨNG ẢNH & PIPELINE PYTHON",
              "PYTHON IMAGE EFFECTS & HIGH-PERFORMANCE PIPELINES",
            )}
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.2rem)",
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              mb: 3,
              color: "var(--color-text-primary)",
            }}
          >
            {isEnglish ? (
              <>
                Custom Image Effects &{" "}
                <Box
                  component="span"
                  sx={{ color: "var(--color-primary-hover, #4F46E5)" }}
                >
                  High-Performance Pipelines.
                </Box>
              </>
            ) : (
              <>
                Lập Trình Hiệu Ứng Ảnh &{" "}
                <Box
                  component="span"
                  sx={{ color: "var(--color-primary-hover, #4F46E5)" }}
                >
                  Pipeline Xử Lý Nâng Cao.
                </Box>
              </>
            )}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              mb: 4,
              maxWidth: 720,
              mx: "auto",
            }}
          >
            {t(
              "Phát triển module hiệu ứng ảnh độc quyền theo yêu cầu (3D LUT Color Grading, Soft Bloom, Mesh Warp, Stylization...) và xây dựng pipeline tối ưu hóa tốc độ cao (NumPy, GPU CuPy, OpenCV) sẵn sàng tích hợp ngay vào sản phẩm thương mại.",
              "Custom visual algorithms (3D LUT color grading, anamorphic bloom, mesh warp, edge stylization) and high-throughput processing pipelines (NumPy, GPU CuPy, OpenCV) engineered for production applications.",
            )}
          </Typography>

          {/* Quick CTA Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              component="a"
              href="#studio-demo"
              variant="contained"
              size="medium"
              endIcon={<ArrowForwardRounded fontSize="small" />}
              sx={{
                py: 1.1,
                px: 3,
                borderRadius: "var(--radius-md, 12px)",
                bgcolor: "var(--color-primary)",
                fontWeight: 600,
                fontSize: "0.9rem",
                textTransform: "none",
                boxShadow: "0 6px 20px rgba(79, 70, 229, 0.25)",
                "&:hover": { bgcolor: "var(--color-primary-hover)" },
              }}
            >
              {t("Trải Nghiệm Live Studio", "Explore Live Studio")}
            </Button>

            <Button
              component="a"
              href="#contact"
              variant="outlined"
              size="medium"
              endIcon={<NorthEastRounded fontSize="small" />}
              sx={{
                py: 1.1,
                px: 2.5,
                borderRadius: "var(--radius-md, 12px)",
                borderColor: "var(--color-border-strong)",
                color: "var(--color-text-primary)",
                fontWeight: 600,
                fontSize: "0.9rem",
                textTransform: "none",
                "&:hover": {
                  borderColor: "var(--color-primary)",
                  bgcolor: "var(--color-surface)",
                },
              }}
            >
              {t("Liên Hệ & Hợp Tác", "Contact & Inquiries")}
            </Button>
          </Stack>
        </Box>

        {/* VALUE PILLARS / KEY CAPABILITIES */}
        <Box sx={{ mb: { xs: 8, md: 11 } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 2.5,
            }}
          >
            {VALUE_PILLARS.map((pillar, idx) => (
              <Card
                key={idx}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  bgcolor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  boxShadow:
                    mode === "light"
                      ? "0 4px 20px -2px rgba(0,0,0,0.03)"
                      : "none",
                  transition:
                    "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "var(--color-primary)",
                    boxShadow: "0 12px 30px rgba(79, 70, 229, 0.08)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: "var(--color-primary)",
                    mb: 1.5,
                    letterSpacing: "0.05em",
                  }}
                >
                  {pillar.num}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    letterSpacing: "-0.01em",
                    color: "var(--color-text-primary)",
                    fontSize: "0.95rem",
                    lineHeight: 1.35,
                  }}
                >
                  {pillar.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                    fontSize: "0.825rem",
                  }}
                >
                  {pillar.desc}
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>

        {/* SECTION: INTERACTIVE LIVE STUDIO */}
        <Box
          id="studio-demo"
          sx={{ mb: { xs: 9, md: 12 }, scrollMarginTop: "90px" }}
        >
          <Box sx={{ textAlign: "center", mb: 3.5 }}>
            <Typography
              component="p"
              sx={{ ...eyebrowSx, mb: 1, color: "var(--color-primary)" }}
            >
              {t(
                "Trình Diễn Tương Tác Trực Tuyến",
                "Interactive Online Playground",
              )}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.02em",
                mb: 1,
                color: "var(--color-text-primary)",
              }}
            >
              {t(
                "Trải Nghiệm Live Effects Studio & AI",
                "Live Effects Studio & AI Generator",
              )}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "var(--color-text-secondary)",
                maxWidth: 640,
                mx: "auto",
                fontSize: "0.875rem",
              }}
            >
              {t(
                "Kiểm tra chất lượng các thuật toán hiệu ứng ảnh Python hoặc nhập mô tả để Gemini AI tự sinh code hiệu ứng tức thì.",
                "Inspect Python algorithm outputs live or prompt Gemini AI to generate custom matrix operations on the fly.",
              )}
            </Typography>
          </Box>

          <ImageEffectsStudio
            activeCustomEffect={selectedAIEffect}
            language={language}
          />
        </Box>

        {/* SECTION: TECHNICAL ARCHITECTURE & PIPELINE */}
        <Box
          id="pipeline"
          sx={{ mb: { xs: 9, md: 12 }, scrollMarginTop: "90px" }}
        >
          <Box
            sx={{
              p: { xs: 3, md: 4.5 },
              borderRadius: "24px",
              bgcolor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow:
                mode === "light" ? "0 4px 20px -2px rgba(0,0,0,0.04)" : "none",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
              spacing={2.5}
              sx={{ mb: 3.5 }}
            >
              <Box>
                <Stack
                  direction="row"
                  spacing={1.2}
                  alignItems="center"
                  sx={{ mb: 0.5 }}
                >
                  <HubRounded
                    sx={{ color: "var(--color-primary)", fontSize: "1.4rem" }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {t(
                      "Kiến Trúc Pipeline Xử Lý Ảnh Chuyên Nghiệp",
                      "Production Image Pipeline Architecture",
                    )}
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.85rem",
                  }}
                >
                  {t(
                    "Luồng dữ liệu được thiết kế tối ưu từ khâu nạp ảnh đến rendering và xuất bản giao.",
                    "Modular dataflow engineered for low latency, zero redundant allocations, and parallel throughput.",
                  )}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip
                  label="OpenCV / Pillow"
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: "var(--color-border)",
                    fontSize: "0.75rem",
                  }}
                />
                <Chip
                  label="NumPy Vectorized"
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: "var(--color-border)",
                    fontSize: "0.75rem",
                  }}
                />
                <Chip
                  label="CuPy / Taichi GPU"
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: "var(--color-border)",
                    fontSize: "0.75rem",
                  }}
                />
                <Chip
                  label="FastAPI / Docker"
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: "var(--color-border)",
                    fontSize: "0.75rem",
                  }}
                />
              </Stack>
            </Stack>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: 2,
              }}
            >
              {PIPELINE_STAGES.map((layer, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 2.5,
                    borderRadius: "16px",
                    bgcolor:
                      mode === "light" ? "#F8FAFC" : "rgba(255,255,255,0.02)",
                    border: "1px solid var(--color-border)",
                    borderTop: `4px solid ${layer.color}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: layer.color,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontSize: "0.7rem",
                    }}
                  >
                    {layer.step}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      my: 0.5,
                      color: "var(--color-text-primary)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {layer.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.8rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {layer.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* SECTION: 4-STEP COLLABORATION WORKFLOW */}
        <Box
          id="workflow"
          sx={{ mb: { xs: 9, md: 12 }, scrollMarginTop: "90px" }}
        >
          <Box sx={{ textAlign: "center", mb: 4.5 }}>
            <Typography
              component="p"
              sx={{ ...eyebrowSx, mb: 1, color: "var(--color-primary)" }}
            >
              {t("Quy Trình Làm Việc", "Collaboration Workflow")}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.02em",
                mb: 1,
                color: "var(--color-text-primary)",
              }}
            >
              {t(
                "Quy Trình Triển Khai 4 Bước",
                "4-Step Project Delivery Process",
              )}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "var(--color-text-secondary)",
                maxWidth: 580,
                mx: "auto",
                fontSize: "0.875rem",
              }}
            >
              {t(
                "Làm việc chuyên nghiệp, minh bạch tiến độ và bám sát cam kết về hiệu năng.",
                "Structured delivery with clear milestones, rapid iterations, and verified performance benchmarks.",
              )}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 2.5,
            }}
          >
            {WORKFLOW_STEPS.map((ws, idx) => (
              <Box
                key={idx}
                sx={{
                  p: 3,
                  borderRadius: "18px",
                  bgcolor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  position: "relative",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "2.4rem",
                    fontWeight: 900,
                    color: "rgba(79, 70, 229, 0.15)",
                    lineHeight: 1,
                    mb: 1.2,
                  }}
                >
                  {ws.step}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    mb: 0.8,
                    fontSize: "0.95rem",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {ws.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                    fontSize: "0.825rem",
                  }}
                >
                  {ws.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* SECTION: CONTACT (Matching 06 / Contact from main portfolio) */}
      <Box
        component="section"
        id="contact"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          textAlign: "center",
        }}
      >
        <Container
          maxWidth={false}
          sx={{ maxWidth: 1200, px: { xs: 2.5, md: 0 } }}
        >
          <Typography sx={eyebrowSx}>{t("Liên hệ", "Contact")}</Typography>
          <Typography
            component="h2"
            sx={{
              mt: 1.5,
              mb: 4,
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              fontWeight: 600,
              lineHeight: 1.05,
            }}
          >
            {isEnglish ? (
              <>
                Have an Image Processing
                <br />
                <Box
                  component="span"
                  sx={{ color: "var(--color-primary-hover, #4F46E5)" }}
                >
                  Project in Mind?
                </Box>
              </>
            ) : (
              <>
                Bạn Đang Có Bài Toán
                <br />
                <Box
                  component="span"
                  sx={{ color: "var(--color-primary-hover, #4F46E5)" }}
                >
                  Hiệu Ứng Ảnh Cần Giải Quyết?
                </Box>
              </>
            )}
          </Typography>
          <Button
            href={`mailto:${contactEmail}`}
            sx={{
              color: "var(--color-primary-hover, #4F46E5)",
              textTransform: "none",
              fontSize: "1.125rem",
              borderBottom: "1px solid var(--color-primary, #4F46E5)",
              borderRadius: 0,
            }}
            endIcon={<NorthEastRounded fontSize="small" />}
          >
            {contactEmail}
          </Button>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{
              mt: 6,
              color: "var(--color-text-secondary)",
              fontSize: "0.8125rem",
            }}
          >
            <span>0967 223 771</span>
            <a
              href="https://linkedin.com/in/hoa-nữ-đào-79b949313"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "inherit",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              LinkedIn <NorthEastRounded sx={{ fontSize: "0.875rem" }} />
            </a>
            <span>{t("Long Xuyên, An Giang", "Long Xuyen, An Giang")}</span>
          </Stack>
        </Container>
      </Box>

      {/* FOOTER BAR (Matching Main Portfolio) */}
      <Container
        maxWidth={false}
        sx={{ maxWidth: 1200, px: { xs: 2.5, md: 0 } }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
          sx={{
            py: 3,
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
          }}
        >
          <span>© 2026 Đào Hoa Nữ</span>
          <span>
            {t("Lập trình / AI / Tự động hóa", "Full-stack / AI / Automation")}
          </span>
          <Button
            href="#top"
            endIcon={<KeyboardArrowUpRounded fontSize="small" />}
            sx={{
              p: 0,
              minWidth: 0,
              color: "var(--color-text-secondary)",
              textTransform: "none",
              justifyContent: "flex-start",
            }}
          >
            {t("Về đầu trang", "Back to top")}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
