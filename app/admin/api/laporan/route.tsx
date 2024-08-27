import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'; 

export const GET = async () => {
  const laporan = await prisma.penjualanTb.findMany({
    include: {
      DetailPenjualanTb: {
        include: {
          BarangTb: true,
        }
      }
    },
    orderBy: {
      nofaktur: "asc"
    }
  });
  return NextResponse.json(laporan, { status: 200 })
}
