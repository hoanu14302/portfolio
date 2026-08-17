"""
Motion Blur & Radial Zoom Speed Effect Module
Tối ưu hóa OpenCV & NumPy
"""

import cv2
import numpy as np


def apply_motion_radial_blur(
    image_bgr: np.ndarray,
    intensity: float = 0.75,
    blur_angle: float = 0.50,
    zoom_strength: float = 0.60,
) -> np.ndarray:
    """
    Hiệu ứng Motion Blur & Radial Speed Zoom:
    - Tạo vệt chuyển động tốc độ cao (Linear Motion Streak).
    - Phóng đại quang học hướng tâm (Radial Zoom Burst).
    - Tạo chiều sâu động học cho ảnh chân dung / xe cộ / thể thao.

    Args:
        image_bgr: Ảnh đầu vào dạng numpy array BGR (uint8).
        intensity: Cường độ hiệu ứng chuyển động (0.0 đến 1.0).
        blur_angle: Góc hướng vệt mờ chuyển động (0.0 đến 1.0 tương ứng 0 đến 180 độ).
        zoom_strength: Độ phóng đại gia tốc hướng tâm (0.0 đến 1.0).

    Returns:
        np.ndarray: Ảnh kết quả BGR (uint8).
    """
    if image_bgr is None or image_bgr.size == 0:
        raise ValueError("Ảnh đầu vào không hợp lệ.")

    h, w = image_bgr.shape[:2]
    img_float = image_bgr.astype(np.float32)

    # 1. Linear Motion Blur Kernel
    kernel_size = max(3, int(35 * intensity))
    if kernel_size % 2 == 0:
        kernel_size += 1

    kernel = np.zeros((kernel_size, kernel_size), dtype=np.float32)
    angle_rad = blur_angle * np.pi
    cx_k, cy_k = kernel_size // 2, kernel_size // 2

    for r in range(kernel_size):
        offset = r - cx_k
        kx = int(round(cx_k + offset * np.cos(angle_rad)))
        ky = int(round(cy_k + offset * np.sin(angle_rad)))
        if 0 <= kx < kernel_size and 0 <= ky < kernel_size:
            kernel[ky, kx] = 1.0

    kernel_sum = kernel.sum()
    if kernel_sum > 0:
        kernel /= kernel_sum

    linear_blur = cv2.filter2D(img_float, -1, kernel)

    # 2. Radial Zoom Blur Multi-scale blending
    if zoom_strength > 0.05:
        steps = max(3, int(8 * zoom_strength))
        accum = img_float.copy()
        cx, cy = w / 2, h / 2

        for i in range(1, steps + 1):
            scale = 1.0 + (i / steps) * 0.12 * zoom_strength * intensity
            M = cv2.getRotationMatrix2D((cx, cy), 0, scale)
            scaled = cv2.warpAffine(
                img_float, M, (w, h), borderMode=cv2.BORDER_REFLECT_101
            )
            accum += scaled

        radial_blur = accum / (steps + 1)
        # Blend linear motion + radial zoom
        blended = cv2.addWeighted(linear_blur, 0.6, radial_blur, 0.4, 0)
    else:
        blended = linear_blur

    # 3. Blend với ảnh gốc
    result = cv2.addWeighted(img_float, 1.0 - intensity, blended, intensity, 0)
    return np.clip(result, 0, 255).astype(np.uint8)
