"use client";

import { modalCartInfo } from "@infos/cart/modalCart.info";
import { Card } from "@nextui-org/react";
import useCartModel from "@ui/hooks/useCartModel";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CheckOutCard({ item, user }: any) {
  const { removeItem } = useCartModel({ user });
  const router = useRouter();

  return (
    <Card shadow="none" fullWidth key={item.id} className="min-h-[116px]">
      <div className="flex items-center justify-between gap-x-4">
        <Link href={`/tienda/productos/${item.product.id}`}>
          <Image
            src={item.product.productImage[0].url || "/placeholder.webp"}
            alt={item.product.name || "Imagen del producto"}
            width={100}
            height={100}
            className="rounded-lg"
          />
        </Link>
        <div className="flex flex-col items-start justify-start w-full h-full px-3 py-4 min-w-20 min-h-20 flex-2">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-base font-medium">
              {item.product.name || "Nombre del producto"}
            </h3>
            {item.product.isPromotion && (
              <p className="text-red-500">RD$ {item.totalPrice}</p>
            )}
            {!item.product.isPromotion && <p>RD$ {item.totalPrice}</p>}
          </div>
          <div>
            <p className="text-default-400">
              {item.quantity <= item.product.stock ? (
                modalCartInfo.available
              ) : (
                <span className="text-red-400">{modalCartInfo.outStock}</span>
              )}
            </p>
          </div>

          <div className="flex items-center justify-between w-full mt-3">
            <p className="text-default-400">
              {modalCartInfo.quantity}: {item.quantity}
            </p>
            <button
              className="text-red-400"
              onClick={() => {
                removeItem({
                  userId: user.id,
                  cartId: user.shoppingCart.id,
                  itemId: item.id,
                });
                router.refresh();
              }}
            >
              {modalCartInfo.delete}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
