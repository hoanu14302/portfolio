"""
Adaptive Tone Mapping & HDR Dynamic Range Boost Module
CLAHE in LAB Color Space & Unsharp Masking
"""

import cv2
import numpy as np


def apply_hdr_adaptive_tonemap(
    image_bgr: np.ndarray,
    intensity: float = 0.80,
    detail_sharpness: float = 0.60,
    clip_limit: float = 2.5,
) -> np.ndarray:
    """
    Tăng cường dải sáng động HDR bằng CLAHE trên không gian màu LAB
    kết hợp Unsharp Masking phục hồi chi tiết vùng tối mà không cháy sáng.

    Args:
        image_bgr: Ảnh đầu vào dạng numpy array BGR (uint8).
        intensity: Cường độ hiệu ứng HDR (0.0 đến 1.0).
        detail_sharpness: Độ sắc nét chi tiết biên cạnh (0.0 đến 1.0).
        clip_limit: Giới hạn clip CLAHE.

    Returns:
        np.ndarray: Ảnh kết quả BGR (uint8).
    """
    if image_bgr is None or image_bgr.size == 0:
        raise ValueError("Ảnh đầu vào không hợp lệ.")

    lab = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)

    # Contrast Limited Adaptive Histogram Equalization trên kênh L (Luminance)
    effective_clip = max(1.0, clip_limit * intensity)
    clahe = cv2.createCLAHE(clipLimit=effective_clip, tileGridSize=(8, 8))
    l_enhanced = clahe.apply(l)

    enhanced_lab = cv2.merge([l_enhanced, a, b])
    result_bgr = cv2.cvtColor(enhanced_lab, cv2.COLOR_LAB2BGR)

    # Unsharp Masking tăng cường độ nét cục bộ
    if detail_sharpness > 0.0:
        gaussian = cv2.GaussianBlur(result_bgr, (0, 0), 2.0)
        unsharp_weight = 1.0 + detail_sharpness * 0.6 * intensity
        result_bgr = cv2.addWeighted(result_bgr, unsharp_weight, gaussian, 1.0 - unsharp_weight, 0)

    # Blend với ảnh gốc
    return cv2.addWeighted(image_bgr, 1.0 - intensity, result_bgr, intensity, 0)
