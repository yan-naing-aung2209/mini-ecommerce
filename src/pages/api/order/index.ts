// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CartItem } from "@/types/cart";
import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { Order, OrderLine, Status } from "../../../../generated/prisma/client";

type ReturnType = {
  msg: string;
  data?: Order[] | OrderLine[];
};

enum HttpMethod {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}
const handler = async (req: NextApiRequest, res: NextApiResponse<ReturnType>) => {
  const method = req.method;

  //GET
  if (method === HttpMethod.get) {
    const orders = await prisma.order.findMany();
    return res.status(200).json({ msg: "success", data: orders });
  }
  //POST
  if (method === HttpMethod.post) {
    const orderList: CartItem[] = req.body;

    if (!orderList.length) return res.status(400).json({ msg: "Bad Requset" });

    const totalPrice = orderList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.product.price * currentValue.Qty,
      0,
    );

    const order = await prisma.order.create({
      data: { total: totalPrice, status: Status.ORDERED },
    });

    const orderId = order.id;

    const data = orderList.map((singleOrder) => ({
      order_id: orderId,
      product_id: singleOrder.product.id,
      qty: singleOrder.Qty,
    }));

    const orderLines = await prisma.orderLine.createManyAndReturn({ data });

    return res.status(200).json({ msg: "success", data: orderLines });
  }
  res.status(405).json({ msg: "Method Not Allowed" });
};

export default handler;
