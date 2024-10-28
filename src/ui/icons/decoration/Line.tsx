export interface LineIconProperties {
  className?: string;
}

export default function LineIcon({ className }: LineIconProperties) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 939 117"
    >
      <path
        stroke="#C19843"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="35"
        d="m15 41 7.6097-5.3164C61.682 8.38657 113.819 9.08069 152.151 37.4082l56.711 41.9105c36.852 27.2333 86.65 29.0233 125.362 4.5063l74.997-47.4984c34.375-21.7709 77.907-22.9888 113.446-3.1738l97.338 54.2719c40.07 22.3413 89.757 17.7293 125.03-11.6056l36.135-30.0516c32.889-27.3518 78.568-33.3714 117.42-15.4734L924 42"
      />
    </svg>
  );
}
