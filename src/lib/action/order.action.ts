"use server";

import { fetchPatchRequest, fetchPostRequest } from "@utils/fetchRequest";
import { revalidatePath } from "next/cache";

export const processOrder = async (previousState: any, formData: any) => {
  const {
    id,
    userName,
    userPhone,
    userEmail,
    address,
    total,
    branchId,
    cartItems,
  } = Object.fromEntries(formData);

  const realCart = JSON.parse(cartItems);
  console.log(realCart.totalPricePerItem);
  const products = realCart.totalPricePerItem.map((item: any) => ({
    id: item.product.id,
    quantity: item.quantity,
    price: item.price,
    isPromotion: item.isPromotion,
    promotionPrice: item.promotionPrice,
  }));

  const orderData = {
    user: id,
    userName,
    userPhone,
    userEmail,
    address,
    products: JSON.stringify(products),
    total: +total,
    delivered: false,
    completed: false,
    dateOrdered: new Date().toISOString(),
    dateDelivered: null,
    dateCompleted: null,
    inPlace: false,
  };

  const receiptData = {
    user: id,
    userName,
    userPhone,
    userEmail,
    total: +total,
    paymentMethod: "tarjeta",
    branchId,
    inPlace: true,
    date: new Date().toISOString(),
  };

  const orderUrl = `${process.env.SERVER}/orders`;
  const receiptUrl = `${process.env.SERVER}/receipt`;
  const joinOrderReceiptUrl = `${process.env.SERVER}/orders/receipt`;
  const headers = { "user-id": id };

  try {
    const order = await fetchPostRequest({
      url: orderUrl,
      data: orderData,
      headers,
    });
    console.log({ order });
    console.log(order.data.message);

    const receipt = await fetchPostRequest({
      url: receiptUrl,
      data: receiptData,
      headers,
    });
    console.log({ receipt });

    await fetchPatchRequest({
      url: joinOrderReceiptUrl,
      data: {
        orderId: order.data.id,
        receiptId: receipt.data.id,
      },
      headers,
    });

    revalidatePath("/user");
    revalidatePath("/tienda/checkout");
  } catch (error) {
    throw new Error(`Error creando una orden: ${error}`);
  }
};
