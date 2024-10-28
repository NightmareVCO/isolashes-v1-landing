import { checkoutConfig } from "@config/site";
import { getSessionUser } from "@data/auth.data";
import { getUserAddress } from "@data/userAddress.data";
import { getUserCart } from "@data/userCart";
import CheckOutForm from "@forms/CheckOutForm";
import { Divider } from "@nextui-org/react";
import { CheckOutCard } from "@ui/cards/CheckOutCard";
import StyledSideHeading from "@ui/heading/StyledSideHeadings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: checkoutConfig.title,
  description: checkoutConfig.description,
};

export default async function CheckOutPage() {
  const user: any = await getSessionUser();
  const cart = await getUserCart({
    userId: user?.id,
    cartId: user?.shoppingCart?.id,
  });
  const userAddress = await getUserAddress(user?.id);

  return (
    <section className="flex flex-col lg:flex-row max-h-[calc(100vh_-_110px)] overflow-y-hidden">
      <div className="px-4 pt-8 pb-4 overflow-y-scroll flex-4 gap-y-32 md:px-8">
        <StyledSideHeading normalText="CARRITO" styledText="DE COMPRA" />
        <CheckOutForm userAddress={userAddress} user={user} cart={cart} />
      </div>

      <div className="flex-col hidden px-4 pt-8 pb-4 overflow-y-scroll flex-2 bg-grayBackground gap-y-4 lg:flex">
        <StyledSideHeading normalText="RESUMEN" styledText="DE ORDEN" />
        {cart &&
          cart?.totalPricePerItem?.length > 0 &&
          cart.totalPricePerItem.map((item: any) => (
            <CheckOutCard key={item.id} item={item} user={user} />
          ))}
        <Divider />
        <div className="flex items-center justify-between px-4">
          <h2 className="text-xl font-medium">Total</h2>
          <h2 className="text-lg font-medium">RD$ {cart?.totalPrice || 0}</h2>
        </div>
      </div>
    </section>
  );
}
