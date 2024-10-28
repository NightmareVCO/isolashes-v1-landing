"use client";

import { cartInfo } from "@infos/cart/cart.info";
import { useState } from "react";

import AddToCart from "./AddToCart";

type AddQuantityProperties = {
  productId: string;
  stockNumber: number;
  user: any;
};

export function useAddQuantity({ stockNumber }: any) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((previous) => previous - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((previous) => previous + 1);
    }
  };

  // const { addItem, isLoading } = useCartStore();

  return { quantity, handleQuantity };
}

export default function AddQuantity({
  productId,
  stockNumber,
  user,
}: AddQuantityProperties) {
  const { quantity, handleQuantity } = useAddQuantity({ stockNumber });

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xl font-medium">{cartInfo.select}</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-between w-32 px-4 py-2 bg-gray-100 rounded-3xl">
            <button
              className="text-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="text-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("i")}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-lg">{cartInfo.outStock}</div>
          ) : (
            <div className="text-lg">
              {cartInfo.fewRest1}{" "}
              <span className="text-orange-500">
                {cartInfo.fewRest2} {stockNumber}
              </span>{" "}
              {cartInfo.fewRest3}
              <br /> {cartInfo.fewRest4}
            </div>
          )}
        </div>
        {user && (
          <AddToCart
            userId={user.id}
            productId={productId}
            cartId={user.shoppingCart.id}
            quantity={quantity}
          />
        )}
        {!user && <AddToCart />}
      </div>
    </div>
  );
}
