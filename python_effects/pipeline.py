"""
Modular Hot-swappable Pipeline & Layer Compositing Engine
Cho phép kết nối, tháo lắp và thực thi chuỗi hiệu ứng động
"""

from typing import Callable, Dict, Any, List
import numpy as np


class EffectLayer:
    """Đại diện cho một lớp hiệu ứng độc lập trong pipeline."""

    def __init__(
        self,
        name: str,
        func: Callable[..., np.ndarray],
        params: Dict[str, Any] = None,
        enabled: bool = True,
    ):
        self.name = name
        self.func = func
        self.params = params or {}
        self.enabled = enabled

    def apply(self, img: np.ndarray) -> np.ndarray:
        if not self.enabled:
            return img
        return self.func(img, **self.params)


class EffectsPipeline:
    """Pipeline điều phối và thực thi danh sách các hiệu ứng theo chuỗi."""

    def __init__(self):
        self.layers: List[EffectLayer] = []

    def add_layer(self, layer: EffectLayer) -> "EffectsPipeline":
        self.layers.append(layer)
        return self

    def remove_layer(self, name: str) -> "EffectsPipeline":
        self.layers = [l for l in self.layers if l.name != name]
        return self

    def set_layer_enabled(self, name: str, enabled: bool) -> "EffectsPipeline":
        for l in self.layers:
            if l.name == name:
                l.enabled = enabled
        return self

    def execute(self, image_bgr: np.ndarray) -> np.ndarray:
        """Chạy toàn bộ pipeline qua các layers đã kích hoạt."""
        current = image_bgr.copy()
        for layer in self.layers:
            if layer.enabled:
                current = layer.apply(current)
        return current
