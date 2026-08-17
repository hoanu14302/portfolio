import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import CollectionsBookmarkRounded from "@mui/icons-material/CollectionsBookmarkRounded";
import DataObjectRounded from "@mui/icons-material/DataObjectRounded";
import FlareRounded from "@mui/icons-material/FlareRounded";
import LanguageRounded from "@mui/icons-material/LanguageRounded";
import LaunchRounded from "@mui/icons-material/LaunchRounded";
import PaletteRounded from "@mui/icons-material/PaletteRounded";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import ViewQuiltRounded from "@mui/icons-material/ViewQuiltRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export type GalleryCategory = "all" | "website" | "poster" | "brochure";

export interface GalleryItem {
  id: string;
  category: "website" | "poster" | "brochure";
  title: { vn: string; en: string };
  subtitle: { vn: string; en: string };
  description: { vn: string; en: string };
  tags: string[];
  tools: string[];
  aspectRatio: string;
  gradient: string;
  accentColor: string;
  badge: { vn: string; en: string };
  year: string;
  client: { vn: string; en: string };
  link?: string;
  previewDetails: {
    role: { vn: string; en: string };
    challenge?: { vn: string; en: string };
    solution?: { vn: string; en: string };
    deliverables: { vn: string[]; en: string[] };
    highlights: { vn: string; en: string };
  };
}

