"use client";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DirectionsCarFilledOutlined from "@mui/icons-material/DirectionsCarFilledOutlined";
import AirlineSeatReclineNormalOutlined from "@mui/icons-material/AirlineSeatReclineNormalOutlined";
import type { MouseEvent } from "react";
import { selectViewMode, useShowroomStore } from "@/features/showroom/store/showroom-store";
import type { ViewMode } from "@/features/showroom/types";

const OPTIONS = [
  { value: "exterior", label: "بیرون", Icon: DirectionsCarFilledOutlined },
  { value: "interior", label: "کابین", Icon: AirlineSeatReclineNormalOutlined },
] as const satisfies readonly { value: ViewMode; label: string; Icon: unknown }[];

export function ViewModeToggle() {
  const mode = useShowroomStore(selectViewMode);
  const enterInterior = useShowroomStore((state) => state.enterInterior);
  const exitInterior = useShowroomStore((state) => state.exitInterior);

  const handleChange = (_: MouseEvent<HTMLElement>, next: ViewMode | null) => {
    if (next === "interior") enterInterior();
    if (next === "exterior") exitInterior();
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={mode}
      onChange={handleChange}
      aria-label="حالت نمایش"
      className="rounded-full bg-graphite/90 p-1 shadow-lg backdrop-blur"
    >
      {OPTIONS.map(({ value, label, Icon }) => (
        <ToggleButton
          key={value}
          value={value}
          className="gap-1.5 rounded-full border-0 px-4 py-1.5 text-sm font-semibold text-cyc-deep transition-colors hover:bg-paper/10 aria-pressed:bg-giallo aria-pressed:text-graphite"
        >
          <Icon fontSize="small" />
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
