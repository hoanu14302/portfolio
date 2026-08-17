"""
Pixel Glitch & CRT Matrix Slicing Module
Tối ưu hóa ma trận NumPy & OpenCV
"""

import cv2
import numpy as np


def apply_pixel_glitch(
    image_bgr: np.ndarray,
    intensity: float = 0.75,
    max_shift: int = 42,
    noise_density: float = 0.50,
) -> np.ndarray:
    """
    Hiệu ứng Glitch cắt lát ma trận số (Digital CRT Matrix Slicing):
    - Cắt ngẫu nhiên các thanh ngang và dịch chuyển theo trục X.
    - Gây nhiễu tín hiệu CRT Scanlines và giật lệch khung hình RGB.

    Args:
        image_bgr: Ảnh đầu vào dạng numpy array BGR (uint8).
        intensity: Cường độ glitch (0.0 đến 1.0).
        max_shift: Khoảng dịch chuyển ngang tối đa (pixels).
        noise_density: Mật độ các đường nhiễu CRT (0.0 đến 1.0).

    Returns:
        np.ndarray: Ảnh kết quả BGR (uint8).
    """
    if image_bgr is None or image_bgr.size == 0:
        raise ValueError("Ảnh đầu vào không hợp lệ.")

    h, w, c = image_bgr.shape
    result = image_bgr.copy()

    # 1. Cắt lát và dịch dải pixel ngang
    num_slices = int(25 * intensity)
    for _ in range(num_slices):
        slice_h = np.random.randint(4, max(5, int(35 * intensity)))
        y = np.random.randint(0, max(1, h - slice_h))
        shift = np.random.randint(-max_shift, max_shift + 1)

        result[y : y + slice_h, :, :] = np.roll(
            result[y : y + slice_h, :, :], shift, axis=1
        )

    # 2. Tạo đường sọc nhiễu CRT Scanlines
    if noise_density > 0.1:
        scanline_step = max(2, int(8 - noise_density * 4))
        for y in range(0, h, scanline_step):
            dim_factor = 0.85 - (0.35 * intensity)
            result[y, :, :] = (result[y, :, :].astype(np.float32) * dim_factor).astype(
                np.uint8
            )

    # 3. Lệch kênh màu (RGB Channel Split Glitch)
    if intensity > 0.3:
        shift_channel = int(8 * intensity)
        b, g, r = cv2.split(result)
        b = np.roll(b, shift_channel, axis=1)
        r = np.roll(r, -shift_channel, axis=1)
        result = cv2.merge([b, g, r])

    return result
