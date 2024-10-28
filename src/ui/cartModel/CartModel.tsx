"use client";

import useCartModel from "@hooks/useCartModel";
import { Icon } from "@iconify/react/dist/iconify.js";
import { modalCartInfo } from "@infos/cart/modalCart.info";
import {
  Badge,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  // Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import CartSkeleton from "../skeleton/CartSkeleton";

type CartModelProperties = {
  user: any;
};

export default function CartModel({ user }: CartModelProperties) {
  const { cart, isLoading, removeItem, clearCart } = useCartModel({ user });

  return (
    <section className="hidden lg:block">
      <Dropdown radius="none" shadow="lg" placement="bottom-end">
        <Badge
          className="hidden lg:flex"
          isOneChar
          size="md"
          color="danger"
          content={cart.totalDifferentItems || 0}
          shape="circle"
          showOutline={false}
        >
          <DropdownTrigger>
            <Icon
              icon={"solar:bag-4-linear"}
              width={30}
              height={30}
              className="transition hover:scale-110"
            />
          </DropdownTrigger>
        </Badge>
        <DropdownMenu
          aria-label="Cart Actions"
          variant="flat"
          className="min-w-[380px] "
          itemClasses={{
            base: "cursor-default",
          }}
        >
          <DropdownItem key="cart" isReadOnly className="">
            <p className="text-lg text-center">{modalCartInfo.title}</p>
            {/* <Divider /> */}
          </DropdownItem>
          <DropdownSection className="max-h-[450px] overflow-y-auto">
            {isLoading ? (
              <DropdownItem isReadOnly>
                <CartSkeleton quantity={cart.totalDifferentItems} />
              </DropdownItem>
            ) : cart && cart?.totalPricePerItem?.length > 0 ? (
              cart.totalPricePerItem.map((item: any) => (
                <DropdownItem isReadOnly className="mt-3" key={item.id}>
                  <div className="flex items-center justify-between gap-x-4">
                    <Link href={`/tienda/productos/${item.product.id}`}>
                      <Image
                        src={
                          item.product.productImage[0].url ||
                          "/placeholder.webp"
                        }
                        alt={item.product.name || "Imagen del producto"}
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                    </Link>
                    <div className="flex flex-col items-start justify-start w-full h-full min-w-20 min-h-20 flex-2">
                      <div className="flex items-center justify-between w-full">
                        <h3 className="text-base font-medium">
                          {item.product.name || "Nombre del producto"}
                        </h3>
                        {item.product.isPromotion && (
                          <p className="text-red-500">RD$ {item.totalPrice}</p>
                        )}
                        {!item.product.isPromotion && (
                          <p>RD$ {item.totalPrice}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-default-400">
                          {item.quantity <= item.product.stock ? (
                            modalCartInfo.available
                          ) : (
                            <span className="text-red-400">
                              {modalCartInfo.outStock}
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center justify-between w-full mt-3">
                        <p className="text-default-400">
                          {modalCartInfo.quantity}: {item.quantity}
                        </p>
                        <button
                          className="text-red-400"
                          onClick={() =>
                            removeItem({
                              userId: user.id,
                              cartId: user.shoppingCart.id,
                              itemId: item.id,
                            })
                          }
                        >
                          {modalCartInfo.delete}
                        </button>
                      </div>
                    </div>
                  </div>
                </DropdownItem>
              ))
            ) : (
              <DropdownItem isReadOnly>
                <div>{modalCartInfo.isEmpty}</div>
              </DropdownItem>
            )}
          </DropdownSection>
          {/* subbtotal */}
          <DropdownItem isReadOnly>
            <Divider />
            <div className="flex flex-col items-center justify-between w-full mt-3 gap-y-1">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-base font-medium">
                  {modalCartInfo.subtotal}
                </h3>
                <p className="text-lg font-medium">RD$ {cart.totalPrice}</p>
              </div>
              <div className="w-full">
                <p className="text-start text-default-400">
                  {modalCartInfo.note}
                </p>
              </div>
            </div>
          </DropdownItem>
          {/* checkout */}
          <DropdownItem isReadOnly>
            <div className="flex items-center justify-between">
              <Button
                variant="bordered"
                color="danger"
                radius="none"
                size="md"
                onPress={() =>
                  clearCart({ userId: user.id, cartId: user.shoppingCart.id })
                }
              >
                <span className="text-base ">{modalCartInfo.emptyCart}</span>
              </Button>
              <Button color="primary" radius="none" size="md">
                <Link href="/tienda/checkout">
                  <span className="text-base text-white">
                    {modalCartInfo.checkout}
                  </span>
                </Link>
              </Button>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </section>
  );
}
