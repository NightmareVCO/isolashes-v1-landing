import { getSessionUser } from "@data/auth.data";
import { getProductById, getProducts } from "@data/products.data";
import { Divider } from "@nextui-org/react";
import AddQuantity from "@ui/buttons/AddQuantity";
import StyledSideHeading from "@ui/heading/StyledSideHeadings";
import ProductList from "@ui/products/ProductList";
import ProductsImages from "@ui/products/ProductsImages";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function useSingleProduct({ slug }: any) {
  const product = await getProductById(slug);
  const user = await getSessionUser();

  const products = await getProducts({
    order: "createdAt",
    orderDirection: "asc",
    takeValue: 4,
    skipValue: 0,
    cursor: "",
    status: "",
    where: "productCategory",
    whereValue: product.productCategory.name,
    query: "",
  });

  return {
    user,
    product,
    products,
  };
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function SingleProductPage({ params }: any) {
  const { slug } = params;
  const { user, product, products } = await useSingleProduct({ slug });

  return (
    <section className="relative flex flex-col px-4 mt-8 gap-y-32 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* IMG */}
      <div className="flex flex-col gap-16 lg:flex-row">
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductsImages images={product.productImage} />
        </div>
        {/* TEXTS */}
        <div className="flex flex-col w-full gap-6 lg:w-1/2">
          <h1 className="text-4xl font-medium">{product.name}</h1>
          <p className="text-lg text-gray-500">
            {product.description} - {product.productCategory.name}
          </p>
          <Divider />
          {!product.isPromotion && (
            <h2 className="text-2xl font-medium">RD${product.price}</h2>
          )}

          {product.isPromotion && (
            <div className="flex items-center gap-4">
              <h3 className="text-xl text-gray-500 line-through">
                RD${product.price}
              </h3>
              <h2 className="text-2xl font-medium text-red-500">
                RD${product.promotionPrice}
              </h2>
            </div>
          )}
          <Divider />
          <AddQuantity
            productId={product.id}
            stockNumber={product.stock || 0}
            user={user}
          />
          <Divider />

          <div className="flex flex-col items-start justify-start gap-y-6">
            <div className="flex flex-col gap-y-3">
              <h4 className="font-medium">INFORMACIÓN DE PRODUCTOS</h4>
              <p className="text-pretty">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus, repellat. Voluptate facilis, quo at, asperiores
                repudiandae similique incidunt libero tempora odit iste nostrum
                ab neque cupiditate. Natus aut distinctio quo.
              </p>
            </div>
            <div className="flex flex-col gap-y-3">
              <h4 className="font-medium">DEVOLUCIONES Y REEMBOLSOS</h4>
              <p className="text-pretty">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus, repellat. Voluptate facilis, quo at, asperiores
                repudiandae similique incidunt libero tempora odit iste nostrum
                ab neque cupiditate. Natus aut distinctio quo.
              </p>
            </div>
            <div className="flex flex-col gap-y-3">
              <h4 className="font-medium">INFORMACIÓN DE ENVIO</h4>
              <p className="text-pretty">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus, repellat. Voluptate facilis, quo at, asperiores
                repudiandae similique incidunt libero tempora odit iste nostrum
                ab neque cupiditate. Natus aut distinctio quo.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* SIMILAR */}
      <div className="flex flex-col">
        <StyledSideHeading normalText="PRODUCTOS" styledText="RELACIONADOS" />
        <ProductList products={products} user={user} />
      </div>
    </section>
  );
}
