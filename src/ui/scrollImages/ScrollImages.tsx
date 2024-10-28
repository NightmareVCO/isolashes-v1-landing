"use client";

import Image from "next/image";
import Link from "next/link";

import ScrollingBanner from "./ScrollBanner";

type ScrollImagesProperties = {
  products: any[];
};

export default function ScrollImages({ products }: ScrollImagesProperties) {
  return (
    <section className="min-h-[300px]">
      {products?.length > 0 && (
        <ScrollingBanner
          showShadow={false}
          gap="0px"
          duration={200}
          shouldPauseOnHover={false}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-center min-h-[243px] min-w-[243px] transition text-foreground hover:scale-[0.95]"
            >
              <Link href={`/tienda/productos/${product.id}`}>
                <Image
                  src={product.productImage[0]?.url || "/placeholder.webp"}
                  alt="Images de Productos"
                  height={243}
                  width={243}
                />
              </Link>
            </div>
          ))}
        </ScrollingBanner>
      )}
    </section>
  );
}
