import {
  addProductToShoppingCart,
  clearShoppingCart,
  getTotalPricePerItemAndTotalPriceFromShoppingCart,
  removeProductFromShoppingCart,
} from "@data/cart.data";
import { create } from "zustand";

type CartState = {
  cart: any;
  isLoading: boolean;
  counter: number;
  getCart: ({ userId, cartId }: any) => void;
  addItem: ({ userId, productId, cartId, quantity }: any) => void;
  removeItem: ({ userId, cartId, itemId }: any) => void;
  clearCart: ({ userId, cartId }: any) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: true,
  counter: 0,
  getCart: async ({ userId, cartId }) => {
    try {
      const cart = await getTotalPricePerItemAndTotalPriceFromShoppingCart(
        userId,
        cartId,
      );
      set({
        cart: cart || [],
        isLoading: false,
        counter: cart?.totalDifferentItems,
      });
    } catch {
      set((previous) => ({ ...previous, isLoading: false }));
    }
  },
  addItem: async ({ userId, productId, cartId, quantity }) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await addProductToShoppingCart({
      userId,
      productId,
      cartId,
      quantity,
    });
    set({
      cart: response?.data,
      counter: response?.data?.totalDifferentItems,
      isLoading: false,
    });
  },
  removeItem: async ({ userId, cartId, itemId }) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await removeProductFromShoppingCart(
      userId,
      cartId,
      itemId,
    );

    set({
      cart: response?.data,
      counter: response?.data?.totalDifferentItems,
      isLoading: false,
    });
  },
  clearCart: async ({ userId, cartId }) => {
    set((state) => ({ ...state, isLoading: true }));
    await clearShoppingCart(userId, cartId);

    set({
      cart: [],
      counter: 0,
      isLoading: false,
    });
  },
}));
