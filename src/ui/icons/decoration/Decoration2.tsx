export interface Decoration1Properties {
  className?: string;
}

export default function Decoration2({ className }: Decoration1Properties) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 449 338"
    >
      <path
        fill="#C19843"
        fillRule="evenodd"
        d="M172.856.109704C100.356-.00529616 71.0769 30.0717 58.6919 43.7507 20.1689 86.2997-7.05608 179.421 1.95291 237.822 12.9769 309.289 75.507 346.688 157.5 335.861c184.596-24.375 306.198-141.484 289.276-196.339-9.414-30.517-36.71-47.4533-88.776-61.7103-37.74-10.334-52.788-17.597-72.837-35.154C258.944 19.6977 222.938.188704 172.856.109704Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
