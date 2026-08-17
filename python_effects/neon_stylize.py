"""
Cyberpunk Neon & Edge Glow Stylization Module
Edge Detection & Neon Gradient Screen Compositing
"""

import cv2
import numpy as np


def apply_cyberpunk_neon_edge(
    image_bgr: np.ndarray,
    intensity: float = 0.90,
    edge_sensitivity: int = 85,
    neon_saturation: float = 0.70,
) -> np.ndarray:
    """
    Tạo hiệu ứng viền Neon phát sáng Cyberpunk kết hợp Sobel/Canny Edge Detection.

    Args:
        image_bgr: Ảnh đầu vào dạng numpy array BGR (uint8).
        intensity: Cường độ hiệu ứng (0.0 đến 1.0).
        edge_sensitivity: Độ nhạy biên cạnh (10 đến 100).
        neon_saturation: Độ bão hòa gradient màu Neon.

    Returns:
        np.ndarray: Ảnh kết quả BGR (uint8).
    """
    if image_bgr is None or image_bgr.size == 0:
        raise ValueError("Ảnh đầu vào không hợp lệ.")

    gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Edge detection
    low_thresh = max(10, int(30 * (1.0 - edge_sensitivity / 150.0)))
    high_thresh = max(40, int(edge_sensitivity * 2.2))
    edges = cv2.Canny(blurred, low_thresh, high_thresh)

    h, w = gray.shape
    edges_colored = np.zeros_like(image_bgr, dtype=np.float32)

    # Map Neon Gradient: Cyan (Blue+Green) ở trên -> Magenta (Blue+Red) ở dưới
    y_coords = np.linspace(0, 1, h)[:, None]
    edges_colored[:, :, 0] = edges * (0.8 + 0.2 * y_coords * neon_saturation)  # Blue/Cyan
    edges_colored[:, :, 1] = edges * (0.2 + 0.6 * (1.0 - y_coords) * neon_saturation)  # Green
    edges_colored[:, :, 2] = edges * (0.9 * y_coords * neon_saturation)  # Red/Magenta

    # Giảm sáng ảnh nền và tăng cường độ glow
    base_dim = (image_bgr.astype(np.float32) * 0.45).astype(np.uint8)
    neon_glow = cv2.GaussianBlur(edges_colored.astype(np.uint8), (15, 15), 0)
    combined = cv2.addWeighted(base_dim, 0.8, neon_glow, intensity * 1.4, 0)

    result = cv2.add(combined, edges_colored.astype(np.uint8))
    return np.clip(result, 0, 255).astype(np.uint8)