const galleryData: GalleryItem[] = [
  {
    id: "chemai-platform",
    category: "website",
    title: {
      vn: "HCC ChemAI — Nền Tảng Học Hóa Học Ảo",
      en: "HCC ChemAI — Virtual Chemistry Lab Platform",
    },
    subtitle: {
      vn: "Web App tương tác thí nghiệm & Trợ lý học tập AI",
      en: "Interactive Lab Web App & AI Learning Assistant",
    },
    description: {
      vn: "Thiết kế UI/UX toàn diện và xây dựng frontend mô phỏng thí nghiệm hóa học 3D trực quan cho học sinh kết hợp trợ lý AI thông minh giải đáp phản ứng thời gian thực.",
      en: "Comprehensive UI/UX design & frontend architecture for interactive 3D virtual chemistry simulations paired with a real-time AI study assistant.",
    },
    tags: ["EdTech", "Interactive UI", "AI Assistant", "Next.js"],
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Figma"],
    aspectRatio: "16/10",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
    accentColor: "#6366f1",
    badge: { vn: "WEBSITE & WEB APP", en: "WEBSITE & WEB APP" },
    year: "2025",
    client: { vn: "HCC EdTech Group", en: "HCC EdTech Group" },
    previewDetails: {
      role: {
        vn: "Lead Product Designer & Frontend Architect",
        en: "Lead Product Designer & Frontend Architect",
      },
      challenge: {
        vn: "Mô phỏng chân thực các phản ứng hóa học trực quan trên trình duyệt mà vẫn duy trì tốc độ khung hình mượt mà 60fps.",
        en: "Rendering physics-accurate chemical reactions in-browser while maintaining a smooth 60fps frame rate.",
      },
      solution: {
        vn: "Kết hợp Canvas tương tác nhẹ, micro-animations tối ưu và giao diện dark/light tương phản cao theo chuẩn giáo dục.",
        en: "Engineered lightweight interactive canvas components and high-contrast educational design tokens.",
      },
      deliverables: {
        vn: [
          "Giao diện mô phỏng dụng cụ phòng lab (ống nghiệm, đèn cồn, quỳ tím)",
          "Bảng điều khiển học tập và chat tương tác với AI hóa học thông minh",
          "Hệ thống thiết kế Dark/Light mode toàn diện",
        ],
        en: [
          "Virtual laboratory equipment simulation suite (test tubes, burners, litmus)",
          "Interactive AI chemistry tutor chat and student analytics dashboard",
          "Comprehensive dark/light design system with accessible contrast",
        ],
      },
      highlights: {
        vn: "Tạo môi trường thực hành an toàn 100%, nâng cao 40% hứng thú học tập và độ hiểu bài của học sinh.",
        en: "Offers a 100% risk-free virtual lab environment, boosting student comprehension by over 40%.",
      },
    },
  },
  {
    id: "ai-conference-poster",
    category: "poster",
    title: {
      vn: "Poster Hội Thảo Đổi Mới Sáng Tạo & AI 2025",
      en: "AI & Future Innovation Summit Key Visual",
    },
    subtitle: {
      vn: "Thiết kế đồ họa sự kiện công nghệ quy mô 1,000+ khách",
      en: "Key visual & large-format art poster for flagship tech summit",
    },
    description: {
      vn: "Poster sự kiện phong cách Futuristic Cyber-Minimalism, kết hợp Typography đậm chất kỹ thuật số cùng các mảng màu quang phổ Neon đa tầng thu hút thị giác.",
      en: "Event visual in Futuristic Cyber-Minimalism aesthetic, combining bold geometric typography with luminous layered neon gradients.",
    },
    tags: ["Visual Design", "Typography", "Cyberpunk", "Key Visual"],
    tools: ["Photoshop", "Illustrator", "Midjourney AI", "Figma"],
    aspectRatio: "3/4",
    gradient: "linear-gradient(135deg, #090d16 0%, #1e1035 50%, #3b0764 100%)",
    accentColor: "#d946ef",
    badge: { vn: "POSTER NGHỆ THUẬT", en: "ART POSTER" },
    year: "2025",
    client: { vn: "Vietnam Innovation Tech Hub", en: "Vietnam Innovation Tech Hub" },
    previewDetails: {
      role: {
        vn: "Graphic Designer & Visual Concept Artist",
        en: "Graphic Designer & Visual Concept Artist",
      },
      challenge: {
        vn: "Tạo dấu ấn nhận diện độc bản, khác biệt với các hội thảo công nghệ thông thường, truyền cảm hứng về kỷ nguyên AI.",
        en: "Creating a distinct visual identity that breaks away from generic tech event visuals to inspire AI pioneers.",
      },
      solution: {
        vn: "Xây dựng ngôn ngữ thị giác quang phổ phối ngẫu Cyber-Minimalism với typography cách điệu mạnh mẽ.",
        en: "Crafted a spectral cyberpunk aesthetic with high-impact custom typography and neon depth cues.",
      },
      deliverables: {
        vn: [
          "Key Visual chủ đạo sự kiện quy mô 1,000+ người tham dự",
          "Bộ poster in ấn khổ lớn (A0, A1, Standee) và digital banners",
          "Visual backdrop sân khấu LED động và thẻ đeo VIP",
        ],
        en: [
          "Flagship Key Visual for 1,000+ attendee tech summit",
          "Print-ready large format poster suite (A0, A1, Standee) & social ads",
          "Dynamic LED stage motion graphics backdrop and VIP badge set",
        ],
      },
      highlights: {
        vn: "Sự kết hợp giữa nghệ thuật thị giác hiện đại và định vị thương hiệu công nghệ đột phá.",
        en: "A fusion of cutting-edge visual aesthetics and tech branding that drove 2.5x higher attendee engagement.",
      },
    },
  },
  {
    id: "mitelai-enterprise-brochure",
    category: "brochure",
    title: {
      vn: "Brochure Bộ Giải Pháp AI SaaS Doanh Nghiệp",
      en: "Enterprise AI SaaS Solutions Brochure",
    },
    subtitle: {
      vn: "Ấn phẩm giới thiệu hệ sinh thái Chatbot & Tự động hóa",
      en: "Sales kit & collateral for Chatbot & Automation ecosystem",
    },
    description: {
      vn: "Tài liệu Brochure 12 trang giới thiệu các giải pháp Chatbot AI đa kênh, workflow tự động hóa n8n và tích hợp CRM cho doanh nghiệp B2B với cách trình bày infographic mạch lạc.",
      en: "12-page sales collateral presenting multi-channel AI chatbots, n8n automated workflows, and B2B CRM integration with clear infographic storytelling.",
    },
    tags: ["Print & Digital", "B2B Marketing", "Editorial Design", "Infographic"],
    tools: ["Illustrator", "Photoshop", "InDesign", "Figma"],
    aspectRatio: "4/5",
    gradient: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
    accentColor: "#10b981",
    badge: { vn: "BROCHURE DOANH NGHIỆP", en: "CORPORATE BROCHURE" },
    year: "2024",
    client: { vn: "MiTel AI Solutions", en: "MiTel AI Solutions" },
    previewDetails: {
      role: {
        vn: "Editorial & Brand Marketing Designer",
        en: "Editorial & Brand Marketing Designer",
      },
      challenge: {
        vn: "Đơn giản hóa các kiến trúc công nghệ phức tạp (API, Webhook, LLM agents) cho đối tượng giám đốc điều hành và kinh doanh.",
        en: "Demystifying deep technical architectures (APIs, Webhooks, LLM agents) for executive-level business buyers.",
      },
      solution: {
        vn: "Thiết kế infographic phân tầng kết hợp bảng so sánh ROI thực tế và hệ thống biểu tượng kỹ thuật đồng bộ.",
        en: "Designed modular infographic flows paired with concrete business ROI charts and unified technical iconography.",
      },
      deliverables: {
        vn: [
          "Cấu trúc layout gấp 3 (Tri-fold) & catalogue 12 trang chuẩn in",
          "Hệ thống sơ đồ giải pháp và biểu đồ ROI doanh nghiệp trực quan",
          "Phiên bản E-Brochure PDF tương tác gửi đối tác qua email",
        ],
        en: [
          "Tri-fold & 12-page print-ready editorial catalogue layout",
          "Intuitive solution diagrams and business ROI flowcharts",
          "Interactive digital E-Brochure PDF for executive pitches",
        ],
      },
      highlights: {
        vn: "Giúp rút ngắn chu kỳ tư vấn bán hàng B2B từ 3 tuần xuống còn 10 ngày.",
        en: "Accelerated the enterprise B2B sales pitch cycle from 3 weeks down to 10 days.",
      },
    },
  },
  {
    id: "mitelai-saas-web",
    category: "website",
    title: {
      vn: "MiTelAI — Nền Tảng Quản Trị AI Chatbot",
      en: "MiTelAI — AI Chatbot Ecosystem & Analytics",
    },
    subtitle: {
      vn: "Landing page & Dashboard quản trị hội thoại thông minh",
      en: "High-converting Landing page & intelligent analytics dashboard",
    },
    description: {
      vn: "Thiết kế và phát triển landing page tốc độ cao cùng giao diện dashboard theo dõi tương tác khách hàng theo thời gian thực, quản lý prompt AI và báo cáo phân tích trực quan.",
      en: "Designed and engineered a high-performance landing page and real-time customer conversation analytics dashboard with prompt tuning controls.",
    },
    tags: ["SaaS Platform", "Full-stack Web", "Dashboard", "Real-time AI"],
    tools: ["Next.js", "TypeScript", "MUI", "Tailwind CSS", "Node.js"],
    aspectRatio: "16/10",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    accentColor: "#38bdf8",
    badge: { vn: "WEBSITE & DASHBOARD", en: "WEBSITE & DASHBOARD" },
    year: "2024",
    client: { vn: "MiTel Enterprise", en: "MiTel Enterprise" },
    previewDetails: {
      role: {
        vn: "Full-stack Developer & UI Designer",
        en: "Full-stack Developer & UI Designer",
      },
      challenge: {
        vn: "Hiển thị hàng ngàn sự kiện tin nhắn thời gian thực mà không làm giật lag giao diện web.",
        en: "Streaming thousands of real-time chat telemetry events without degrading browser UI responsiveness.",
      },
      solution: {
        vn: "Kiến trúc component ảo hóa (virtualized list) và kết nối WebSocket tối ưu hóa state.",
        en: "Architected virtualized data grids and resilient WebSocket state pipelines.",
      },
      deliverables: {
        vn: [
          "Landing page chuyển đổi cao với các micro-animations tinh tế",
          "Giao diện Dashboard cấu hình luồng bot kéo-thả trực quan",
          "Hệ thống biểu đồ phân tích thời gian thực và log tương tác",
        ],
        en: [
          "High-conversion landing page with smooth micro-interactions",
          "Visual drag-and-drop bot conversation workflow dashboard",
          "Real-time analytics chart views and user interaction logs",
        ],
      },
      highlights: {
        vn: "Đạt chuẩn responsive mượt mà trên mọi thiết bị, tối ưu thời gian tải trang dưới 1.2s.",
        en: "Seamlessly responsive across all viewports with sub-1.2s load speeds.",
      },
    },
  },
  {
    id: "automation-workflow-poster",
    category: "poster",
    title: {
      vn: "Infographic Poster — AI Workflow Automation",
      en: "Infographic Poster — AI Workflow Automation",
    },
    subtitle: {
      vn: "Poster kỹ thuật số minh họa kiến trúc tích hợp n8n & LLM",
      en: "Digital blueprint poster detailing n8n & LLM integration pipeline",
    },
    description: {
      vn: "Poster trực quan hóa toàn bộ luồng xử lý dữ liệu từ Webhook, n8n, OpenAI/Bedrock đến lưu trữ cơ sở dữ liệu và tự động phản hồi khách hàng theo thời gian thực.",
      en: "Architectural blueprint poster illustrating end-to-end data pipeline from Webhooks, n8n orchestrator, LLM agents to database persistence.",
    },
    tags: ["Data Flow", "Infographic", "Dark Scheme", "Technical Art"],
    tools: ["Illustrator", "Photoshop", "Figma", "Mermaid.js"],
    aspectRatio: "3/4",
    gradient: "linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)",
    accentColor: "#f59e0b",
    badge: { vn: "POSTER KỸ THUẬT", en: "TECHNICAL POSTER" },
    year: "2024",
    client: { vn: "Internal Tech Academy", en: "Internal Tech Academy" },
    previewDetails: {
      role: {
        vn: "Technical Visual Designer",
        en: "Technical Visual Designer",
      },
      challenge: {
        vn: "Tạo tài liệu trực quan giúp kỹ sư mới và khách hàng nắm bắt luồng tự động hóa n8n trong 30 giây.",
        en: "Synthesizing a multi-layer n8n automation pipeline into a 30-second digestible visual diagram.",
      },
      solution: {
        vn: "Phân vùng màu sắc theo từng cụm chức năng (Ingestion, Agent Processing, Persistence, Alerting).",
        en: "Utilized functional color zoning for data ingestion, agent nodes, persistence, and dispatch.",
      },
      deliverables: {
        vn: [
          "Sơ đồ quy trình tự động hóa n8n thiết kế theo chuẩn Dark-mode thẩm mỹ",
          "Bộ Icon và Component vector đồng bộ cho toàn bộ tài liệu kỹ thuật",
          "Poster kích thước lớn phục vụ đào tạo nội bộ và trình bày dự án",
        ],
        en: [
          "Aesthetic dark-mode automation architecture blueprint",
          "Standardized vector icon set for technical documentation",
          "Large format poster for internal onboarding and tech showcases",
        ],
      },
      highlights: {
        vn: "Biến các quy trình logic phức tạp trở nên trực quan, sinh động và chuyên nghiệp.",
        en: "Turns complicated logical flows into compelling, legible visual assets.",
      },
    },
  },
  {
    id: "brand-identity-brochure-kit",
    category: "brochure",
    title: {
      vn: "Bộ Ấn Phẩm Truyền Thông & Profile Thương Hiệu",
      en: "Brand Identity Kit & Corporate Marketing Kit",
    },
    subtitle: {
      vn: "Profile công ty, brochure giới thiệu sản phẩm & marketing kit",
      en: "Company profile, product flyers, and multi-channel campaign assets",
    },
    description: {
      vn: "Bộ nhận diện toàn diện gồm Profile công ty, các mẫu Brochure quảng bá chiến dịch số và bộ banner truyền thông đa kênh được tối ưu chuẩn in ấn lẫn hiển thị số.",
      en: "A unified brand asset suite featuring corporate profile booklets, product marketing flyers, and social media ad banners tuned for digital and print.",
    },
    tags: ["Brand Identity", "Brochure Kit", "Social Ads", "Vector Art"],
    tools: ["Photoshop", "Illustrator", "InDesign", "Figma"],
    aspectRatio: "4/5",
    gradient: "linear-gradient(135deg, #1c1917 0%, #292524 50%, #44403c 100%)",
    accentColor: "#fb923c",
    badge: { vn: "BỘ ẤN PHẨM & PROFILE", en: "BRAND PROFILE & KIT" },
    year: "2024",
    client: { vn: "Nova Brand Studio", en: "Nova Brand Studio" },
    previewDetails: {
      role: {
        vn: "Creative Brand Designer",
        en: "Creative Brand Designer",
      },
      challenge: {
        vn: "Đồng bộ hóa màu sắc và chất lượng hiển thị từ hệ màu CMYK khi in ấn đến không gian màu sRGB trên màn hình OLED.",
        en: "Calibrating flawless color harmony from CMYK print collateral to high-gamut digital OLED displays.",
      },
      solution: {
        vn: "Thiết lập profile màu chuyên biệt và hệ thống typography phân cấp khoa học.",
        en: "Established custom color profiles and a mathematically tuned typographic scale.",
      },
      deliverables: {
        vn: [
          "Profile công ty chuẩn in ấn cao cấp với typography tinh tế",
          "Bộ Brochure & Tờ rơi giới thiệu chương trình ưu đãi sản phẩm",
          "Bộ kit hình ảnh chạy quảng cáo Meta, Google & LinkedIn Ads",
        ],
        en: [
          "High-end corporate profile booklet with refined typography",
          "Product brochure & promotional flyer templates",
          "Multi-channel ad creative kit for Meta, Google & LinkedIn",
        ],
      },
      highlights: {
        vn: "Đảm bảo tính đồng nhất nhận diện thương hiệu từ ấn phẩm cầm tay đến không gian mạng.",
        en: "Maintains absolute brand consistency across both tangible print and online channels.",
      },
    },
  },
  {
    id: "apertus-open-library",
    category: "website",
    title: {
      vn: "Apertus — Nền Tảng Tài Liệu Nghiên Cứu Mở",
      en: "Apertus — Open Research Document Platform",
    },
    subtitle: {
      vn: "Web App chia sẻ tri thức & Browser Companion Extension",
      en: "Knowledge sharing web app & browser companion extension",
    },
    description: {
      vn: "Hệ thống Monorepo tích hợp giao diện đọc tài liệu nghiên cứu hiện đại, bookmark thông minh cùng tiện ích mở rộng trình duyệt hỗ trợ trích xuất trích dẫn nhanh chóng.",
      en: "Monorepo ecosystem featuring a clean research reader interface, smart bookmarking, and a companion browser extension for one-click citations.",
    },
    tags: ["Monorepo", "Web & Extension", "Go API", "React"],
    tools: ["React", "TypeScript", "Tailwind CSS", "Go", "Turborepo"],
    aspectRatio: "16/10",
    gradient: "linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)",
    accentColor: "#a855f7",
    badge: { vn: "WEB & EXTENSION", en: "WEB & EXTENSION" },
    year: "2025",
    client: { vn: "Open Science Initiative", en: "Open Science Initiative" },
    previewDetails: {
      role: {
        vn: "Monorepo Architect & Full-stack Engineer",
        en: "Monorepo Architect & Full-stack Engineer",
      },
      challenge: {
        vn: "Đồng bộ tức thì dữ liệu highlight và bookmark giữa extension trình duyệt và ứng dụng web chính.",
        en: "Zero-latency synchronization of research highlights and bookmarks between Chrome extension and Web App.",
      },
      solution: {
        vn: "Xây dựng Backend Go tốc độ cao với cơ chế WebSocket pub/sub và shared React UI library.",
        en: "Engineered a high-throughput Go backend with WebSocket pub/sub and shared React UI tokens.",
      },
      deliverables: {
        vn: [
          "Giao diện đọc tài liệu khoa học tối giản, tập trung nội dung",
          "Browser Extension đồng bộ tức thì dữ liệu về ứng dụng web",
          "Design system đồng nhất giữa Web app và Extension popup",
        ],
        en: [
          "Distraction-free scientific reading experience",
          "Browser Extension with instant cloud sync to web dashboard",
          "Unified design system across web app and extension popup",
        ],
      },
      highlights: {
        vn: "Kiến trúc Monorepo hiệu năng cao, chia sẻ UI component library dùng chung.",
        en: "High-performance monorepo sharing unified design tokens and packages.",
      },
    },
  },
  {
    id: "cyber-security-poster",
    category: "poster",
    title: {
      vn: "Infographic Poster — Cyber Threat Intelligence",
      en: "Infographic Poster — Cyber Threat Intelligence",
    },
    subtitle: {
      vn: "Poster ma trận phòng thủ an ninh mạng & mô hình Zero-Trust",
      en: "Cyber defense matrix & Zero-Trust architectural infographic",
    },
    description: {
      vn: "Thiết kế poster trực quan hóa các lớp bảo mật mạng, kiến trúc Zero-Trust và ma trận phát hiện lỗ hổng cho trung tâm điều hành an ninh mạng SOC.",
      en: "Aesthetic technical infographic mapping multi-layered network defense, Zero-Trust paradigms, and threat containment topologies for SOC command centers.",
    },
    tags: ["Cybersecurity", "Zero-Trust", "Infographic Art", "Vector"],
    tools: ["Illustrator", "Photoshop", "Figma"],
    aspectRatio: "3/4",
    gradient: "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #047857 100%)",
    accentColor: "#14b8a6",
    badge: { vn: "POSTER AN NINH MẠNG", en: "SECURITY POSTER" },
    year: "2024",
    client: { vn: "Cyber Defense Hub", en: "Cyber Defense Hub" },
    previewDetails: {
      role: {
        vn: "Security Visual Architect",
        en: "Security Visual Architect",
      },
      challenge: {
        vn: "Mô tả hơn 20 vector tấn công và tầng phòng thủ trên một layout poster khổ lớn mà vẫn thoáng đãng, dễ tra cứu.",
        en: "Mapping 20+ attack vectors and defensive layers onto a single large-format sheet without clutter.",
      },
      solution: {
        vn: "Sử dụng cấu trúc radar đa trục và bảng phân loại mã màu chuẩn an ninh mạng quốc tế.",
        en: "Designed a multi-axial radar framework with standard international threat color classifications.",
      },
      deliverables: {
        vn: [
          "Poster in khổ A0 dành cho phòng trực vận hành SOC",
          "Bộ infographic định dạng số độ phân giải cao 8K",
          "Tài liệu hướng dẫn trực quan hóa chính sách an toàn thông tin",
        ],
        en: [
          "A0 high-resolution print poster for SOC control rooms",
          "8K digital infographic asset pack for executive security briefings",
          "Visual reference guidebook for enterprise security protocols",
        ],
      },
      highlights: {
        vn: "Được sử dụng làm chuẩn trực quan đào tạo nhân sự an toàn thông tin tại nhiều đơn vị.",
        en: "Adopted as a visual standard for cyber security onboarding and client defense briefings.",
      },
    },
  },
  {
    id: "fintech-executive-brochure",
    category: "brochure",
    title: {
      vn: "Brochure Giải Pháp Thanh Toán & Fintech",
      en: "NextGen Fintech Solutions Executive Brochure",
    },
    subtitle: {
      vn: "Ấn phẩm cao cấp giới thiệu cổng thanh toán & bảo mật tài chính",
      en: "Executive brochure for payment gateway & financial infrastructure",
    },
    description: {
      vn: "Thiết kế brochure cao cấp với phong cách tối giản thanh lịch, trình bày năng lực xử lý giao dịch siêu tốc và các chứng chỉ bảo mật tài chính quốc tế PCI-DSS.",
      en: "Premium executive brochure with minimalist luxury aesthetics, detailing high-throughput payment settlement and PCI-DSS financial security compliance.",
    },
    tags: ["Fintech", "Editorial", "Luxury Minimalist", "Financial Collateral"],
    tools: ["InDesign", "Illustrator", "Photoshop"],
    aspectRatio: "4/5",
    gradient: "linear-gradient(135deg, #172554 0%, #1e3a8a 50%, #2563eb 100%)",
    accentColor: "#60a5fa",
    badge: { vn: "BROCHURE TÀI CHÍNH", en: "FINTECH BROCHURE" },
    year: "2024",
    client: { vn: "FinCore Payment Services", en: "FinCore Payment Services" },
    previewDetails: {
      role: {
        vn: "Lead Editorial & Corporate Designer",
        en: "Lead Editorial & Corporate Designer",
      },
      challenge: {
        vn: "Tạo cảm giác tin cậy, vững chắc và sang trọng phù hợp với các đối tác ngân hàng và quỹ đầu tư.",
        en: "Evoking high institutional trust, solidity, and luxury for banking executives and venture investors.",
      },
      solution: {
        vn: "Ứng dụng tỷ lệ vàng trong dàn trang, tông xanh cobalt sang trọng kết hợp ép kim bạc kỹ thuật số.",
        en: "Applied golden-ratio layout grids, royal cobalt palettes, and digital silver foil accent lines.",
      },
      deliverables: {
        vn: [
          "Brochure khổ ngang cao cấp 16 trang chuẩn in bìa cứng ép nhũ",
          "Bản PDF tương tác với mục lục động và liên kết tra cứu",
          "Slide deck Pitching đồng bộ thương hiệu",
        ],
        en: [
          "16-page landscape luxury hardcover brochure with foil stamping",
          "Interactive PDF edition with dynamic navigation index",
          "Harmonized executive pitch deck templates",
        ],
      },
      highlights: {
        vn: "Được đánh giá cao về tính chuyên nghiệp và thẩm mỹ tại các hội nghị xúc tiến tài chính.",
        en: "Praised by institutional investors for pristine visual professionalism and clarity.",
      },
    },
  },
];

