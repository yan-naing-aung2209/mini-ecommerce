// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpMethod } from "@/types/backend/httpMethod";
import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { OrderLine } from "../../../../generated/prisma/client";

type ReturnType = {
  msg: string;
  data?: OrderLine[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ReturnType>) => {
  const method = req.method;

  //GET
  if (method === HttpMethod.get) {
    const orders = await prisma.order.findMany({ where: { isArchived: false } });
    if (!orders.length) return res.status(404).json({ msg: "Not Found" });
    const orderIds = orders.map((order) => order.id);

    const orderLines = await prisma.orderLine.findMany({ where: { order_id: { in: orderIds } } });
    return res.status(200).json({ msg: "success", data: orderLines });
  }
  res.status(405).json({ msg: "Method Not Allowed" });
};

export default handler;
