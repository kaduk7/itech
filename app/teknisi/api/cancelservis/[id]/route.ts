import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'; 

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {

    const formData = await request.formData()
    await prisma.servisTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            biayaCancel:Number(formData.get('biayaCancel')),
            keterangan:String(formData.get('keterangan')),
            status: "Dibatalkan",
        }
    })
    return NextResponse.json({ pesan: 'berhasil' })
}
