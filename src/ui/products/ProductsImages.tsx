"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageProperties = {
  images: {
    id: string;
    url: string;
  }[];
};

export default function ProductsImages({ images }: ProductImageProperties) {
  const [index, setIndex] = useState(0);

  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={images[index].url}
          alt="Imagen del Producto"
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {images.map((image: any, index: number) => (
          <div
            className="relative w-1/4 h-32 gap-4 mt-8 cursor-pointer"
            key={image.id}
            onClick={() => setIndex(index)}
          >
            <Image
              src={image.url}
              alt="Imagen del Producto"
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
