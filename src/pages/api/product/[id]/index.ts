// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../../../generated/prisma/client";

type ReturnType = {
  msg: string;
  data?: Product | null;
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

  console.log(id);

  //GET
  if (method === HttpMethod.get) {
    const product = await prisma.product.findFirst({ where: { id: Number(id) } });
    return res.status(200).json({ msg: "success", data: product });
  }
  res.status(405).json({ msg: "Method Not Allowed" });
};

export default handler;
