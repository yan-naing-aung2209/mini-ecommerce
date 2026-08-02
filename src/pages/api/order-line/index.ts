// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { OrderLine } from "../../../../generated/prisma/client";

type ReturnType = {
  msg: string;
  data?: OrderLine[];
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

    const orderIds = orders.map((order) => order.id);

    const orderLines = await prisma.orderLine.findMany({ where: { order_id: { in: orderIds } } });
    return res.status(200).json({ msg: "success", data: orderLines });
  }
  res.status(405).json({ msg: "Method Not Allowed" });
};

export default handler;
