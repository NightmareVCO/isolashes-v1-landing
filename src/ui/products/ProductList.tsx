import { Chip } from "@nextui-org/react";
import AddToCart from "@ui/buttons/AddToCart";
import Image from "next/image";
import Link from "next/link";

type ProductListProperties = {
  products: any;
  user: any;
};

export default function ProductList({ products, user }: ProductListProperties) {
  const allProducts = products.products;

  return (
    <section className="flex flex-wrap items-center justify-center mt-8 lg:justify-between gap-x-8 gap-y-16">
      {allProducts.length > 0 &&
        allProducts.map((product: any, index: any) => (
          <div
            key={index}
            className="full flex flex-col gap-4 min-w-[300px] lg:min-w-[265px] sm:w-[45] lg:w-[22%]"
          >
            <Link
              href={`/tienda/productos/${product.id}`}
              className="flex flex-col w-full gap-4"
            >
              <div className="relative w-full h-80">
                <Image
                  src={product.productImage[0]?.url}
                  alt={product.name}
                  fill
                  sizes="25vw"
                  className="absolute z-10 object-cover transition-opacity duration-500 rounded-none hover:opacity-0"
                />
                {product.isNew && (
                  <Chip
                    size="md"
                    color="primary"
                    className="absolute z-20 text-white left-3 top-3"
                  >
                    Nuevo
                  </Chip>
                )}
                {product.isPromotion && (
                  <Chip
                    size="md"
                    color="danger"
                    className="absolute z-20 text-white right-3 top-3"
                  >
                    Oferta
                  </Chip>
                )}
                <Image
                  src={product.productImage[1]?.url}
                  alt=""
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-none "
                />
              </div>
              <div className="flex flex-col justify-start lg:justify-between lg:flex-row">
                <span className="text-lg font-medium">{product.name}</span>
                {product.isPromotion ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-gray-500 line-through">
                      RD${product.price}
                    </span>
                    <span className="text-lg font-semibold text-red-500">
                      RD${product.promotionPrice}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-semibold">
                    RD${product.price}
                  </span>
                )}
              </div>
              <div className="text-base text-default-600">
                {product.description}
              </div>
            </Link>
            {user && (
              <AddToCart
                userId={user.id}
                quantity={1}
                cartId={user.shoppingCart.id}
                productId={product.id}
              />
            )}
            {!user && <AddToCart />}
          </div>
        ))}
    </section>
  );
}
