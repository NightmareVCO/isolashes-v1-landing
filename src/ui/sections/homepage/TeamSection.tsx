import { teamInfo, teamPersonal } from "@infos/mainPage/team.info";
import StyledHeading from "@ui/heading/StyledHeading";
import Image from "next/image";

export default function TeamSection() {
  return (
    <section className="flex flex-col items-center justify-center gap-y-9">
      <StyledHeading
        normalText={teamInfo.normalText}
        styledText={teamInfo.styledText}
      />

      <div className="flex flex-col items-center justify-center w-full p-10 lg:flex-row gap-14 bg-grayBackground">
        {teamPersonal.map((person, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-8 min-w-[350px] w-[380px] lg:w-[420px] min-h-[500px] bg-white shadow-lg gap-y-6"
          >
            <Image
              src={person.imageSrc}
              alt="personal"
              width={235}
              height={255}
              className="transition hover:scale-95"
            />
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-2xl">{person.name}</h3>
              <p className="text-pretty text-secondary">{person.role}</p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-xl font-light text-center text-pretty max-w-80">
                {person.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
