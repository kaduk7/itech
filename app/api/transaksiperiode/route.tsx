import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()
    const transaksi = await prisma.detailJualTb.findMany({
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

// export const POST = async (request: Request) => {
//     const formData = await request.formData()
//     const transaksi = await prisma.transaksiTB.findMany({
//         where: {
//             tanggal: {
//                 gte: String(formData.get('tanggalawal')),
//                 lte: String(formData.get('tanggalakhir')),
//             },
//         },
//         include: {
//             DetailJualTb: {
                
//                 include: {
//                     BarangTb: true,
//                 }
//             }

//         }
//     });
//     return NextResponse.json(transaksi, { status: 200 })
// }