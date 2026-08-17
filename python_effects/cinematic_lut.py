"""
Cinematic 3D LUT & Teal-Orange Color Grading Module
Tối ưu hóa ma trận NumPy vectorization
"""

import cv2
import numpy as np


def apply_cinematic_teal_orange(
    image_bgr: np.ndarray,
    intensity: float = 0.85,
    teal_contrast: float = 0.65,
    shadow_depth: float = 0.45,
) -> np.ndarray:
    """
    Áp dụng 3D LUT Color Grading mô phỏng phim điện ảnh Hollywood.
    - Shadows: Đẩy tone màu Teal (Blue/Cyan) mờ ảo ở vùng tối.
    - Highlights & Midtones: Tăng tone ấm (Orange/Warm) làm nổi bật sắc da.
    - S-Curve Tone Mapping tăng độ tương phản tự nhiên.

    Args:
        image_bgr: Ảnh đầu vào dạng numpy array BGR (uint8).
        intensity: Cường độ hòa trộn hiệu ứng (0.0 đến 1.0).
        teal_contrast: Độ bão hòa sắc thái Teal/Orange (0.0 đến 1.0).
        shadow_depth: Độ sâu vùng tối áp dụng tone Teal (0.0 đến 1.0).

    Returns:
        np.ndarray: Ảnh kết quả BGR (uint8).
    """
    if image_bgr is None or image_bgr.size == 0:
        raise ValueError("Ảnh đầu vào không hợp lệ.")

    img_float = image_bgr.astype(np.float32) / 255.0
    b, g, r = cv2.split(img_float)

    # Tính toán độ sáng tương đối (Perceived Luminance)
    luminance = 0.299 * r + 0.587 * g + 0.114 * b

    # Shadows Mask -> Đẩy tone Teal (Blue & Green)
    shadow_mask = np.clip(1.0 - luminance * (1.0 + shadow_depth), 0.0, 1.0)
    b += shadow_mask * 0.35 * intensity * (1.0 + teal_contrast * 0.5)
    g += shadow_mask * 0.15 * intensity * (1.0 + teal_contrast * 0.3)
    r -= shadow_mask * 0.10 * intensity

    # Highlights Mask -> Đẩy tone Orange/Warm (Red & Green)
    highlight_mask = np.clip(luminance * (1.0 + teal_contrast * 0.4), 0.0, 1.0)
    r += highlight_mask * 0.28 * intensity
    g += highlight_mask * 0.10 * intensity
    b -= highlight_mask * 0.08 * intensity

    # Hợp nhất các kênh màu
    graded = cv2.merge([b, g, r])

    # S-Curve contrast boost
    graded = np.clip(graded ** 0.9, 0.0, 1.0)

    # Blend với ảnh gốc theo intensity
    final_float = (1.0 - intensity) * img_float + intensity * graded
    return (np.clip(final_float, 0.0, 1.0) * 255).astype(np.uint8)
