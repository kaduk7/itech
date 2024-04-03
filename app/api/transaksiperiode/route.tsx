import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()
    const transaksi = await prisma.detailTransaksiTb.findMany({
        where: {
            tanggal: {
                gte: String(formData.get('tanggalawal')),
                lte: String(formData.get('tanggalakhir')),
            },
        },
            include: {
                TransaksiTB:true,
                BarangTb:true,
              }
    });
    return NextResponse.json(transaksi, { status: 200 })
}