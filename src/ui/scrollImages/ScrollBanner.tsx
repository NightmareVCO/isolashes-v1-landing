"use client";

import type { ScrollShadowProps } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";
import { cn } from "@utils/cn";
import React from "react";

interface ScrollingBannerProperties
  extends React.HTMLAttributes<HTMLDivElement> {
  isReverse?: boolean;
  showShadow?: boolean;
  shouldPauseOnHover?: boolean;
  isVertical?: boolean;
  gap?: string;
  duration?: number; // in seconds
}

/*
  This example requires some changes to your TailwindCSS config:

  ```
  // tailwind.config.js or tailwind.config.ts
  module.exports = {
    // ...
  theme: {
      extend: {
        keyframes: {
          "scrolling-banner": {
            from: {transform: "translateX(0)"},
            to: {transform: "translateX(calc(-50% - var(--gap)/2))"},
          },
          "scrolling-banner-vertical": {
            from: {transform: "translateY(0)"},
            to: {transform: "translateY(calc(-50% - var(--gap)/2))"},
          },
        },
        animation: {
          "scrolling-banner": "scrolling-banner var(--duration) linear infinite",
          "scrolling-banner-vertical": "scrolling-banner-vertical var(--duration) linear infinite",
        },
      },
    },
  }
  ```
*/
const ScrollingBanner = React.forwardRef<
  HTMLDivElement,
  ScrollingBannerProperties
>(
  (
    {
      className,
      isReverse,
      isVertical = false,
      gap = "40rem",
      showShadow = true,
      shouldPauseOnHover = true,
      duration = 120,
      children,
      ...properties
    },
    reference,
  ) => {
    const shadowProperties: ScrollShadowProps = {
      isEnabled: showShadow,
      offset: -20,
      size: 300,
      orientation: isVertical ? "vertical" : "horizontal",
      visibility: "both",
    };

    return (
      <ScrollShadow
        {...properties}
        {...shadowProperties}
        ref={reference}
        className={cn(
          "flex",
          {
            "w-full": !isVertical,
            "overflow-y-hidden": isVertical,
            "overflow-x-hidden": !isVertical,
            "max-h-[calc(100vh_-_200px)]": isVertical,
          },
          className,
        )}
        style={{
          // @ts-expect-error TailwindCSS config is required
          "--gap": gap,
          "--duration": `${duration}s`,
        }}
      >
        <div
          className={cn("flex w-max items-stretch gap-[--gap]", {
            "flex-col": isVertical,
            "h-full": isVertical,
            "animate-scrolling-banner": !isVertical,
            "animate-scrolling-banner-vertical": isVertical,
            "[animation-direction:reverse]": isReverse,
            "hover:[animation-play-state:paused]": shouldPauseOnHover,
          })}
        >
          {React.Children.map(children, (child) =>
            React.cloneElement(child as any),
          )}
        </div>
      </ScrollShadow>
    );
  },
);

ScrollingBanner.displayName = "ScrollingBanner";

export default ScrollingBanner;
