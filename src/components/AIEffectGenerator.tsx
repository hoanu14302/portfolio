"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import StackBase, { type StackProps } from "@mui/material/Stack";
import { type SxProps, type Theme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import StorageRounded from "@mui/icons-material/StorageRounded";
import CodeRounded from "@mui/icons-material/CodeRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import PsychologyRounded from "@mui/icons-material/PsychologyRounded";
import SparklesIcon from "@mui/icons-material/AutoAwesomeRounded";

import { GeneratedEffectRecord, DEFAULT_COMMUNITY_EFFECTS } from "@/lib/supabase";

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

interface AIEffectGeneratorProps {
  onSelectGeneratedEffect?: (effect: GeneratedEffectRecord) => void;
}

const INSPIRATION_PROMPTS = [
  "Vintage 90s Golden Hour Polaroid with soft warm tones",
  "Cyberpunk Tokyo Neon Rain with reflective wet surface",
  "Nordic Moody Cold Blue cinematic tone mapping",
  "Dreamy Ethereal Glow & Soft Particle Light",
  "Anime Manga Stylized Comic Edge & Vibrant Colors",
];

export default function AIEffectGenerator({ onSelectGeneratedEffect }: AIEffectGeneratorProps) {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [latestEffect, setLatestEffect] = useState<GeneratedEffectRecord | null>(null);
  const [communityEffects, setCommunityEffects] = useState<GeneratedEffectRecord[]>(DEFAULT_COMMUNITY_EFFECTS);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Fetch existing effects from Supabase on mount
  useEffect(() => {
    fetch("/api/effects")
      .then((res) => res.json())
      .then((data) => {
        if (data?.effects && data.effects.length > 0) {
          setCommunityEffects(data.effects);
        }
      })
      .catch((err) => console.warn("Fetch community effects:", err));
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setErrorMsg("Vui lòng nhập mô tả ý tưởng hiệu ứng bạn muốn tạo.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/generate-effect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Không thể tạo hiệu ứng qua Gemini API.");
      }

      setLatestEffect(data.effect);
      setCommunityEffects((prev) => [data.effect, ...prev.filter((e) => e.id !== data.effect.id)]);
      setSuccessMsg("Đã tạo thuật toán hiệu ứng Python & lưu vào cơ sở dữ liệu Supabase thành công!");

      if (onSelectGeneratedEffect) {
        onSelectGeneratedEffect(data.effect);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Lỗi kết nối khi gọi Gemini API.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "var(--radius-xl, 24px)",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        p: { xs: 2.5, md: 4 },
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)",
      }}
    >
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.5 }}>
            <AutoAwesomeRounded sx={{ color: "#3DD7E5" }} />
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Gemini AI Effect Generator & Supabase DB
            </Typography>
            <Chip
              label="Gemini API + Supabase"
              size="small"
              sx={{
                bgcolor: "rgba(61, 215, 229, 0.12)",
                color: "#3DD7E5",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            />
          </Stack>
          <Typography variant="body2" sx={{ color: "var(--color-text-secondary)" }}>
            Nhập mô tả ý tưởng hiệu ứng bất kỳ. Gemini AI sẽ tự động sinh thuật toán ma trận Python (OpenCV/NumPy) và lưu trực tiếp vào cơ sở dữ liệu Supabase.
          </Typography>
        </Box>
      </Stack>

      {/* Input Prompt Box */}
      <Box sx={{ mb: 3 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <TextField
            fullWidth
            placeholder="Nhập mô tả hiệu ứng (VD: Ánh sáng neon phản chiếu trời mưa Tokyo, Màu phim cổ điển 1990s...)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                handleGenerate();
              }
            }}
            disabled={loading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                bgcolor: "rgba(255,255,255,0.02)",
                color: "var(--color-text-primary)",
                "& fieldset": { borderColor: "var(--color-border)" },
                "&:hover fieldset": { borderColor: "var(--color-primary)" },
              },
            }}
          />
          <Button
            variant="contained"
            disabled={loading}
            onClick={handleGenerate}
            startIcon={loading ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : <SparklesIcon />}
            sx={{
              px: 3.5,
              py: { xs: 1.5, sm: "auto" },
              borderRadius: "14px",
              bgcolor: "var(--color-primary, #5B6BFF)",
              fontWeight: 700,
              textTransform: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 20px rgba(91, 107, 255, 0.35)",
            }}
          >
            {loading ? "Gemini Đang Tạo..." : "Tự Động Tạo Hiệu Ứng"}
          </Button>
        </Stack>

        {/* Inspiration Prompt Chips */}
        <Stack direction="row" spacing={1} sx={{ mt: 1.5, overflowX: "auto", pb: 0.5 }}>
          <Typography variant="caption" sx={{ color: "var(--color-text-secondary)", my: "auto", whiteSpace: "nowrap" }}>
            Gợi ý:
          </Typography>
          {INSPIRATION_PROMPTS.map((p, idx) => (
            <Chip
              key={idx}
              label={p}
              size="small"
              clickable
              onClick={() => setPrompt(p)}
              sx={{
                fontSize: "0.75rem",
                borderRadius: "8px",
                borderColor: "var(--color-border)",
                bgcolor: "transparent",
                color: "var(--color-text-secondary)",
                "&:hover": { borderColor: "var(--color-primary)", color: "var(--color-text-primary)" },
              }}
              variant="outlined"
            />
          ))}
        </Stack>
      </Box>

      {/* Alerts */}
      {errorMsg && (
        <Alert severity="error" sx={{ mb: 2.5, borderRadius: "12px" }} onClose={() => setErrorMsg("")}>
          {errorMsg}
        </Alert>
      )}

      {successMsg && (
        <Alert severity="success" sx={{ mb: 2.5, borderRadius: "12px" }} onClose={() => setSuccessMsg("")}>
          {successMsg}
        </Alert>
      )}

      {/* Latest Generated Result Card */}
      {latestEffect && (
        <Box
          sx={{
            mb: 4,
            p: 3,
            borderRadius: "18px",
            bgcolor: "rgba(61, 215, 229, 0.05)",
            border: "1px solid rgba(61, 215, 229, 0.3)",
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} sx={{ mb: 2 }}>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <CheckCircleRounded sx={{ color: "#10b981", fontSize: "1.2rem" }} />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  {latestEffect.name}
                </Typography>
                <Chip label={latestEffect.category} size="small" sx={{ bgcolor: "rgba(61, 215, 229, 0.2)", color: "#3DD7E5", fontWeight: 600 }} />
              </Stack>
              <Typography variant="body2" sx={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>
                {latestEffect.description}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              {onSelectGeneratedEffect && (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<PlayArrowRounded />}
                  onClick={() => onSelectGeneratedEffect(latestEffect)}
                  sx={{
                    bgcolor: "#3DD7E5",
                    color: "#000",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "10px",
                    "&:hover": { bgcolor: "#2bc0ce" },
                  }}
                >
                  Chạy thử trên Studio
                </Button>
              )}

              <Button
                variant="outlined"
                size="small"
                startIcon={copiedCode ? <CheckCircleRounded sx={{ color: "#10b981" }} /> : <ContentCopyRounded />}
                onClick={() => handleCopyCode(latestEffect.python_code)}
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-primary)",
                }}
              >
                {copiedCode ? "Đã copy!" : "Copy Python"}
              </Button>
            </Stack>
          </Stack>

          {/* Python Code Snippet Box */}
          <Box
            component="pre"
            sx={{
              overflowX: "auto",
              m: 0,
              p: 2,
              borderRadius: "12px",
              bgcolor: "#0d1117",
              border: "1px solid #30363d",
              color: "#c9d1d9",
              fontFamily: "monospace",
              fontSize: "0.8rem",
              lineHeight: 1.5,
            }}
          >
            {latestEffect.python_code}
          </Box>
        </Box>
      )}

      {/* Community / Supabase Database Library Section */}
      <Box sx={{ mt: 3, pt: 3, borderTop: "1px solid var(--color-border)" }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <StorageRounded sx={{ color: "var(--color-primary)", fontSize: "1.1rem" }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Thư Viện Hiệu Ứng Đã Tạo Trên Supabase Database ({communityEffects.length})
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          {communityEffects.map((eff) => (
            <Card
              key={eff.id}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: "14px",
                bgcolor: "rgba(255,255,255,0.02)",
                border: "1px solid var(--color-border)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "border-color 0.2s",
                "&:hover": { borderColor: "var(--color-primary)" },
              }}
            >
              <Box sx={{ mb: 1.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    {eff.name}
                  </Typography>
                  <Chip label={eff.category} size="small" variant="outlined" sx={{ fontSize: "0.7rem", height: 20 }} />
                </Stack>
                <Typography variant="body2" sx={{ color: "var(--color-text-secondary)", fontSize: "0.775rem", lineHeight: 1.4 }}>
                  {eff.description.length > 110 ? `${eff.description.slice(0, 110)}...` : eff.description}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                <Typography variant="caption" sx={{ color: "var(--color-text-secondary)", fontSize: "0.7rem" }}>
                  Tác giả: {eff.author_name || "AI Engine"}
                </Typography>
                {onSelectGeneratedEffect && (
                  <Button
                    size="small"
                    startIcon={<PlayArrowRounded />}
                    onClick={() => onSelectGeneratedEffect(eff)}
                    sx={{
                      textTransform: "none",
                      fontSize: "0.75rem",
                      p: 0.5,
                      color: "var(--color-primary)",
                      fontWeight: 600,
                    }}
                  >
                    Thử hiệu ứng
                  </Button>
                )}
              </Stack>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
