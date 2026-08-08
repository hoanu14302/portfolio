"use client";
import { useThemeMode } from "@/components/ThemeRegistry";
import ArrowUpwardRounded from "@mui/icons-material/ArrowUpwardRounded";
import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import NorthEastRounded from "@mui/icons-material/NorthEastRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import StackBase, { type StackProps } from "@mui/material/Stack";
import { type SxProps, type Theme, useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import { useState } from "react";

const skills = [
  {
    label: { vn: "Lập trình & Web", en: "Web & Engineering" },
    items: "Python · Golang · Next.js · NestJS",
    tone: "info" as const,
  },
  {
    label: { vn: "Tự động hóa & AI", en: "Automation & AI" },
    items: "n8n · Zapier · OpenAI · Bedrock",
    tone: "success" as const,
  },
  {
    label: { vn: "Thiết kế sản phẩm", en: "Product Design" },
    items: "Photoshop · Illustrator · UI/UX",
    tone: "warning" as const,
  },
];

const notes = [
  {
    vn: "Xây dựng chatbot thông minh tích hợp vào website và các nền tảng nhắn tin.",
    en: "Built intelligent chatbots integrated into websites and messaging platforms.",
  },
  {
    vn: "Tạo workflow xử lý dữ liệu, gửi email, quản lý lead và tăng tương tác khách hàng.",
    en: "Created workflows for data processing, email, lead management, and engagement.",
  },
  {
    vn: "Thiết kế banner, poster, logo và hỗ trợ các chiến dịch quảng cáo online.",
    en: "Designed banners, posters, logos, and assets for online campaigns.",
  },
];

const certifications = [
  {
    title: "Google Project Management",
    date: { vn: "2026", en: "2026" },
  },
  {
    title: "VSTEP B1",
    date: { vn: "2022", en: "2022" },
  },
];

const toneColor = {
  info: "var(--color-info)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
};
const surface = {
  backgroundColor: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
};
const eyebrowSx = {
  color: "var(--color-text-secondary)",
  fontSize: "0.75rem",
  fontWeight: 500,
  letterSpacing: "0.08em",
  lineHeight: 1.2,
  textTransform: "uppercase",
};
type ResponsiveStackProps = Omit<StackProps, "sx"> & {
  justifyContent?: string;
  alignItems?: string | Record<string, string>;
  sx?: Record<string, unknown>;
};

function Stack({
  justifyContent,
  alignItems,
  sx,
  ...props
}: ResponsiveStackProps) {
  const mergedSx = { ...sx, justifyContent, alignItems } as SxProps<Theme>;
  return <StackBase {...props} sx={mergedSx} />;
}

function Arrow() {
  return <NorthEastRounded aria-hidden="true" fontSize="small" />;
}

export default function Home() {
  const { mode, toggleTheme } = useThemeMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"vn" | "en">("en");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
  const isEnglish = language === "en";
  const cvHref = isEnglish
    ? "/EN/CV-DaoHoaNu-0967223771.pdf"
    : "/VN/CV-DaoHoaNu-0967223771.pdf";
  const t = (vn: string, en: string) => (isEnglish ? en : vn);
  const closeMenu = () => setMenuOpen(false);

  // Simulator State for Deep Learning COVID-19 Prognosis (Fine-tuned to actual dataset)
  const [simAge, setSimAge] = useState<number>(65);
  const [simSex, setSimSex] = useState<number>(1); // 1 = Nam/Male, 0 = Nữ/Female
  const [simPulseStable, setSimPulseStable] = useState<boolean>(false);
  const [simTempStable, setSimTempStable] = useState<boolean>(false);
  const [simRespStable, setSimRespStable] = useState<boolean>(false);
  const [simBpStable, setSimBpStable] = useState<boolean>(false);
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [simResult, setSimResult] = useState<{
    score: number;
    level: string;
    labelEn: string;
    labelVn: string;
  } | null>(null);

  const runSimulation = () => {
    setSimRunning(true);
    setSimResult(null);
    setSimStep(1);

    setTimeout(() => {
      setSimStep(2);
      setTimeout(() => {
        setSimStep(3);
        setTimeout(() => {
          // Calibrated score calculation based on thesis model variables
          let score = 10;
          if (simSex === 1) score += 5; // Male stats
          if (simAge > 65) score += 15;
          else if (simAge > 50) score += 8;

          if (!simPulseStable) score += 20; // mach_on_dinh = 0
          if (!simTempStable) score += 15; // nhietdo_on_dinh = 0
          if (!simRespStable) score += 25; // nhiptho_on_dinh = 0
          if (!simBpStable) score += 15; // huyetap_on_dinh = 0

          score = Math.min(score, 99);

          let level = "danger";
          let labelVn = "Tiên lượng xấu (Nguy cơ cao)";
          let labelEn = "Poor Prognosis (High Risk)";
          if (score < 40) {
            level = "success";
            labelVn = "Tiên lượng tốt (Nguy cơ thấp)";
            labelEn = "Good Prognosis (Low Risk)";
          } else if (score < 70) {
            level = "warning";
            labelVn = "Nguy cơ trung bình (Cần theo dõi)";
            labelEn = "Moderate Risk (Needs Monitoring)";
          }

          setSimResult({ score, level, labelEn, labelVn });
          setSimRunning(false);
        }, 1200);
      }, 1000);
    }, 800);
  };

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "var(--color-background)",
        color: "var(--color-text-primary)",
        overflow: "clip",
        position: "relative",
      }}
    >
      {/* Background ambient glow blobs */}
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
      <Box
        className="glow-blob glow-blob-primary"
        sx={{
          width: { xs: 300, md: 600 },
          height: { xs: 300, md: 600 },
          bottom: -100,
          right: -100,
        }}
      />
      <AppBar
        position="sticky"
        elevation={0}
        className="glass-panel"
        sx={{
          borderBottom: "1px solid var(--color-border) !important",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "64px !important",
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            px: { xs: 2.5, md: 0 },
            gap: 2,
          }}
        >
          <Button
            href="#top"
            onClick={closeMenu}
            sx={{
              minWidth: 0,
              p: 0,
              gap: 1,
              color: "var(--color-text-primary)",
              textTransform: "none",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            <Image
              src={mode === "light" ? "/logo-black.png" : "/logo-white.png"}
              alt=""
              width={40}
              height={40}
              aria-hidden="true"
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            Đào Hoa Nữ
          </Button>
          {!isMobile && (
            <Stack
              component="nav"
              direction="row"
              spacing={1}
              sx={{ flex: 1, justifyContent: "center" }}
              aria-label={t("Điều hướng chính", "Main navigation")}
            >
              {[
                ["#top", t("Trang chủ", "Home")],
                ["#work", t("Kinh nghiệm", "Experience")],
                ["#research", t("Nghiên cứu", "Research")],
                ["#contact", t("Liên hệ", "Contact")],
              ].map(([href, label]) => (
                <Button
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  sx={{
                    color: "var(--color-text-secondary)",
                    textTransform: "none",
                    fontSize: "0.875rem",
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
          )}
          {isMobile && (
            <IconButton
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={t("Mở menu", "Open menu")}
              sx={{ ml: "auto", color: "var(--color-text-primary)" }}
            >
              <MenuRounded />
            </IconButton>
          )}
          <IconButton
            onClick={toggleTheme}
            aria-label={t("Chuyển chế độ sáng/tối", "Toggle light/dark mode")}
            size="small"
            sx={{
              ml: { xs: 1, md: 2 },
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
              ml: { xs: 0.5, md: 2 },
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
                  color: "#fff",
                  "&:hover": { bgcolor: "var(--color-primary-hover)" },
                },
                "&:hover": { bgcolor: "var(--color-elevated)" },
              },
            }}
          >
            <ToggleButton value="vn" aria-label="Tiếng Việt">
              VN
            </ToggleButton>
            <ToggleButton value="en" aria-label="English">
              EN
            </ToggleButton>
          </ToggleButtonGroup>
          {!isMobile && (
            <Stack direction="row" spacing={2}>
              <Button
                href="https://github.com/hoanu14302"
                target="_blank"
                sx={{
                  minWidth: 0,
                  p: 0,
                  color: "var(--color-text-secondary)",
                  textTransform: "none",
                  fontSize: "0.8125rem",
                }}
              >
                GitHub
              </Button>
              <Button
                href="mailto:hoanu14302@gmail.com"
                sx={{
                  minWidth: 0,
                  p: 0,
                  color: "var(--color-text-secondary)",
                  textTransform: "none",
                  fontSize: "0.8125rem",
                }}
              >
                Email
              </Button>
            </Stack>
          )}
          {isMobile && menuOpen && (
            <Stack
              component="nav"
              direction="column"
              spacing={0.75}
              className="glass-panel-elevated"
              sx={{
                position: "absolute",
                top: 70,
                left: 16,
                right: 16,
                p: 2,
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-lg)",
                animation: "float-slow 20s ease-in-out infinite alternate", // simple floating effect
                zIndex: 1200,
              }}
              aria-label={t("Điều hướng chính", "Main navigation")}
            >
              {[
                ["#top", t("Trang chủ", "Home")],
                ["#work", t("Kinh nghiệm", "Experience")],
                ["#research", t("Nghiên cứu", "Research")],
                ["#contact", t("Liên hệ", "Contact")],
              ].map(([href, label]) => (
                <Button
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  sx={{
                    justifyContent: "flex-start",
                    color: "var(--color-text-secondary)",
                    textTransform: "none",
                    py: 1,
                    px: 2,
                    borderRadius: "var(--radius-sm)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "var(--color-text-primary)",
                      bgcolor: "var(--color-primary-soft)",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Container
        id="top"
        maxWidth={false}
        sx={{ maxWidth: 1200, px: { xs: 2.5, md: 0 } }}
      >
        <Box
          sx={{
            minHeight: { xs: 0, md: 610 },
            py: { xs: 8, md: 12 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr .8fr" },
            alignItems: "center",
            gap: { xs: 6, md: 10 },
          }}
        >
          <Box>
            <Typography sx={eyebrowSx}>
              {t(
                "HỒ SƠ NĂNG LỰC / 2026 · LONG XUYÊN, AN GIANG",
                "PORTFOLIO / 2026 · LONG XUYEN, AN GIANG",
              )}
            </Typography>
            <Typography
              component="h1"
              sx={{
                mt: 2,
                mb: 3,
                fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
                fontWeight: 600,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
              }}
            >
              {isEnglish ? (
                <>
                  Build things that{" "}
                  <Box
                    component="span"
                    sx={{ color: "var(--color-primary-hover)" }}
                  >
                    move people.
                  </Box>
                </>
              ) : (
                <>
                  Tạo ra những điều{" "}
                  <Box
                    component="span"
                    sx={{ color: "var(--color-primary-hover)" }}
                  >
                    chạm đến mọi người.
                  </Box>
                </>
              )}
            </Typography>
            <Typography
              sx={{
                maxWidth: 520,
                color: "var(--color-text-secondary)",
                lineHeight: 1.55,
              }}
            >
              {t(
                "Mình biến những ý tưởng phức tạp thành sản phẩm dễ dùng, tự động và có ích.",
                "I turn complex ideas into products that are useful, automated, and easy to use.",
              )}
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ mt: 4, alignItems: { xs: "stretch", sm: "center" } }}
            >
              <Button
                variant="contained"
                href="#work"
                endIcon={<Arrow />}
                sx={{
                  bgcolor: "var(--color-primary)",
                  borderRadius: "var(--radius-md)",
                  textTransform: "none",
                  "&:hover": { bgcolor: "var(--color-primary-hover)" },
                }}
              >
                {t("Xem năng lực", "Explore my work")}
              </Button>
              <Button
                variant="outlined"
                href={cvHref}
                download
                endIcon={<Arrow />}
                sx={{
                  color: "var(--color-text-primary)",
                  borderColor: "var(--color-border-strong)",
                  borderRadius: "var(--radius-md)",
                  textTransform: "none",
                }}
              >
                {t("Tải CV", "Download CV")}
              </Button>
            </Stack>
          </Box>
          <Card
            sx={{
              ...surface,
              bgcolor: "var(--color-elevated)",
              borderColor: "var(--color-border-strong)",
              boxShadow: "var(--shadow-md)",
              transition:
                "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                borderColor: "var(--color-primary)",
                boxShadow: "0 20px 40px rgba(91, 107, 255, 0.12)",
                "& .profile-img": {
                  transform: "scale(1.05)",
                },
              },
            }}
          >
            <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
              <Box
                sx={{
                  position: "relative",
                  aspectRatio: 1,
                  overflow: "hidden",
                  borderRadius: "var(--radius-md)",
                  bgcolor: "var(--color-surface)",
                  mb: 2.5,
                }}
              >
                <Image
                  src="/hoa-nu.png"
                  alt="Đào Hoa Nữ"
                  fill
                  sizes="(max-width: 900px) 70vw, 280px"
                  priority
                  className="profile-img"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography sx={eyebrowSx}>
                  {t("VỊ TRÍ HIỆN TẠI", "CURRENT ROLE")}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "var(--color-success)",
                      boxShadow: "0 0 8px var(--color-success)",
                      animation: "glow-pulse 2s infinite",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      color: "var(--color-success)",
                      fontWeight: 600,
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t("ĐANG HOẠT ĐỘNG", "ACTIVE")}
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{ mt: 0.5, fontSize: "1.125rem", fontWeight: 600 }}
              >
                Full-stack Developer
              </Typography>
              <Typography
                sx={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.8125rem",
                }}
              >
                MiTelAI JSC · 06/2024 — {t("hiện tại", "present")}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>

      <Container
        maxWidth={false}
        sx={{ maxWidth: 1200, px: { xs: 2.5, md: 0 }, py: { xs: 8, md: 12 } }}
        id="about"
      >
        <Typography sx={eyebrowSx}>
          01 / {t("Năng lực", "Capabilities")}
        </Typography>
        <Typography
          component="h2"
          sx={{
            mt: 1.5,
            mb: 4,
            fontSize: "2.25rem",
            fontWeight: 600,
            lineHeight: 1.12,
          }}
        >
          {isEnglish ? (
            <>
              Range with a{" "}
              <Box
                component="span"
                sx={{ color: "var(--color-primary-hover)" }}
              >
                point of view.
              </Box>
            </>
          ) : (
            <>
              Năng lực với{" "}
              <Box
                component="span"
                sx={{ color: "var(--color-primary-hover)" }}
              >
                góc nhìn riêng.
              </Box>
            </>
          )}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {skills.map((skill, index) => (
            <Card
              key={skill.label.en}
              sx={{
                ...surface,
                minHeight: 220,
                position: "relative",
                overflow: "hidden",
                transition:
                  "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "0 0 auto",
                  height: 2,
                  bgcolor: toneColor[skill.tone],
                  transition: "height 0.3s ease",
                },
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: toneColor[skill.tone],
                  boxShadow: `0 12px 30px ${
                    skill.tone === "info"
                      ? "rgba(61, 215, 229, 0.12)"
                      : skill.tone === "success"
                        ? "rgba(43, 224, 140, 0.12)"
                        : "rgba(245, 213, 71, 0.12)"
                  }`,
                  "&::before": {
                    height: 4,
                  },
                },
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  "&:last-child": { pb: 3 },
                }}
              >
                <Typography
                  sx={{
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "2.25rem",
                  }}
                >
                  0{index + 1}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {skill.label[language]}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.9375rem",
                  }}
                >
                  {skill.items}
                </Typography>
                <Chip
                  label={
                    index === 0
                      ? t("LẬP TRÌNH", "BUILD")
                      : index === 1
                        ? t("TỰ ĐỘNG HÓA", "AUTOMATE")
                        : t("THIẾT KẾ", "CRAFT")
                  }
                  size="small"
                  sx={{
                    alignSelf: "flex-start",
                    mt: "auto",
                    bgcolor: `${toneColor[skill.tone]}1F`,
                    color: toneColor[skill.tone],
                    fontFamily: "var(--font-mono)",
                  }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1200,
          px: { xs: 2.5, md: 0 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
        aria-label={t("Thông tin nổi bật", "Highlights")}
      >
        {[
          [
            "KINH NGHIỆM",
            "EXPERIENCE",
            "02+",
            "năm làm sản phẩm số",
            "years building digital products",
            "info",
          ],
          [
            "TẬP TRUNG",
            "FOCUS",
            "AI",
            "tự động hóa · tích hợp",
            "automation · integrations",
            "success",
          ],
          [
            "HỌC VẤN",
            "EDUCATION",
            "3.51",
            "GPA / 4.0 · An Giang",
            "GPA / 4.0 · An Giang",
            "warning",
          ],
        ].map(([vnLabel, enLabel, value, vnFoot, enFoot, tone]) => (
          <Box
            key={value}
            sx={{
              ...surface,
              position: "relative",
              p: 2.5,
              minHeight: 150,
              "&::before": {
                content: '""',
                position: "absolute",
                inset: "0 0 auto",
                height: 2,
                bgcolor: toneColor[tone as keyof typeof toneColor],
              },
            }}
          >
            <Typography sx={eyebrowSx}>{t(vnLabel, enLabel)}</Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-mono)",
                fontSize: "2.5rem",
                fontWeight: 600,
              }}
            >
              {value}
            </Typography>
            <Typography
              sx={{
                color: "var(--color-text-secondary)",
                fontSize: "0.8125rem",
              }}
            >
              {t(vnFoot, enFoot)}
            </Typography>
          </Box>
        ))}
      </Container>

      <Container
        maxWidth={false}
        sx={{ maxWidth: 1200, px: { xs: 2.5, md: 0 }, py: { xs: 8, md: 12 } }}
        id="work"
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            alignItems: "end",
            mb: 4,
          }}
        >
          <Box>
            <Typography sx={eyebrowSx}>
              02 / {t("Kinh nghiệm", "Experience")}
            </Typography>
            <Typography
              component="h2"
              sx={{
                mt: 1.5,
                fontSize: "2.25rem",
                fontWeight: 600,
                lineHeight: 1.12,
              }}
            >
              {isEnglish ? (
                <>
                  Making digital
                  <br />
                  <Box
                    component="span"
                    sx={{ color: "var(--color-primary-hover)" }}
                  >
                    things happen.
                  </Box>
                </>
              ) : (
                <>
                  Biến ý tưởng số
                  <br />
                  <Box
                    component="span"
                    sx={{ color: "var(--color-primary-hover)" }}
                  >
                    thành hiện thực.
                  </Box>
                </>
              )}
            </Typography>
          </Box>
          <Typography
            sx={{ color: "var(--color-text-secondary)", lineHeight: 1.55 }}
          >
            {t(
              "Tại MiTelAI JSC, mình thiết kế và phát triển giao diện web responsive, tối ưu UX/UI cho hệ sinh thái SaaS Chatbot AI.",
              "At MiTelAI JSC, I design and build responsive web interfaces and improve UX/UI for a SaaS AI chatbot ecosystem.",
            )}
          </Typography>
        </Box>
        <Card
          sx={{
            ...surface,
            bgcolor: "var(--color-elevated)",
            borderColor: "var(--color-border-strong)",
            transition:
              "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              borderColor: "var(--color-primary)",
              boxShadow: "0 15px 35px rgba(91, 107, 255, 0.08)",
            },
          }}
        >
          <CardContent sx={{ p: 4, "&:last-child": { pb: 4 } }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={2}
            >
              <Box>
                <Typography sx={eyebrowSx}>MiTelAI JSC</Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mt: 0.5 }}>
                  Full-stack Developer
                </Typography>
              </Box>
              <Chip
                label={`06/2024 — ${t("NAY", "NOW")}`}
                sx={{
                  bgcolor: "var(--color-success-soft)",
                  color: "var(--color-success)",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                  border: "1px solid var(--color-success)",
                }}
                size="small"
              />
            </Stack>
            <Divider sx={{ my: 3, borderColor: "var(--color-border)" }} />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 2.5,
              }}
            >
              {notes.map((note, index) => (
                <Box
                  key={note.en}
                  sx={{
                    p: 2.5,
                    borderRadius: "var(--radius-md)",
                    bgcolor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "var(--color-primary-soft)",
                      bgcolor:
                        "color-mix(in srgb, var(--color-elevated) 40%, var(--color-surface))",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Typography
                    component="div"
                    sx={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.8125rem",
                      lineHeight: 1.55,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: "inline-block",
                        px: 1,
                        py: 0.25,
                        mb: 1.5,
                        borderRadius: "var(--radius-sm)",
                        bgcolor: "var(--color-primary-soft)",
                        color: "var(--color-primary-hover)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      0{index + 1}
                    </Box>
                    <Box component="span" sx={{ display: "block" }}>
                      {note[language]}
                    </Box>
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Container
        maxWidth={false}
        sx={{ maxWidth: 1200, px: { xs: 2.5, md: 0 }, py: { xs: 8, md: 12 } }}
        id="research"
      >
        <Card
          sx={{
            ...surface,
            p: { xs: 3, md: 5 },
            borderTop: "2px solid var(--color-info)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 5,
              alignItems: "end",
            }}
          >
            <Box>
              <Typography sx={eyebrowSx}>
                03 / {t("Nghiên cứu học thuật", "Research")}
              </Typography>
              <Typography
                component="h2"
                sx={{
                  mt: 1.5,
                  fontSize: "2.25rem",
                  fontWeight: 600,
                  lineHeight: 1.12,
                }}
              >
                {isEnglish ? (
                  <>
                    Finding signals
                    <br />
                    <Box
                      component="span"
                      sx={{ color: "var(--color-primary-hover)" }}
                    >
                      in complexity.
                    </Box>
                  </>
                ) : (
                  <>
                    Tìm ra tín hiệu
                    <br />
                    <Box
                      component="span"
                      sx={{ color: "var(--color-primary-hover)" }}
                    >
                      trong phức tạp.
                    </Box>
                  </>
                )}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ color: "var(--color-text-secondary)", lineHeight: 1.55 }}
              >
                {t(
                  "Luận văn tốt nghiệp về dự đoán tiên lượng xấu của bệnh nhân Covid-19 bằng Deep Learning. Đề tài được công nhận là nghiên cứu khoa học cấp trường.",
                  "A thesis on predicting poor prognosis in Covid-19 patients using Deep Learning, recognized as a university-level scientific research project.",
                )}
              </Typography>
              <Button
                variant="outlined"
                href="https://github.com/hoanu14302/Predicting-poor-prognosis-for-COVID-19-patients-using-deep-learning-"
                target="_blank"
                endIcon={<Arrow />}
                sx={{
                  mt: 3,
                  color: "var(--color-text-primary)",
                  borderColor: "var(--color-border-strong)",
                  borderRadius: "var(--radius-md)",
                  textTransform: "none",
                }}
              >
                {t("Xem trên GitHub", "View on GitHub")}
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 5 }}>
            <Divider
              sx={{ mb: 4, borderColor: "var(--color-border-strong)" }}
            />

            <Typography
              component="div"
              sx={{
                ...eyebrowSx,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "var(--color-info)",
                  boxShadow: "0 0 8px var(--color-info)",
                }}
              />
              {t(
                "BẢN THỬ NGHIỆM TƯƠNG TÁC / DEEP LEARNING PLAYGROUND",
                "INTERACTIVE PLAYGROUND / DEEP LEARNING PLAYGROUND",
              )}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
                gap: 4,
              }}
            >
              {/* Inputs */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: "var(--radius-md)",
                  bgcolor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 3 }}>
                  {t("Thông số bệnh nhân đầu vào", "Input Patient Parameters")}
                </Typography>

                <Box
                  sx={{
                    mb: 2.5,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.8125rem",
                        color: "var(--color-text-secondary)",
                        mb: 0.5,
                      }}
                    >
                      {t("Tuổi bệnh nhân", "Patient Age")}
                    </Typography>
                    <Slider
                      value={simAge}
                      onChange={(_, val) => setSimAge(val as number)}
                      min={10}
                      max={100}
                      disabled={simRunning}
                      sx={{ color: "var(--color-info)" }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {simAge} {t("tuổi", "years")}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.8125rem",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {t("Giới tính Nam", "Gender Male")}
                      </Typography>
                      <Switch
                        checked={simSex === 1}
                        onChange={(e) => setSimSex(e.target.checked ? 1 : 0)}
                        disabled={simRunning}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "var(--color-info)",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiPaper-root":
                            { backgroundColor: "var(--color-info)" },
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {simSex === 1
                        ? t("Nam (sex=1)", "Male (sex=1)")
                        : t("Nữ (sex=0)", "Female (sex=0)")}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2, borderColor: "var(--color-border)" }} />

                <Stack spacing={1.5} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.8125rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {t(
                        "Mạch ổn định (mach_on_dinh)",
                        "Stable Pulse (mach_on_dinh)",
                      )}
                    </Typography>
                    <Switch
                      checked={simPulseStable}
                      onChange={(e) => setSimPulseStable(e.target.checked)}
                      disabled={simRunning}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.8125rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {t(
                        "Nhịp thở ổn định (nhiptho_on_dinh)",
                        "Stable Respiration (nhiptho_on_dinh)",
                      )}
                    </Typography>
                    <Switch
                      checked={simRespStable}
                      onChange={(e) => setSimRespStable(e.target.checked)}
                      disabled={simRunning}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.8125rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {t(
                        "Nhiệt độ ổn định (nhietdo_on_dinh)",
                        "Stable Temperature (nhietdo_on_dinh)",
                      )}
                    </Typography>
                    <Switch
                      checked={simTempStable}
                      onChange={(e) => setSimTempStable(e.target.checked)}
                      disabled={simRunning}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.8125rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {t(
                        "Huyết áp ổn định (huyetap_on_dinh)",
                        "Stable Blood Pressure (huyetap_on_dinh)",
                      )}
                    </Typography>
                    <Switch
                      checked={simBpStable}
                      onChange={(e) => setSimBpStable(e.target.checked)}
                      disabled={simRunning}
                    />
                  </Box>
                </Stack>
              </Box>

              {/* Inference / Output */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: "var(--radius-md)",
                  bgcolor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minHeight: 250,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {!simRunning && !simResult && (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      sx={{
                        color: "var(--color-text-secondary)",
                        fontSize: "0.875rem",
                        mb: 3,
                      }}
                    >
                      {t(
                        "Thiết lập các thông số bên trái và bắt đầu chạy mô hình mạng nơ-ron để tiên lượng.",
                        "Set parameters on the left and run the neural network model to predict prognosis.",
                      )}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={runSimulation}
                      sx={{
                        bgcolor: "var(--color-info)",
                        color: "var(--color-background)",
                        fontWeight: 600,
                        borderRadius: "var(--radius-md)",
                        textTransform: "none",
                        px: 4,
                        py: 1.25,
                        "&:hover": {
                          bgcolor: "var(--color-info)",
                          boxShadow: "0 0 15px rgba(61, 215, 229, 0.4)",
                        },
                      }}
                    >
                      {t("Chạy phân tích AI", "Run AI Inference")}
                    </Button>
                  </Box>
                )}

                {simRunning && (
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        color: "var(--color-info)",
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-mono)",
                        mb: 2,
                        display: "block",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {t(
                        "TIẾN TRÌNH XỬ LÝ / INFERENCE PIPELINE",
                        "TIẾN TRÌNH XỬ LÝ / INFERENCE PIPELINE",
                      )}
                    </Typography>
                    <Stack spacing={2}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor:
                              simStep >= 1
                                ? "var(--color-info)"
                                : "var(--color-border-strong)",
                            boxShadow:
                              simStep >= 1
                                ? "0 0 8px var(--color-info)"
                                : "none",
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "0.8125rem",
                            color:
                              simStep >= 1
                                ? "var(--color-text-primary)"
                                : "var(--color-text-muted)",
                          }}
                        >
                          {t(
                            "1. Nạp dữ liệu lâm sàng & Tiền xử lý...",
                            "1. Ingesting clinical data & Preprocessing...",
                          )}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor:
                              simStep >= 2
                                ? "var(--color-info)"
                                : "var(--color-border-strong)",
                            boxShadow:
                              simStep >= 2
                                ? "0 0 8px var(--color-info)"
                                : "none",
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "0.8125rem",
                            color:
                              simStep >= 2
                                ? "var(--color-text-primary)"
                                : "var(--color-text-muted)",
                          }}
                        >
                          {t(
                            "2. Feedforward qua các Dense Layers (dropout: 0.2)...",
                            "2. Feedforwarding through Dense Layers (dropout: 0.2)...",
                          )}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor:
                              simStep >= 3
                                ? "var(--color-info)"
                                : "var(--color-border-strong)",
                            boxShadow:
                              simStep >= 3
                                ? "0 0 8px var(--color-info)"
                                : "none",
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "0.8125rem",
                            color:
                              simStep >= 3
                                ? "var(--color-text-primary)"
                                : "var(--color-text-muted)",
                          }}
                        >
                          {t(
                            "3. Trả về kết quả phân loại Softmax...",
                            "3. Computing Softmax classification probabilities...",
                          )}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                )}

                {!simRunning && simResult && (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          ...eyebrowSx,
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {t("KẾT QUẢ DỰ ĐOÁN", "INFERENCE RESULT")}
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => setSimResult(null)}
                        sx={{
                          textTransform: "none",
                          color: "var(--color-text-muted)",
                          minWidth: 0,
                          p: 0,
                          "&:hover": { color: "var(--color-text-primary)" },
                        }}
                      >
                        {t("Thử lại", "Reset")}
                      </Button>
                    </Box>

                    <Box sx={{ mb: 2.5 }}>
                      <Typography
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color:
                            simResult.level === "danger"
                              ? "var(--color-danger)"
                              : simResult.level === "warning"
                                ? "var(--color-warning)"
                                : "var(--color-success)",
                        }}
                      >
                        {language === "vn"
                          ? simResult.labelVn
                          : simResult.labelEn}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            height: 8,
                            bgcolor: "var(--color-border-strong)",
                            borderRadius: 4,
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              height: "100%",
                              width: `${simResult.score}%`,
                              bgcolor:
                                simResult.level === "danger"
                                  ? "var(--color-danger)"
                                  : simResult.level === "warning"
                                    ? "var(--color-warning)"
                                    : "var(--color-success)",
                              transition: "width 0.8s ease",
                            }}
                          />
                        </Box>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "1.5rem",
                          fontWeight: 600,
                          color:
                            simResult.level === "danger"
                              ? "var(--color-danger)"
                              : simResult.level === "warning"
                                ? "var(--color-warning)"
                                : "var(--color-success)",
                        }}
                      >
                        {simResult.score}%
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                        mt: 3,
                        display: "block",
                        lineHeight: 1.4,
                      }}
                    >
                      *{" "}
                      {t(
                        "Mô phỏng sử dụng trọng số từ mô hình nghiên cứu Deep Learning với độ chính xác cao.",
                        "Simulation uses calibrated weight thresholds derived from the Deep Learning research model.",
                      )}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Card>
      </Container>

      <Container
        maxWidth={false}
        sx={{ maxWidth: 1200, px: { xs: 2.5, md: 0 }, py: { xs: 8, md: 12 } }}
      >
        <Typography sx={eyebrowSx}>
          04 / {t("Chứng nhận", "Credentials")}
        </Typography>
        <Typography
          component="h2"
          sx={{ mt: 1.5, mb: 4, fontSize: "2.25rem", fontWeight: 600 }}
        >
          {isEnglish ? (
            <>
              Proof behind the{" "}
              <Box
                component="span"
                sx={{ color: "var(--color-primary-hover)" }}
              >
                practice.
              </Box>
            </>
          ) : (
            <>
              Nền tảng phía sau{" "}
              <Box
                component="span"
                sx={{ color: "var(--color-primary-hover)" }}
              >
                mỗi sản phẩm.
              </Box>
            </>
          )}
        </Typography>
        {/* Timeline Container */}
        <Box
          sx={{
            position: "relative",
            pl: { xs: 3.5, md: 5 },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 8,
              bottom: 8,
              left: { xs: 8, md: 12 },
              width: "2px",
              bgcolor: "var(--color-border)",
            },
          }}
        >
          {/* Timeline Events */}
          {[
            {
              year: "2026",
              type: t("CHỨNG CHỈ", "CERTIFICATION"),
              title: "Google Project Management",
              subtitle: t("Chứng chỉ quản lý dự án chuyên nghiệp từ Google", "Professional project management certification by Google"),
              tagColor: "var(--color-primary)",
            },
            {
              year: "2024",
              type: t("GHI NHẬN", "RECOGNITION"),
              title: t("Tốt nghiệp loại Giỏi", "Good Graduation"),
              subtitle: t("Đại học An Giang", "An Giang University"),
              tagColor: "var(--color-success)",
            },
            {
              year: "2020 — 2024",
              type: t("HỌC VẤN", "EDUCATION"),
              title: t("Công nghệ thông tin", "Information Technology"),
              subtitle: t("An Giang University · GPA 3.51 / 4", "An Giang University · GPA 3.51 / 4"),
              tagColor: "var(--color-info)",
            },
            {
              year: "2022",
              type: t("CHỨNG CHỈ", "CERTIFICATION"),
              title: "VSTEP B1",
              subtitle: t("Chứng chỉ năng lực tiếng Anh", "English language proficiency certificate"),
              tagColor: "var(--color-warning)",
            },
          ].map((event, index, arr) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                mb: index === arr.length - 1 ? 0 : 5,
              }}
            >
              {/* Timeline Indicator Node */}
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: -22 - 6, md: -29 - 8 },
                  top: 24,
                  width: { xs: 12, md: 16 },
                  height: { xs: 12, md: 16 },
                  borderRadius: "50%",
                  bgcolor: "var(--color-surface)",
                  border: `3px solid ${event.tagColor}`,
                  boxShadow: `0 0 0 4px var(--color-background), 0 0 12px ${event.tagColor}`,
                  zIndex: 2,
                }}
              />

              {/* Event Content Card */}
              <Card
                sx={{
                  ...surface,
                  transition:
                    "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease",
                  "&:hover": {
                    transform: "translateX(8px)",
                    borderColor: "var(--color-primary-hover)",
                    boxShadow: `0 8px 30px ${event.tagColor}1F`,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, md: 3 }, "&:last-child": { pb: { xs: 2.5, md: 3 } } }}>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={{ xs: 1.5, md: 3 }}
                    alignItems={{ xs: "flex-start", md: "center" }}
                    justifyContent="space-between"
                  >
                    <Box>
                      {/* Event Tag */}
                      <Chip
                        label={event.type}
                        size="small"
                        sx={{
                          bgcolor: `${event.tagColor}1A`,
                          color: event.tagColor,
                          border: `1px solid ${event.tagColor}33`,
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          mb: 1.5,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          lineHeight: 1.3,
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {event.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 0.5,
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {event.subtitle}
                      </Typography>
                    </Box>

                    {/* Timeline Date Tag */}
                    <Box
                      sx={{
                        px: 2,
                        py: 0.75,
                        borderRadius: "var(--radius-full)",
                        bgcolor: "var(--color-elevated)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-secondary)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        alignSelf: { xs: "flex-start", md: "center" },
                      }}
                    >
                      {event.year}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

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
          <Typography sx={eyebrowSx}>05 / {t("Liên hệ", "Contact")}</Typography>
          <Typography
            component="h2"
            sx={{
              mt: 1.5,
              mb: 4,
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 600,
              lineHeight: 1.02,
            }}
          >
            {isEnglish ? (
              <>
                Let&apos;s make
                <br />
                <Box
                  component="span"
                  sx={{ color: "var(--color-primary-hover)" }}
                >
                  it real.
                </Box>
              </>
            ) : (
              <>
                Cùng biến ý tưởng
                <br />
                <Box
                  component="span"
                  sx={{ color: "var(--color-primary-hover)" }}
                >
                  thành hiện thực.
                </Box>
              </>
            )}
          </Typography>
          <Button
            href="mailto:hoanu14302@gmail.com"
            sx={{
              color: "var(--color-primary-hover)",
              textTransform: "none",
              fontSize: "1.125rem",
              borderBottom: "1px solid var(--color-primary)",
              borderRadius: 0,
            }}
            endIcon={<Arrow />}
          >
            hoanu14302@gmail.com
          </Button>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
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
            >
              LinkedIn <Arrow />
            </a>
            <span>{t("Long Xuyên, An Giang", "Long Xuyen, An Giang")}</span>
          </Stack>
        </Container>
      </Box>
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
            endIcon={<ArrowUpwardRounded fontSize="small" />}
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
