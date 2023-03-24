import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";

interface Media {
  file: {
    data: {
      id: string;
      attributes: {
        url: string;
        name: string;
        alternativeText: string;
      };
    };
  };
}

export default function Media({ data }: { data: Media }) {
  const imgUrl = getStrapiMedia(data.file.data.attributes.url);
  return (
    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
      <Image
        src={imgUrl || ""}
        alt={data.file.data.attributes.alternativeText || "none provided"}
        className="object-contain w-full h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 "
        width={600}
        height={600}
      />
    </div>
  );
}
