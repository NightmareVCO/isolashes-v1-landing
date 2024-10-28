import { heroInfo } from "@infos/mainPage/hero.info";
import StyledButton from "@ui/buttons/StyledButton";

export default function HeroSection() {
  return (
    <section className="flex items-center justify-center bg-hero min-h-[600px] min-w-screen bg-no-repeat bg-cover">
      <h1 className="text-white sr-only">{heroInfo.title}</h1>
      <h2 className="text-white sr-only">{heroInfo.subtitle}</h2>
      <div className="flex items-center justify-start w-full">
        <div className="flex flex-col items-start max-w-5xl px-6 lg:ml-[5%] gap-y-8">
          <div>
            <h1 className="text-2xl tracking-wider text-center text-white lg:text-center">
              {heroInfo.titleHero}
            </h1>
            <div className="flex items-start justify-start">
              <h2 className=" leading-[110px] text-white text-7xl mt-14 mb-5 text-center lg:leading-none lg:text-8xl font-sunydale">
                {heroInfo.subtitleHero}
              </h2>
            </div>
            {/* <div className="max-w-[300px] lg:max-w-[700px]">
              <p className={`${subtitle()} text-pretty`}>
                {heroInfo.description}
              </p>
            </div> */}
          </div>
          <div className="flex items-center justify-center w-full lg:items-start lg:justify-center">
            <StyledButton className="text-white" href={heroInfo.buttonHref}>
              {heroInfo.buttonText}
            </StyledButton>
          </div>
        </div>
      </div>
    </section>
  );
}
