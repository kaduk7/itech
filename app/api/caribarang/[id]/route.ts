import { NextResponse } from "next/server"
import { BarangTb, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GET = async (request: Request, { params }: { params: { id: string } }) => {

    const caribarang = await prisma.barangTb.findMany({
        where: {
            namaBarang: {
                contains: params.id,
                mode:'insensitive'
            },
        }
    })
    return NextResponse.json(caribarang, { status: 200 })
}
