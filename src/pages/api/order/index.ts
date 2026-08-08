// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpMethod } from "@/types/backend/httpMethod";
import { CartItem } from "@/types/cart";
import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { Order, OrderLine, Status } from "../../../../generated/prisma/client";

type ReturnType = {
  msg: string;
  data?: [Order[] | Order, OrderLine[]];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ReturnType>) => {
  const method = req.method;

  //GET
  if (method === HttpMethod.get) {
    const orders = await prisma.order.findMany({ where: { isArchived: false } });
    if (!orders.length) return res.status(404).json({ msg: "Not Found" });
    const orderIds = orders.map((order) => order.id);
    const orderLines = await prisma.orderLine.findMany({ where: { order_id: { in: orderIds } } });
    if (!orderLines.length) return res.status(404).json({ msg: "Not Found" });
    return res.status(200).json({ msg: "success", data: [orders, orderLines] });
  }
  //POST
  if (method === HttpMethod.post) {
    const cartItems: CartItem[] = req.body;
    if (!cartItems.length) return res.status(400).json({ msg: "Bad Requset" });
    const cartProductIds = cartItems.map((cartItem) => cartItem.id);
    const cartProducts = await prisma.product.findMany({ where: { id: { in: cartProductIds } } });

    const productsWithQty: CartItem[] = cartProducts.map((p) => {
      const cartProduct = cartItems.find((item) => item.id === p.id);
      if (!cartProduct) throw new Error(`Product with id ${p.id} not found in cart items`);
      return { ...p, Qty: cartProduct.Qty };
    });

    const totalPrice = productsWithQty.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price * currentValue.Qty,
      0,
    );

    const order = await prisma.order.create({
      data: { total: totalPrice, status: Status.ORDERED },
    });
    const orderId = order.id;
    const data = productsWithQty.map((p) => ({ order_id: orderId, product_id: p.id, qty: p.Qty }));

    const orderLines = await prisma.orderLine.createManyAndReturn({ data });

    return res.status(200).json({ msg: "success", data: [order, orderLines] });
  }
  res.status(405).json({ msg: "Method Not Allowed" });
};

export default handler;
