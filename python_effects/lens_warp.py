"""
Mesh Warp, Fisheye & Chromatic Distortion Module
Matrix Grid Remap & Optical Dispersion
"""

import cv2
import numpy as np


def apply_mesh_warp_chromatic(
    image_bgr: np.ndarray,
    warp_factor: float = 0.65,
    chromatic_shift: int = 5,
    fisheye_curve: float = 0.75,
) -> np.ndarray:
    """
    Biến dạng lưới tọa độ ma trận (Mesh Grid Warp), hiệu ứng mắt cá Fisheye
    và tách kênh quang sai màu sắc (RGB Chromatic Aberration).

    Args:
        image_bgr: Ảnh đầu vào dạng numpy array BGR (uint8).
        warp_factor: Độ cong biến dạng thấu kính (0.0 đến 1.0).
        chromatic_shift: Độ lệch pixel giữa các kênh màu B và R.
        fisheye_curve: Độ cong Fisheye ngoại vi.

    Returns:
        np.ndarray: Ảnh kết quả BGR (uint8).
    """
    if image_bgr is None or image_bgr.size == 0:
        raise ValueError("Ảnh đầu vào không hợp lệ.")

    h, w = image_bgr.shape[:2]

    # Tạo lưới tọa độ chuẩn hóa từ -1.0 đến 1.0
    x, y = np.meshgrid(np.linspace(-1.0, 1.0, w), np.linspace(-1.0, 1.0, h))
    r = np.sqrt(x ** 2 + y ** 2)

    # Công thức Barrel / Pincushion Distortion
    distortion = 1.0 + warp_factor * 0.35 * (r ** (1.0 + fisheye_curve))
    map_x = ((x * distortion + 1.0) * 0.5 * (w - 1)).astype(np.float32)
    map_y = ((y * distortion + 1.0) * 0.5 * (h - 1)).astype(np.float32)

    shift = int(chromatic_shift)

    # Remap từng kênh màu độc lập để tạo Chromatic Aberration
    b = cv2.remap(image_bgr[:, :, 0], map_x + shift, map_y, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
    g = cv2.remap(image_bgr[:, :, 1], map_x, map_y, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
    r = cv2.remap(image_bgr[:, :, 2], map_x - shift, map_y, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

    return cv2.merge([b, g, r])
