// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpMethod } from "@/types/backend/httpMethod";
import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../../generated/prisma/client";

type ReturnType = {
  msg: string;
  data?: Product[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ReturnType>) => {
  const method = req.method;
  //GET
  if (method === HttpMethod.get) {
    const products = await prisma.product.findMany();
    return res.status(200).json({ msg: "success", data: products });
  }
  res.status(405).json({ msg: "Method Not Allowed" });
};

export default handler;
