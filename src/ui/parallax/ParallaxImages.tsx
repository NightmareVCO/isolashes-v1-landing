"use client";

import Parallax from "parallax-js";
import { ReactNode, useEffect } from "react";

interface ParallaxImagesProperties {
  children: ReactNode;
  sceneClass: string;
}

export default function ParallaxImages({
  children,
  sceneClass,
}: ParallaxImagesProperties) {
  useEffect(() => {
    const scene = document.querySelector(`${sceneClass}`) as HTMLElement;
    new Parallax(scene, {
      relativeInput: true,
      limitX: 50,
      limitY: 100,
      scalarX: 2,
      scalarY: 6,
    });
  }, [sceneClass]);

  return (
    <div
      className={`relative z-20 hidden ${sceneClass.replace(/^\./, "")} lg:block`}
    >
      <div data-depth="0.4">{children}</div>
    </div>
  );
}
