import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()
    
        const detailtambahstok = await prisma.detailtambahstokTb.create({
            data: {
                barangId: Number(formData.get('barangId')),
                nofakturId: String(formData.get('nofaktur')),
                hargaModal: Number(formData.get('hargaModal')),
                hargaJual: Number(formData.get('hargaJual')),
                qty: Number(formData.get('qty')),
            },
        })
        return NextResponse.json(detailtambahstok, { status: 201 })
        
    
}

export const GET = async () => {
    const tambahstok = await prisma.tambahstokTb.findMany({

    })
    return NextResponse.json(tambahstok, { status: 200 })
}