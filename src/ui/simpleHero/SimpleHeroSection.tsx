import Link from "next/link";

type SimpleHeroSection = {
  title: string;
  home: string;
  homeRef: string;
  separation: string;
  section: string;
  sectionRef: string;
};

export default function SimpleHeroSection({
  title,
  home,
  homeRef,
  separation,
  section,
  sectionRef,
}: SimpleHeroSection) {
  return (
    <section className="flex justify-center h-56 bg-no-repeat bg-cover bg-simpleHero">
      <div className="flex flex-col items-center justify-center w-2/3 gap-y-4">
        <h1 className="text-5xl font-bold text-center leading-[48px]">
          {title}
        </h1>
        <div className="flex items-center gap-x-3">
          <Link href={homeRef} className="text-2xl font-light">
            {home}
          </Link>
          <p className="text-xl font-light">{separation}</p>
          <Link
            href={sectionRef}
            className="text-2xl font-light text-secondary"
          >
            {section}
          </Link>
        </div>
      </div>
    </section>
  );
}
