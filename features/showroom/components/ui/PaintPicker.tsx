"use client";

import ButtonBase from "@mui/material/ButtonBase";
import Tooltip from "@mui/material/Tooltip";
import { cn } from "@/features/shared/lib/cn";
import { PAINT_LIST } from "@/features/showroom/config/paints";
import { useShowroomStore } from "@/features/showroom/store/showroom-store";

export function PaintPicker() {
  const paintId = useShowroomStore((state) => state.paintId);
  const setPaint = useShowroomStore((state) => state.setPaint);

  return (
    <div
      role="radiogroup"
      aria-label="رنگ بدنه"
      className="flex items-center gap-2 rounded-full bg-paper/80 px-2.5 py-1.5 ring-1 ring-graphite/10 backdrop-blur"
    >
      {PAINT_LIST.map((paint) => {
        const isSelected = paint.id === paintId;
        return (
          <Tooltip key={paint.id} title={paint.label} placement="top" arrow>
            <ButtonBase
              role="radio"
              aria-checked={isSelected}
              aria-label={paint.label}
              onClick={() => setPaint(paint.id)}
              style={{ backgroundColor: paint.color }}
              className={cn(
                "size-6 rounded-full ring-1 ring-graphite/20 ring-offset-2 ring-offset-paper transition-shadow",
                isSelected && "ring-2 ring-graphite",
              )}
            />
          </Tooltip>
        );
      })}
    </div>
  );
}
