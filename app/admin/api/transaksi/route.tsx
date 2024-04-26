import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GET = async () => {
  const kategori = await prisma.transaksiTB.findMany({
      orderBy:{
          id:'asc'
      }
  });
  return NextResponse.json(kategori, { status: 200 })
}

// export const GET = async () => {
//   const transaksi = await prisma.detailTransaksiTb.findMany({
//     include: {
//       TransaksiTB:true,
//       BarangTb:true,
//     }
//   });
//   return NextResponse.json(transaksi, { status: 200 })
// }