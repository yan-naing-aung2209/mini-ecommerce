// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { Order, OrderLine } from "../../../../../generated/prisma/client";

type ReturnType = {
  msg: string;
  data?: [Order[], OrderLine[]];
};

enum HttpMethod {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}
const handler = async (req: NextApiRequest, res: NextApiResponse<ReturnType>) => {
  const method = req.method;
  const { id } = req.query;

  //GET
  if (method === HttpMethod.delete) {
    const order = await prisma.order.findFirst({ where: { id: Number(id) } });
    if (!order) return res.status(400).json({ msg: "Bad Request" });

    await prisma.order.update({ data: { isArchived: true }, where: { id: Number(id) } });

    const orders = await prisma.order.findMany({ where: { isArchived: false } });
    const orderIds = orders.map((order) => order.id);
    const orderLines = await prisma.orderLine.findMany({ where: { id: { in: orderIds } } });
    return res.status(200).json({ msg: "success", data: [orders, orderLines] });
  }

  res.status(405).json({ msg: "Method Not Allowed" });
};

export default handler;
