import { perksInfo } from "@infos/aboutUsPage/aboutPerksSection.info";
import Icon from "@ui/icon/Icon";

export default function AboutPerksSection() {
  return (
    <section className="flex flex-wrap justify-center gap-6 gap-x-14">
      {perksInfo.map((perk, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-2 min-w-[265px]"
        >
          <Icon icon={perk.icon} className="text-4xl text-primary" />
          <h4 className="text-2xl font-medium">{perk.title}</h4>
          <p className="text-lg">{perk.description}</p>
        </div>
      ))}
    </section>
  );
}
