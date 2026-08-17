"""
Double Exposure Floral & Bird Silhouette Dispersion Module
Tối ưu hóa ma trận NumPy & OpenCV
"""

import cv2
import numpy as np


def apply_double_exposure_dispersion(
    image_bgr: np.ndarray,
    intensity: float = 0.85,
    spread: float = 0.75,
    glow_level: float = 0.65,
) -> np.ndarray:
    """
    Hiệu ứng chân dung nghệ thuật Double Exposure:
    - Nâng sáng tông màu High-Key Pastel ấm áp (Warm Peach / Lilac glow).
    - Tách hòa tan biên ảnh và chủ thể vào nền trắng sữa (Creamy High-Key Background).
    - Vương miện cành cây thực vật & các điểm nhấn cánh hoa đào (Botanical Crown Silhouette).
    - Đàn chim bay lượn phân tán đa hướng từ mái tóc sang nền sáng (Flying Bird Swarm Dispersion).

    Args:
        image_bgr: Ảnh đầu vào dạng numpy array BGR (uint8).
        intensity: Cường độ hiệu ứng tan biến (0.0 đến 1.0).
        spread: Độ lan tỏa của đàn chim và cánh hoa (0.0 đến 1.0).
        glow_level: Độ hòa trộn phát sáng Pastel Bokeh (0.0 đến 1.0).

    Returns:
        np.ndarray: Ảnh kết quả BGR (uint8).
    """
    if image_bgr is None or image_bgr.size == 0:
        raise ValueError("Ảnh đầu vào không hợp lệ.")

    h, w, c = image_bgr.shape
    img_float = image_bgr.astype(np.float32) / 255.0

    cx = w * 0.5
    cy = h * 0.45

    # 1. Tách nền và tạo tông màu High-Key Pastel ấm áp
    result = np.zeros_like(img_float)
    for y in range(h):
        for x in range(w):
            r = img_float[y, x, 2]
            g = img_float[y, x, 1]
            b = img_float[y, x, 0]

            dx = (x - cx) / w
            dy = (y - cy) / h
            dist_norm = np.sqrt(dx * dx * 1.2 + dy * dy)

            bg_fade = np.clip((dist_norm - 0.28) / 0.45 * intensity, 0.0, 1.0)

            # Tone đào ấm pastel
            new_r = r * 1.12 + 0.14 * intensity * glow_level
            new_g = g * 0.98 + 0.08 * intensity * glow_level
            new_b = b * 0.92 + 0.12 * intensity * glow_level

            # Fade vào nền creamy
            target_r = 1.0 - 0.06 * (1.0 - glow_level)
            target_g = 0.97 - 0.10 * (1.0 - glow_level)
            target_b = 0.95 - 0.14 * (1.0 - glow_level)

            final_r = new_r * (1.0 - bg_fade) + target_r * bg_fade
            final_g = new_g * (1.0 - bg_fade) + target_g * bg_fade
            final_b = new_b * (1.0 - bg_fade) + target_b * bg_fade

            result[y, x, 2] = np.clip(final_r, 0.0, 1.0)
            result[y, x, 1] = np.clip(final_g, 0.0, 1.0)
            result[y, x, 0] = np.clip(final_b, 0.0, 1.0)

    # 2. Tạo nhánh cây nghệ thuật & cánh hoa đan xen
    num_branches = int(18 * intensity) + 12
    for b in range(num_branches):
        angle = -np.pi * 0.8 + (b / num_branches) * np.pi * 1.6
        branch_len = int((120 + (b % 5) * 25) * intensity * (spread * 0.8 + 0.4))

        start_x = cx + np.cos(angle) * (w * 0.22)
        start_y = cy + np.sin(angle) * (h * 0.25) - h * 0.08

        for step in range(0, branch_len, 3):
            progress = step / branch_len
            cur_x = int(start_x + np.cos(angle + np.sin(progress * 4) * 0.3) * step)
            cur_y = int(start_y + np.sin(angle - 0.2) * step - (progress ** 2) * 30)

            if 0 <= cur_x < w and 0 <= cur_y < h:
                petal_size = max(2, int(6 * (1.0 - progress * 0.6)))
                is_golden = (b % 2 == 0)
                pr_r = 1.0 if is_golden else 0.94
                pr_g = 0.72 if is_golden else 0.47
                pr_b = 0.31 if is_golden else 0.63

                alpha = (0.75 - progress * 0.4) * intensity

                y1, y2 = max(0, cur_y - petal_size), min(h, cur_y + petal_size + 1)
                x1, x2 = max(0, cur_x - petal_size), min(w, cur_x + petal_size + 1)

                result[y1:y2, x1:x2, 2] = result[y1:y2, x1:x2, 2] * (1.0 - alpha) + pr_r * alpha
                result[y1:y2, x1:x2, 1] = result[y1:y2, x1:x2, 1] * (1.0 - alpha) + pr_g * alpha
                result[y1:y2, x1:x2, 0] = result[y1:y2, x1:x2, 0] * (1.0 - alpha) + pr_b * alpha

    # 3. Đàn chim bay phân tán
    num_birds = int(80 * intensity * spread) + 40
    for _ in range(num_birds):
        spread_angle = -np.pi * 0.95 + np.random.rand() * np.pi * 1.9
        spread_dist = (w * 0.28) + np.random.rand() * (w * 0.35 * spread)

        bird_x = int(cx + np.cos(spread_angle) * spread_dist + (30 if spread_angle > -np.pi / 2 else -30))
        bird_y = int(cy + np.sin(spread_angle) * spread_dist * 0.85 - 40)

        if 10 <= bird_x < w - 10 and 10 <= bird_y < h - 10:
            bird_size = max(2, int(np.random.rand() * 5 + 2))
            wing_spread = int(bird_size * 2.2)

            for wx in range(-wing_spread, wing_spread + 1):
                wy = int(-abs(wx) * 0.55 + np.random.rand() * 0.5)
                bx = bird_x + wx
                by = bird_y + wy

                if 0 <= bx < w and 0 <= by < h:
                    bird_opacity = (0.55 + np.random.rand() * 0.35) * intensity
                    result[by, bx, 2] = result[by, bx, 2] * (1.0 - bird_opacity) + 0.55 * bird_opacity
                    result[by, bx, 1] = result[by, bx, 1] * (1.0 - bird_opacity) + 0.35 * bird_opacity
                    result[by, bx, 0] = result[by, bx, 0] * (1.0 - bird_opacity) + 0.51 * bird_opacity

    # 4. Soft High-Key Bloom Glow
    glow = cv2.GaussianBlur(result, (31, 31), 0)
    final_output = cv2.addWeighted(result, 0.75, glow, 0.35 * glow_level, 0.05 * intensity)
    return (np.clip(final_output, 0.0, 1.0) * 255).astype(np.uint8)
