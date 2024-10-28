"use client";

import Decoration1 from "@icons/decoration/Decoration1";
import Decoration2 from "@icons/decoration/Decoration2";
import Parallax from "parallax-js";
import { useEffect } from "react";

export default function ParallaxBackground() {
  useEffect(() => {
    const scene = document.querySelector(".scene") as HTMLElement;
    new Parallax(scene, {
      relativeInput: true,
      limitX: 50,
      limitY: 100,
      scalarX: 2,
      scalarY: 6,
    });
  }, []);
  return (
    <div className="relative hidden scene lg:block">
      <div data-depth="0.4">
        <Decoration1 className="size-[315px] opacity-50 mt-52 absolute left-[-65px]" />
      </div>
      <div data-depth="0.4">
        <Decoration2 className="size-[415px] opacity-50 pb-14 absolute left-[235px]" />
      </div>
    </div>
  );
}
