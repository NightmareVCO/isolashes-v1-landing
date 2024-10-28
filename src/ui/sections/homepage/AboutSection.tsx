import { aboutInfo } from "@infos/mainPage/about.info";
import StyledButton from "@ui/buttons/StyledButton";
import LineIcon from "@ui/icons/decoration/Line";
import ParallaxBackground from "@ui/parallax/Parallax";
import Image from "next/image";

import StyledSideHeading from "@/ui/heading/StyledSideHeadings";

export default function AboutSection() {
  return (
    <section className="flex flex-col h-[500px] max-w-full mx-auto lg:flex-row gap-x-12">
      <div className="relative flex-1 hidden lg:block">
        <ParallaxBackground />
        <div className="absolute ml-52 mt-32 z-10 min-h-[500px]">
          <Image
            src={aboutInfo.image1.src}
            alt={aboutInfo.image1.alt}
            height={507}
            width={390}
          />
        </div>
        <div className="absolute bottom-24">
          <Image
            src={aboutInfo.image2.src}
            alt={aboutInfo.image2.alt}
            height={507}
            width={390}
          />
        </div>
      </div>

      <div className="flex flex-col mx-6 items-center lg:items-start justify-center lg:flex-1 lg:w-[1200px] gap-y-5">
        <div className="flex flex-row items-center justify-center lg:hidden gap-x-6">
          <Image
            src={aboutInfo.image1.src}
            alt={aboutInfo.image1.alt}
            height={507}
            width={390}
            className="pb-4"
          />
          <Image
            src={aboutInfo.image2.src}
            alt={aboutInfo.image2.alt}
            height={455}
            width={300}
            className="hidden md:block"
          />
        </div>

        <StyledSideHeading
          normalText={aboutInfo.normalText}
          styledText={aboutInfo.styledText}
        />

        <h2 className="text-5xl font-medium text-center lg:text-start text-pretty">
          {aboutInfo.subtitle}
        </h2>
        <LineIcon className="h-2.5" />

        <p className="w-full my-2 text-lg lg:text-xl text-default-600 block min-w-[300px]  md:max-w-[600px]text-pretty">
          {aboutInfo.description}
        </p>
        <StyledButton className="text-white" href={aboutInfo.buttonHref}>
          {aboutInfo.buttonText}
        </StyledButton>
      </div>
    </section>
  );
}
