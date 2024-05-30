import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { KategoriTb } from "@prisma/client"

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'; 


export const GET = async (request: Request, { params }: { params: { id: string } }) => {
   
        const kategori = await prisma.kategoriTb.findMany({
            where:{
                OR: [
                    {
                      nama: {
                        contains: params.id,
                      },
                    },
                ]
            }
        });
        return NextResponse.json(kategori, { status: 200 })
}

