import { aboutUsStoreBannerInfo } from "@infos/aboutUsPage/aboutUsStoreBanner.info";
import StyledButton from "@ui/buttons/StyledButton";

export default function AboutUsStoreBanner() {
  return (
    <div className="relative min-h-[420px] w-full mb-32 bg-grayBackground flex items-center justify-center">
      <section className="absolute w-[90%] top-24 flex flex-col items-center justify-center mx-3 md:mx-10 lg:mx-20 bg-no-repeat bg-cover min-h-[420px] gap-y-6 bg-simpleHero">
        <h3 className="text-3xl font-medium text-center md:text-4xl lg:text-6xl">
          {aboutUsStoreBannerInfo.title1}
        </h3>
        <h3 className="text-3xl font-medium text-center md:text-4xl lg:text-6xl">
          {aboutUsStoreBannerInfo.title2}
        </h3>
        <StyledButton href={aboutUsStoreBannerInfo.buttonHref}>
          {aboutUsStoreBannerInfo.buttonText}
        </StyledButton>
      </section>
    </div>
  );
}
