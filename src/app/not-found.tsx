import HomeRounded from "@mui/icons-material/HomeRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function NotFound() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        bgcolor: "var(--color-background)",
        color: "var(--color-text-primary)",
        px: 2.5,
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            p: { xs: 3, sm: 5 },
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            bgcolor: "var(--color-surface)",
            textAlign: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: "0 0 auto",
              height: 2,
              bgcolor: "var(--color-primary)",
            },
          }}
        >
          <Typography
            component="p"
            sx={{
              color: "var(--color-primary-hover)",
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(4rem, 18vw, 8rem)",
              fontWeight: 600,
              letterSpacing: "-0.06em",
              lineHeight: 0.9,
            }}
          >
            404
          </Typography>
          <Typography
            component="h1"
            sx={{
              mt: 3,
              fontSize: { xs: "1.5rem", sm: "2rem" },
              fontWeight: 600,
              lineHeight: 1.15,
            }}
          >
            This page could not be found
          </Typography>
          <Typography
            sx={{
              mt: 1.5,
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
          </Typography>
          <Box
            sx={{ mt: 4 }}
          >
            <Button
              href="/"
              variant="contained"
              startIcon={<HomeRounded />}
              sx={{
                bgcolor: "var(--color-primary)",
                borderRadius: "var(--radius-md)",
                textTransform: "none",
                "&:hover": { bgcolor: "var(--color-primary-hover)" },
              }}
            >
              Về trang chủ
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
