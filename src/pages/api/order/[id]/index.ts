// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpMethod } from "@/types/backend/httpMethod";
import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { Order, OrderLine } from "../../../../../generated/prisma/client";

type ReturnType = {
  msg: string;
  data?: [Order[], OrderLine[]];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ReturnType>) => {
  const method = req.method;
  const { id } = req.query;

  //GET
  if (method === HttpMethod.delete) {
    //update order isArchived
    const validId = Number(id);
    if (!validId) return res.status(400).json({ msg: "Bad Request" });
    const order = await prisma.order.findFirst({ where: { id: Number(id) } });
    if (!order) return res.status(404).json({ msg: "Not Found" });
    await prisma.order.update({ data: { isArchived: true }, where: { id: order.id } });
    //get updated orders and orderlines
    const orders = await prisma.order.findMany({ where: { isArchived: false } });
    if (!orders.length) return res.status(404).json({ msg: "Not Found" });
    const orderIds = orders.map((order) => order.id);
    const orderLines = await prisma.orderLine.findMany({ where: { id: { in: orderIds } } });
    return res.status(200).json({ msg: "success", data: [orders, orderLines] });
  }

  res.status(405).json({ msg: "Method Not Allowed" });
};

export default handler;
