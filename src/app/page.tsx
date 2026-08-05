"use client";

import ArrowUpwardRounded from "@mui/icons-material/ArrowUpwardRounded";
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
import StackBase, { type StackProps } from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { type SxProps, type Theme, useTheme } from "@mui/material/styles";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"vn" | "en">("vn");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
  const isEnglish = language === "en";
  const cvHref = isEnglish
    ? "/EN/CV-DaoHoaNu-0967223771.pdf"
    : "/VN/CV-DaoHoaNu-0967223771.pdf";
  const t = (vn: string, en: string) => (isEnglish ? en : vn);
  const closeMenu = () => setMenuOpen(false);

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "var(--color-background)",
        color: "var(--color-text-primary)",
        overflow: "clip",
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor:
            "color-mix(in srgb, var(--color-background) 92%, transparent)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-border)",
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
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                width: 28,
                height: 28,
                borderRadius: "var(--radius-sm)",
                bgcolor: "var(--color-primary)",
                color: "#fff",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
              }}
            >
              ĐN
            </Box>
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
              spacing={0.5}
              sx={{
                position: "absolute",
                top: 64,
                left: 16,
                right: 16,
                p: 1,
                bgcolor: "var(--color-elevated)",
                border: "1px solid var(--color-border-strong)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-md)",
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
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Typography sx={eyebrowSx}>
                {t("VỊ TRÍ HIỆN TẠI", "CURRENT ROLE")}
              </Typography>
              <Typography sx={{ mt: 1, fontSize: "1.125rem", fontWeight: 600 }}>
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
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "0 0 auto",
                  height: 2,
                  bgcolor: toneColor[skill.tone],
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
          }}
        >
          <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={2}
            >
              <Box>
                <Typography sx={eyebrowSx}>MiTelAI JSC</Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Full-stack Developer
                </Typography>
              </Box>
              <Chip
                label={`06/2024 — ${t("NAY", "NOW")}`}
                color="success"
                size="small"
              />
            </Stack>
            <Divider sx={{ my: 3, borderColor: "var(--color-border)" }} />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 3,
              }}
            >
              {notes.map((note, index) => (
                <Typography
                  key={note.en}
                  sx={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.8125rem",
                    lineHeight: 1.55,
                  }}
                >
                  <Box
                    component="b"
                    sx={{
                      display: "block",
                      mb: 1,
                      color: "var(--color-primary-hover)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    0{index + 1}
                  </Box>
                  {note[language]}
                </Typography>
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {[
            [
              t("CHỨNG CHỈ", "CERTIFICATION"),
              "Google Project Management",
              "2026 · VSTEP B1 · 2022",
            ],
            [
              t("GHI NHẬN", "RECOGNITION"),
              t("Tốt nghiệp loại Giỏi", "Good Graduation"),
              t("Đại học An Giang · 2024", "An Giang University · 2024"),
            ],
            [
              t("HỌC VẤN", "EDUCATION"),
              t("Công nghệ thông tin", "Information Technology"),
              "An Giang University · 2020 — 2024 · GPA 3.51 / 4",
            ],
          ].map(([label, title, body]) => (
            <Card key={title} sx={{ ...surface, minHeight: 190 }}>
              <CardContent
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:last-child": { pb: 3 },
                }}
              >
                <Typography sx={eyebrowSx}>{label}</Typography>
                <Typography
                  variant="h6"
                  sx={{ mt: "auto", mb: 1, fontWeight: 600 }}
                >
                  {title}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.8125rem",
                  }}
                >
                  {body}
                </Typography>
              </CardContent>
            </Card>
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
