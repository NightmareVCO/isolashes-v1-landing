"use client";

import { useCartStore } from "@hooks/useCartStore";
import { cartInfo } from "@infos/cart/cart.info";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

type AddToCartProperties = {
  userId?: string;
  productId?: string;
  cartId?: string;
  quantity?: number;
};

export default function AddToCart({
  userId,
  productId,
  cartId,
  quantity,
}: AddToCartProperties) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();

  return (
    <>
      {userId && productId && cartId && quantity && (
        <Button
          color="primary"
          size="md"
          radius="full"
          variant="ghost"
          className="w-max"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => addItem({ userId, productId, cartId, quantity })}
        >
          <span className={`text-medium ${isHovered ? "text-white" : ""}`}>
            {cartInfo.add}
          </span>
        </Button>
      )}
      {!userId && !productId && !cartId && !quantity && (
        <Button
          color="primary"
          size="md"
          radius="full"
          variant="ghost"
          className="w-max"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link href="/login">
            <span className={`text-medium ${isHovered ? "text-white" : ""}`}>
              {cartInfo.add}
            </span>
          </Link>
        </Button>
      )}
    </>
  );
}
