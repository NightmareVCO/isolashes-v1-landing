import { storeHeroSectionInfo } from "@infos/storePage/storeHeroSection.info";
import StyledButton from "@ui/buttons/StyledButton";
import Image from "next/image";

export default function StoreHeroSection() {
  return (
    <section className="justify-between hidden h-72 bg-brandPink/70 sm:flex">
      <div className="flex flex-col items-center justify-center w-2/3 gap-8">
        <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
          {storeHeroSectionInfo.titlePartOne}
          <br /> {storeHeroSectionInfo.titlePartTwo}
        </h1>
        <StyledButton className="text-white" href="">
          {storeHeroSectionInfo.buttonText}
        </StyledButton>
      </div>
      <div className="relative w-1/3">
        <Image
          src={storeHeroSectionInfo.img}
          alt="Modelo"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}
