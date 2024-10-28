import type { SVGProps } from "react";
import React from "react";

export function CheckIcon(properties: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15rem"
      height="15rem"
      viewBox="0 0 24 24"
      {...properties}
    >
      <g fill="none" stroke="#009600" strokeWidth={0.8}>
        <circle cx={12} cy={12} r={10}></circle>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.5 12.5l2 2l5-5"
        ></path>
      </g>
    </svg>
  );
}
