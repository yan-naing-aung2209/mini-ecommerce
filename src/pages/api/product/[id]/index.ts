// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpMethod } from "@/types/backend/httpMethod";
import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../../../generated/prisma/client";

type ReturnType = {
  msg: string;
  data?: Product | null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ReturnType>) => {
  const method = req.method;
  const { id } = req.query;

  //GET
  if (method === HttpMethod.get) {
    const product = await prisma.product.findFirst({ where: { id: Number(id) } });
    if (!product) return res.status(404).json({ msg: "Not Found" });
    return res.status(200).json({ msg: "success", data: product });
  }
  res.status(405).json({ msg: "Method Not Allowed" });
};

export default handler;
