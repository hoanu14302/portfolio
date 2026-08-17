"""
Analog 35mm Film Grain & Optical Vignette Simulation
Gaussian Noise Texture & Radial Falloff Mask
"""

import cv2
import numpy as np


def apply_analog_film_grain(
    image_bgr: np.ndarray,
    grain_intensity: float = 0.70,
    vignette_darkness: float = 0.65,
    grain_size: float = 1.0,
) -> np.ndarray:
    """
    Mô phỏng cấu trúc hạt phim nhựa analog 35mm (Silver Halide Grain)
    và hiệu ứng tối góc quang học (Optical Falloff / Vignette).

    Args:
        image_bgr: Ảnh đầu vào dạng numpy array BGR (uint8).
        grain_intensity: Cường độ hạt phim (0.0 đến 1.0).
        vignette_darkness: Độ tối của 4 góc ảnh (0.0 đến 1.0).
        grain_size: Kích thước hạt phim.

    Returns:
        np.ndarray: Ảnh kết quả BGR (uint8).
    """
    if image_bgr is None or image_bgr.size == 0:
        raise ValueError("Ảnh đầu vào không hợp lệ.")

    h, w, c = image_bgr.shape

    # Sinh hạt phim ngẫu nhiên phân phối chuẩn (Gaussian Noise)
    std_dev = 16.0 * grain_intensity
    noise = np.random.normal(0, std_dev, (h, w, c)).astype(np.float32)

    if grain_size > 1.0:
        noise = cv2.GaussianBlur(noise, (3, 3), grain_size)

    img_noisy = np.clip(image_bgr.astype(np.float32) + noise, 0, 255)

    # Tạo mặt nạ Vignette hình elip
    kernel_x = cv2.getGaussianKernel(w, w / (1.2 + vignette_darkness * 0.8))
    kernel_y = cv2.getGaussianKernel(h, h / (1.2 + vignette_darkness * 0.8))
    kernel = kernel_y * kernel_x.T
    mask = kernel / kernel.max()

    # Áp dụng mặt nạ tối góc
    vignette_layer = img_noisy * mask[:, :, None]
    result = (1.0 - vignette_darkness * 0.4) * img_noisy + (vignette_darkness * 0.4) * vignette_layer
    return np.clip(result, 0, 255).astype(np.uint8)
