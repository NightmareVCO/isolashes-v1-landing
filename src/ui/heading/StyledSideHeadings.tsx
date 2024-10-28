export interface StyledSideHeadingProperties {
  className?: string;
  normalText: string;
  styledText: string;
}

export default function StyledSideHeading({
  className,
  normalText,
  styledText,
}: StyledSideHeadingProperties) {
  return (
    <h3 className={`text-xl tracking-widest text-center ${className}`}>
      {normalText}{" "}
      <span className="tracking-widest text-secondary">{styledText}</span>
    </h3>
  );
}
