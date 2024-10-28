import { aboutHistoryInfo } from "@infos/aboutUsPage/aboutHistorySection.info";
import { useEffect, useState } from "react";

export default function useAboutHistorySection() {
  const [imageSource, setImageSource] = useState(aboutHistoryInfo[0].imageSrc);
  const [activeItem, setActiveItem] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((currentActiveItem) => {
        const nextActiveItem =
          currentActiveItem >= aboutHistoryInfo.length
            ? 1
            : currentActiveItem + 1;
        setImageSource(aboutHistoryInfo[nextActiveItem - 1].imageSrc);
        return nextActiveItem;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return { imageSource, setImageSource, activeItem, setActiveItem };
}
