import { ScrollShadow } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

type CategoryListProperties = {
  categories: any[];
};

export default function CategoryList({ categories }: CategoryListProperties) {
  console.log(categories);
  return (
    <div className="px-4 pt-6 overflow-x-scroll scrollbar-hide">
      <ScrollShadow
        className="flex gap-4 md:gap-8 scrollbar-hide"
        orientation="horizontal"
      >
        {categories &&
          categories.length > 0 &&
          categories.map((category, index) => (
            <Link
              key={index}
              href={`/tienda/productos?category=${category.name}`}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            >
              <div className="relative w-full rounded-lg bg-slate-100 h-96">
                <Image
                  src={category?.cover || "/placeholder.webp"}
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover rounded-lg"
                />
              </div>
              <h2 className="mt-8 text-xl font-medium tracking-wide text-center">
                {category.name}
              </h2>
            </Link>
          ))}
      </ScrollShadow>
    </div>
  );
}
