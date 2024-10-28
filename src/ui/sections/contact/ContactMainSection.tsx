import {
  contactMainSectionInfo,
  locationsInfo,
} from "@infos/contactPage/contactMainSection.info";
import StyledSideHeading from "@ui/heading/StyledSideHeadings";
import Icon from "@ui/icon/Icon";

export default function ContactMainSection() {
  return (
    <section className="flex flex-col items-center justify-center gap-y-4">
      <StyledSideHeading
        normalText={contactMainSectionInfo.normalText}
        styledText={contactMainSectionInfo.styledText}
      />

      <div className="flex flex-col lg:flex-row flex-wrap justify-center pt-20 item-center px-4 lg:px-0 gap-x-40 gap-y-20 lg:min-w-[1200px] w-full">
        {locationsInfo.map((location) => (
          <div
            key={location.name}
            className="flex flex-col items-center lg:items-start justify-center ml-16 lg:ml-0 gap-y-6"
          >
            <div>
              <div className="flex gap-x-8">
                <Icon
                  icon="solar:home-linear"
                  width={28}
                  height={28}
                  className="-ml-16 text-primary"
                />
                <span className="text-xl font-semibold ">
                  {contactMainSectionInfo.branch}
                </span>
              </div>
              <h3 className="text-xl min-w-80">{location.name}</h3>
            </div>

            <div>
              <div className="flex gap-x-8">
                <Icon
                  icon="solar:map-point-add-linear"
                  width={28}
                  height={28}
                  className="-ml-16 text-primary"
                />
                <span className="text-xl font-semibold">
                  {contactMainSectionInfo.address}
                </span>
              </div>
              <h3 className="text-xl text-pretty min-w-80">
                {location.address}
              </h3>
            </div>

            <div>
              <div className="flex gap-x-8">
                <Icon
                  icon="solar:phone-rounded-linear"
                  width={28}
                  height={28}
                  className="-ml-16 text-primary"
                />
                <span className="text-xl font-semibold ">
                  {contactMainSectionInfo.phone}
                </span>
              </div>
              <h3 className="text-xl min-w-80">{location.phone}</h3>
            </div>

            <div>
              <div className="flex gap-x-8">
                <Icon
                  icon="solar:mailbox-linear"
                  width={28}
                  height={28}
                  className="-ml-16 text-primary"
                />
                <span className="text-xl font-semibold ">
                  {contactMainSectionInfo.email}
                </span>
              </div>
              <h3 className="text-xl min-w-80">{location.email}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
