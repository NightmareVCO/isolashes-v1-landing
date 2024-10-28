import LineIcon from "@icons/decoration/Line";

export interface StyledHeadingProperties {
  className?: string;
  normalText: string;
  styledText: string;
}

export default function StyledHeading({
  className,
  normalText,
  styledText,
}: StyledHeadingProperties) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className={`text-center text-5xl font-medium  ${className}`}>
        {normalText} {styledText}
      </h3>
      <LineIcon className="h-3 mt-3" />
    </div>
  );
}

// <div className="flex flex-col items-center justify-center">
//   <h3 className={`text-center text-7xl ${className}`}>
//     {normalText} <span className="text-secondary">{styledText}</span>
//   </h3>
//   <LineIcon className="h-3" />
//   {/* <Divider className="h-1 w-96" /> */}
// </div>
