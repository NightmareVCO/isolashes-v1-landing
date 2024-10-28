"use client";

import { Icon as Iconify } from "@iconify/react";

type IconProperties = {
  icon: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function Icon({
  icon,
  width,
  height,
  className,
  style,
}: IconProperties) {
  return (
    <Iconify
      icon={icon}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
}
