"""
Anamorphic Glow & Soft Bloom Lighting Module
Multi-scale Gaussian Blur & Screen Compositing
"""

import cv2
import numpy as np


def apply_anamorphic_bloom(
    image_bgr: np.ndarray,
    intensity: float = 0.75,
    bloom_radius: int = 21,
    threshold_lum: int = 180,
) -> np.ndarray:
    """
    Trích xuất dải sáng cao và khuếch tán ánh sáng mờ ảo đa lớp (Bloom / Glow).

    Args:
        image_bgr: Ảnh đầu vào dạng numpy array BGR (uint8).
        intensity: Cường độ tỏa sáng (0.0 đến 1.0).
        bloom_radius: Bán kính làm mờ Gaussian (phải là số lẻ).
        threshold_lum: Ngưỡng độ sáng trích xuất vùng phát quang (0 đến 255).

    Returns:
        np.ndarray: Ảnh kết quả BGR (uint8).
    """
    if image_bgr is None or image_bgr.size == 0:
        raise ValueError("Ảnh đầu vào không hợp lệ.")

    # Đảm bảo kernel_radius là số lẻ dương
    kernel_radius = max(3, int(bloom_radius) | 1)

    gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
    # Lấy vùng sáng cao (Thresholding)
    _, bright_areas = cv2.threshold(gray, threshold_lum, 255, cv2.THRESH_TOZERO)
    bright_mask = cv2.cvtColor(bright_areas, cv2.COLOR_GRAY2BGR)

    # Blur đa tầng khuếch tán ánh sáng
    blur1 = cv2.GaussianBlur(bright_mask, (kernel_radius, kernel_radius), 0)
    blur2_radius = kernel_radius * 2 + 1
    blur2 = cv2.GaussianBlur(bright_mask, (blur2_radius, blur2_radius), 0)
    bloom_layer = cv2.addWeighted(blur1, 0.6, blur2, 0.4, 0)

    # Screen Blend Mode kết hợp vào ảnh gốc
    result = cv2.addWeighted(image_bgr, 1.0, bloom_layer, intensity * 0.85, 0)
    return np.clip(result, 0, 255).astype(np.uint8)
