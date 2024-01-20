import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()



export const GET = async (request: Request, { params }: { params: { id: string } }) => {
   
    const transaksi = await prisma.transaksiTB.findMany({
        where: {
            tanggal: {
                gte: params.id,
                lte: params.id,
            },
        },
        include: {
            DetailJualTb: {
                include: {
                    BarangTb: true,
                }
            }

        }
    });
    return NextResponse.json(transaksi, { status: 200 })
}