interface GallerySectionProps {
  language: "vn" | "en";
}

export default function GallerySection({ language }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const t = (vn: string, en: string) => (language === "en" ? en : vn);

  const filteredItems =
    activeCategory === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

  const categories: { key: GalleryCategory; label: { vn: string; en: string }; icon: React.ReactNode }[] = [
    {
      key: "all",
      label: { vn: "Tất cả sản phẩm", en: "All Showcase" },
      icon: <ViewQuiltRounded fontSize="small" />,
    },
    {
      key: "website",
      label: { vn: "Websites & Web Apps", en: "Websites & Apps" },
      icon: <LanguageRounded fontSize="small" />,
    },
    {
      key: "poster",
      label: { vn: "Posters & Nghệ thuật", en: "Posters & Artworks" },
      icon: <PaletteRounded fontSize="small" />,
    },
    {
      key: "brochure",
      label: { vn: "Brochures & Ấn phẩm", en: "Brochures & Prints" },
      icon: <CollectionsBookmarkRounded fontSize="small" />,
    },
  ];

  // Distribute items round-robin across columns so no column is ever empty
  const getColumns = (items: GalleryItem[], numCols: number) => {
    const cols: GalleryItem[][] = Array.from({ length: numCols }, () => []);
    items.forEach((item, index) => {
      cols[index % numCols].push(item);
    });
    return cols;
  };

  const columns3 = getColumns(filteredItems, 3);
  const columns2 = getColumns(filteredItems, 2);

  const renderCard = (item: GalleryItem) => (
    <Card
      key={item.id}
      onClick={() => setSelectedItem(item)}
      sx={{
        bgcolor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transition:
          "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: item.accentColor,
          boxShadow: `0 16px 36px ${item.accentColor}26`,
          "& .mockup-overlay": {
            opacity: 1,
          },
          "& .mockup-art-canvas": {
            transform: "scale(1.03)",
          },
          "& .view-badge": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
      }}
    >
      {/* Visual Mockup Container */}
      <Box
        sx={{
          position: "relative",
          aspectRatio: item.aspectRatio,
          background: item.gradient,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2.5,
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {/* Visual Art Canvas Elements (Mockup Graphic) */}
        <Box
          className="mockup-art-canvas"
          sx={{
            position: "absolute",
            inset: 0,
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            opacity: 0.9,
            pointerEvents: "none",
          }}
        >
          {/* Decorative mesh circles and ambient glow */}
          <Box
            sx={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              bgcolor: item.accentColor,
              filter: "blur(60px)",
              opacity: 0.45,
              top: "-20%",
              right: "-20%",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              bgcolor: "#ffffff",
              filter: "blur(50px)",
              opacity: 0.15,
              bottom: "-10%",
              left: "-10%",
            }}
          />
          {/* Inner Mockup Card Simulation */}
          <Box
            sx={{
              position: "absolute",
              inset: "14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              bgcolor: "rgba(0, 0, 0, 0.32)",
              backdropFilter: "blur(10px)",
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Mockup header bar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                opacity: 0.7,
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  bgcolor: "#ef4444",
                }}
              />
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  bgcolor: "#f59e0b",
                }}
              />
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  bgcolor: "#10b981",
                }}
              />
              <Box
                sx={{
                  flex: 1,
                  height: 5,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.18)",
                  ml: 1,
                }}
              />
            </Box>

            {/* Mockup Center Graphic Icon & Typography */}
            <Box sx={{ my: "auto", textAlign: "center", py: 1.5 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  p: 1.2,
                  borderRadius: "var(--radius-md)",
                  bgcolor: "rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  mb: 1.2,
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  boxShadow: `0 4px 16px ${item.accentColor}40`,
                }}
              >
                {item.category === "website" ? (
                  <LanguageRounded sx={{ fontSize: 28 }} />
                ) : item.category === "poster" ? (
                  <PaletteRounded sx={{ fontSize: 28 }} />
                ) : (
                  <CollectionsBookmarkRounded sx={{ fontSize: 28 }} />
                )}
              </Box>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.95)",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  letterSpacing: "-0.01em",
                  textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                  lineHeight: 1.3,
                  px: 1,
                }}
              >
                {item.title[language]}
              </Typography>
            </Box>

            {/* Mockup footer mini badges */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pt: 1,
                borderTop: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.04em",
                }}
              >
                {item.tools[0]} · {item.tools[1] || ""}
              </Typography>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: item.accentColor,
                  boxShadow: `0 0 8px ${item.accentColor}`,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Top Badge */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Chip
            label={item.badge[language]}
            size="small"
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(10px)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.625rem",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.06em",
              border: "1px solid rgba(255, 255, 255, 0.25)",
            }}
          />
        </Box>

        {/* Hover Overlay with Preview CTA */}
        <Box
          className="mockup-overlay"
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(10, 11, 15, 0.65)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.3s ease",
            zIndex: 3,
          }}
        >
          <Button
            className="view-badge"
            variant="contained"
            startIcon={<VisibilityRounded />}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.95)",
              color: "#0a0b0f",
              fontWeight: 600,
              fontSize: "0.8rem",
              textTransform: "none",
              borderRadius: "var(--radius-full)",
              px: 2.5,
              py: 0.8,
              transform: "translateY(8px)",
              opacity: 0,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#ffffff",
                transform: "scale(1.05)",
              },
            }}
          >
            {t("Xem chi tiết", "View Details")}
          </Button>
        </Box>
      </Box>

      {/* Card Information */}
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.025rem",
            fontWeight: 600,
            lineHeight: 1.35,
            color: "var(--color-text-primary)",
            mb: 0.75,
          }}
        >
          {item.title[language]}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "var(--color-text-secondary)",
            fontSize: "0.825rem",
            lineHeight: 1.5,
            mb: 2,
          }}
        >
          {item.subtitle[language]}
        </Typography>

        {/* Tools & Tags */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.75,
            pt: 1.5,
            borderTop: "1px solid var(--color-border)",
          }}
        >
          {item.tools.map((tool) => (
            <Chip
              key={tool}
              label={tool}
              size="small"
              sx={{
                fontSize: "0.7rem",
                fontFamily: "var(--font-mono)",
                bgcolor: "var(--color-elevated)",
                color: "var(--color-text-secondary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: 1200, px: { xs: 2.5, md: 0 }, py: { xs: 8, md: 12 } }}
      id="gallery"
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
          gap: 4,
          alignItems: "end",
          mb: 5,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "var(--color-text-secondary)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              lineHeight: 1.2,
              textTransform: "uppercase",
            }}
          >
            03 / {t("Bộ sưu tập sản phẩm", "Product Showcase & Gallery")}
          </Typography>
          <Typography
            component="h2"
            sx={{
              mt: 1.5,
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {language === "en" ? (
              <>
                Crafting visual &amp;{" "}
                <Box
                  component="span"
                  sx={{ color: "var(--color-primary-hover)" }}
                >
                  digital experiences.
                </Box>
              </>
            ) : (
              <>
                Kiến tạo sản phẩm{" "}
                <Box
                  component="span"
                  sx={{ color: "var(--color-primary-hover)" }}
                >
                  thị giác &amp; kỹ thuật số.
                </Box>
              </>
            )}
          </Typography>
        </Box>
        <Typography
          sx={{
            color: "var(--color-text-secondary)",
            fontSize: "0.9375rem",
            lineHeight: 1.6,
          }}
        >
          {t(
            "Tuyển tập các tác phẩm thiết kế đồ họa (Poster, Brochure) kết hợp với các ứng dụng Web/UI phong phú, thể hiện tư duy thẩm mỹ và năng lực lập trình ứng dụng thực chiến.",
            "A curated collection of graphic designs (Posters, Brochures) alongside interactive Web applications, demonstrating strong aesthetic senses paired with engineering craft.",
          )}
        </Typography>
      </Box>

      {/* Category Filter Tabs */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mb: 5,
          flexWrap: "wrap",
          gap: 1.25,
          alignItems: "center",
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          const count =
            cat.key === "all"
              ? galleryData.length
              : galleryData.filter((i) => i.category === cat.key).length;
          return (
            <Button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              startIcon={cat.icon}
              sx={{
                px: 2.2,
                py: 0.9,
                borderRadius: "var(--radius-full)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                textTransform: "none",
                transition: "all 0.25s ease",
                bgcolor: isActive
                  ? "var(--color-primary)"
                  : "var(--color-surface)",
                color: isActive ? "#ffffff" : "var(--color-text-secondary)",
                border: "1px solid",
                borderColor: isActive
                  ? "var(--color-primary)"
                  : "var(--color-border)",
                boxShadow: isActive
                  ? "0 4px 14px rgba(79, 70, 229, 0.35)"
                  : "none",
                "&:hover": {
                  bgcolor: isActive
                    ? "var(--color-primary-hover)"
                    : "var(--color-elevated)",
                  color: isActive ? "#ffffff" : "var(--color-text-primary)",
                  borderColor: isActive
                    ? "var(--color-primary-hover)"
                    : "var(--color-border-strong)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {cat.label[language]} ({count})
            </Button>
          );
        })}
      </Stack>

      {/* Balanced Multi-Column Masonry (Guarantees no column is left empty) */}
      {/* 3 Columns for Large screens (lg+) */}
      <Box
        sx={{
          display: { xs: "none", lg: "grid" },
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
          alignItems: "start",
        }}
      >
        {columns3.map((colItems, colIdx) => (
          <Stack key={colIdx} spacing={3}>
            {colItems.map((item) => renderCard(item))}
          </Stack>
        ))}
      </Box>

      {/* 2 Columns for Medium screens (sm to md) */}
      <Box
        sx={{
          display: { xs: "none", sm: "grid", lg: "none" },
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 3,
          alignItems: "start",
        }}
      >
        {columns2.map((colItems, colIdx) => (
          <Stack key={colIdx} spacing={3}>
            {colItems.map((item) => renderCard(item))}
          </Stack>
        ))}
      </Box>

      {/* 1 Column for Mobile screens (xs) */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "column",
          gap: 3,
        }}
      >
        {filteredItems.map((item) => renderCard(item))}
      </Box>

      {/* Single-View Detail Dialog */}
      <Dialog
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              bgcolor: "var(--color-surface)",
              color: "var(--color-text-primary)",
              borderRadius: "20px",
              border: "1px solid var(--color-border)",
              boxShadow: "0 24px 64px rgba(0, 0, 0, 0.4)",
              overflow: "hidden",
              maxHeight: "min(92vh, 760px)",
              display: "flex",
              flexDirection: "column",
              m: { xs: 1.5, md: 3 },
            },
          },
        }}
      >
        {selectedItem && (
          <>
            {/* 1. Fixed Compact Header Banner */}
            <Box
              sx={{
                position: "relative",
                background: selectedItem.gradient,
                px: { xs: 2.5, md: 3 },
                py: { xs: 2, md: 2.2 },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflow: "hidden",
                flexShrink: 0,
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {/* Background Ambient Glow */}
              <Box
                sx={{
                  position: "absolute",
                  top: "-50%",
                  right: "10%",
                  width: 260,
                  height: 260,
                  borderRadius: "50%",
                  bgcolor: selectedItem.accentColor,
                  filter: "blur(60px)",
                  opacity: 0.4,
                  pointerEvents: "none",
                }}
              />

              <Box sx={{ zIndex: 2, pr: 2, maxWidth: "calc(100% - 48px)" }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 0.5 }}>
                  <Chip
                    icon={<FlareRounded sx={{ fontSize: "13px !important", color: `${selectedItem.accentColor} !important` }} />}
                    label={selectedItem.badge[language]}
                    size="small"
                    sx={{
                      bgcolor: "rgba(0, 0, 0, 0.65)",
                      backdropFilter: "blur(10px)",
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.05em",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      height: 22,
                    }}
                  />
                </Stack>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#ffffff",
                    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    fontSize: { xs: "1.15rem", md: "1.35rem" },
                    lineHeight: 1.25,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {selectedItem.title[language]}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.85)",
                    fontSize: { xs: "0.78rem", md: "0.85rem" },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {selectedItem.subtitle[language]}
                </Typography>
              </Box>

              <IconButton
                onClick={() => setSelectedItem(null)}
                aria-label="Close modal"
                size="small"
                sx={{
                  color: "#ffffff",
                  bgcolor: "rgba(0, 0, 0, 0.4)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  flexShrink: 0,
                  zIndex: 2,
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                <CloseRounded fontSize="small" />
              </IconButton>
            </Box>

            {/* 2. Scrollable Body (Structured to fit in 1 single view) */}
            <DialogContent
              sx={{
                p: { xs: 2, md: 2.5 },
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Metadata Quick Bar */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
                  gap: 1.5,
                  py: 1.2,
                  px: 2,
                  borderRadius: "var(--radius-md)",
                  bgcolor: "var(--color-elevated)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      lineHeight: 1.2,
                    }}
                  >
                    {t("DANH MỤC", "CATEGORY")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      textTransform: "capitalize",
                    }}
                  >
                    {selectedItem.category}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      lineHeight: 1.2,
                    }}
                  >
                    {t("ĐỐI TÁC / DỰ ÁN", "CLIENT / DOMAIN")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {selectedItem.client[language]}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      lineHeight: 1.2,
                    }}
                  >
                    {t("NĂM THỰC HIỆN", "YEAR")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {selectedItem.year}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      lineHeight: 1.2,
                    }}
                  >
                    {t("TRẠNG THÁI", "STATUS")}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "var(--color-success)",
                        boxShadow: "0 0 5px var(--color-success)",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {t("Hoàn thành", "Delivered")}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* 2 Columns: Details & Info */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1.25fr 0.75fr" },
                  gap: 2,
                }}
              >
                {/* Left Column: Description, Deliverables, Highlights */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: selectedItem.accentColor,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        mb: 0.5,
                      }}
                    >
                      {t("TỔNG QUAN DỰ ÁN", "PROJECT OVERVIEW")}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        lineHeight: 1.6,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {selectedItem.description[language]}
                    </Typography>
                  </Box>

                  {/* Challenge & Solution if present */}
                  {selectedItem.previewDetails.challenge && (
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "var(--radius-sm)",
                        bgcolor: "var(--color-elevated)",
                        borderLeft: `3px solid ${selectedItem.accentColor}`,
                        borderTop: "1px solid var(--color-border)",
                        borderRight: "1px solid var(--color-border)",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "var(--color-text-primary)",
                          mb: 0.25,
                        }}
                      >
                        🎯 {t("Thách thức & Giải pháp:", "Challenge & Solution:")}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.5,
                        }}
                      >
                        {selectedItem.previewDetails.solution?.[language] ||
                          selectedItem.previewDetails.challenge[language]}
                      </Typography>
                    </Box>
                  )}

                  {/* Deliverables List */}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: "var(--color-text-secondary)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        mb: 0.75,
                      }}
                    >
                      {t("CÁC HẠNG MỤC BÀN GIAO", "KEY DELIVERABLES")}
                    </Typography>
                    <Stack spacing={0.8}>
                      {selectedItem.previewDetails.deliverables[language].map(
                        (deliv, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1,
                            }}
                          >
                            <CheckCircleRounded
                              sx={{
                                fontSize: 15,
                                color: selectedItem.accentColor,
                                mt: 0.2,
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "0.8rem",
                                color: "var(--color-text-primary)",
                                lineHeight: 1.45,
                              }}
                            >
                              {deliv}
                            </Typography>
                          </Box>
                        ),
                      )}
                    </Stack>
                  </Box>

                  {/* Highlight Box */}
                  <Box
                    sx={{
                      p: 1.2,
                      borderRadius: "var(--radius-sm)",
                      bgcolor: "var(--color-surface)",
                      border: "1px dashed var(--color-border-strong)",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.78rem",
                        color: "var(--color-text-secondary)",
                        fontStyle: "italic",
                        lineHeight: 1.4,
                      }}
                    >
                      💡 <Box component="span" sx={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{t("Điểm sáng:", "Highlight:")}</Box> {selectedItem.previewDetails.highlights[language]}
                    </Typography>
                  </Box>
                </Box>

                {/* Right Column: Role & Tech Stack */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {/* Role Card */}
                  <Box
                    sx={{
                      p: 1.8,
                      borderRadius: "var(--radius-md)",
                      bgcolor: "var(--color-elevated)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.6 }}>
                      <PersonOutlineRounded sx={{ fontSize: 16, color: selectedItem.accentColor }} />
                      <Typography
                        sx={{
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          color: "var(--color-text-muted)",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {t("VAI TRÒ ĐẢM NHIỆM", "YOUR ROLE")}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: "var(--color-text-primary)",
                        lineHeight: 1.35,
                      }}
                    >
                      {selectedItem.previewDetails.role[language]}
                    </Typography>
                  </Box>

                  {/* Tools Card */}
                  <Box
                    sx={{
                      p: 1.8,
                      borderRadius: "var(--radius-md)",
                      bgcolor: "var(--color-elevated)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1 }}>
                      <DataObjectRounded sx={{ fontSize: 16, color: selectedItem.accentColor }} />
                      <Typography
                        sx={{
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          color: "var(--color-text-muted)",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {t("CÔNG NGHỆ & CÔNG CỤ", "TECH & TOOLS")}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6 }}>
                      {selectedItem.tools.map((tool) => (
                        <Chip
                          key={tool}
                          label={tool}
                          size="small"
                          sx={{
                            bgcolor: "var(--color-surface)",
                            color: "var(--color-text-primary)",
                            border: "1px solid var(--color-border-strong)",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                            fontFamily: "var(--font-mono)",
                            height: 22,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Domain Tags */}
                  <Box
                    sx={{
                      p: 1.8,
                      borderRadius: "var(--radius-md)",
                      bgcolor: "var(--color-elevated)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        color: "var(--color-text-muted)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        mb: 1,
                      }}
                    >
                      {t("THẺ PHÂN LOẠI", "TAGS & DOMAIN")}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6 }}>
                      {selectedItem.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: "var(--color-border-strong)",
                            color: "var(--color-text-secondary)",
                            fontSize: "0.7rem",
                            height: 22,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </DialogContent>

            {/* 3. Fixed Bottom Action Footer */}
            <Box
              sx={{
                px: { xs: 2.5, md: 3 },
                py: 1.5,
                borderTop: "1px solid var(--color-border)",
                bgcolor: "var(--color-surface)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.78rem",
                  color: "var(--color-text-muted)",
                  display: { xs: "none", sm: "block" },
                }}
              >
                {t(
                  "Sẵn sàng tư vấn và triển khai giải pháp tương tự.",
                  "Available for custom design & software collaborations.",
                )}
              </Typography>

              <Stack direction="row" spacing={1.25} sx={{ width: { xs: "100%", sm: "auto" }, ml: "auto" }}>
                <Button
                  onClick={() => setSelectedItem(null)}
                  variant="outlined"
                  size="small"
                  sx={{
                    flex: { xs: 1, sm: "initial" },
                    color: "var(--color-text-primary)",
                    borderColor: "var(--color-border-strong)",
                    borderRadius: "var(--radius-md)",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    px: 2.5,
                    py: 0.6,
                    "&:hover": {
                      borderColor: "var(--color-text-primary)",
                      bgcolor: "var(--color-elevated)",
                    },
                  }}
                >
                  {t("Đóng", "Close")}
                </Button>
                <Button
                  variant="contained"
                  href="mailto:hoanu14302@gmail.com?subject=Trao đổi về dự án sản phẩm"
                  endIcon={<LaunchRounded sx={{ fontSize: "14px !important" }} />}
                  size="small"
                  sx={{
                    flex: { xs: 1, sm: "initial" },
                    bgcolor: "var(--color-primary)",
                    borderRadius: "var(--radius-md)",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    px: 2.5,
                    py: 0.6,
                    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.35)",
                    "&:hover": {
                      bgcolor: "var(--color-primary-hover)",
                    },
                  }}
                >
                  {t("Liên hệ hợp tác", "Inquire About This Work")}
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Dialog>
    </Container>
  );
}
