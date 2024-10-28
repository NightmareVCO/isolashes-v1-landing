import { useCartStore } from "@hooks/useCartStore";
import { useEffect } from "react";

export default function useCartModel({ user }: any) {
  const { cart, getCart, isLoading, removeItem, clearCart } = useCartStore();
  useEffect(() => {
    getCart({ userId: user?.id, cartId: user?.shoppingCart?.id });
  }, [user, getCart]);

  return { cart, isLoading, removeItem, clearCart };
}
