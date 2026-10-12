"use client";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Fullscreen from "@mui/icons-material/Fullscreen";
import FullscreenExit from "@mui/icons-material/FullscreenExit";
import type { RefObject } from "react";
import { useFullscreen } from "@/features/showroom/hooks/useFullscreen";

type FullscreenButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
};

export function FullscreenButton({ targetRef }: FullscreenButtonProps) {
  const { isFullscreen, isSupported, toggle } = useFullscreen(targetRef);
  if (!isSupported) return null;

  const label = isFullscreen ? "خروج از تمام‌صفحه" : "تمام‌صفحه";

  return (
    <Tooltip title={label} placement="bottom">
      <IconButton
        aria-label={label}
        onClick={() => void toggle()}
        className="bg-paper/80 text-graphite ring-1 ring-graphite/10 backdrop-blur hover:bg-paper"
      >
        {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
      </IconButton>
    </Tooltip>
  );
}
