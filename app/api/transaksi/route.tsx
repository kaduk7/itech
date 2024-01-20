import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getToken } from "next-auth/jwt"

const prisma = new PrismaClient()


export const GET = async () => {
  const transaksi = await prisma.detailJualTb.findMany({
    include: {
      TransaksiTB:true,
      BarangTb:true,
    }
  });
  return NextResponse.json(transaksi, { status: 200 })
}
