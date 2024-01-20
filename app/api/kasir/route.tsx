import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()

    const tambahstok = await prisma.transaksiTB.createMany({
        data: [{
            nofaktur: String(formData.get('nofaktur')),
            kasir:String(formData.get('kasir')),
            totalItem: Number(formData.get('totalItem')),
            totalBayar: Number(formData.get('totalBayar')),
        }],
        skipDuplicates: true,
    })
    const detailtambahstok = await prisma.detailJualTb.createMany({
        data: {
            barangId: Number(formData.get('barangId')),
            nofakturId: String(formData.get('nofaktur')),
            hargaModal: Number(formData.get('hargaModal')),
            hargaJual: Number(formData.get('hargaJual')),
            qty: Number(formData.get('qty')),

        },
    })

    const updatebarang = await prisma.barangTb.updateMany({
        where: {
            id: Number(formData.get('barangId'))
        },
        data: {
            stok: Number(formData.get('stokakhir')),
            hargaModal: Number(formData.get('hargaModal')),
            hargaJual: Number(formData.get('hargaJual')),
        },
    })
    return NextResponse.json([tambahstok, detailtambahstok, updatebarang], { status: 201 })
}

export const GET = async () => {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    const tanggal = `${year}${month}${day}`;

    const lastTransaksi = await prisma.transaksiTB.findFirst({
        orderBy: {
            nofaktur: 'desc',
        },
    });
    let nomorUrut = 1;

    if (lastTransaksi) {
        const lastNomorFaktur = lastTransaksi.nofaktur;
        const lastNomorUrut = parseInt(lastNomorFaktur.slice(-3), 10);
        nomorUrut = lastNomorUrut + 1;
    }

    const nomorUrutFormatted = nomorUrut.toString().padStart(3, '0');

    const nomorFaktur = `NF${tanggal}${nomorUrutFormatted}`;

    return NextResponse.json(nomorFaktur, { status: 201 })
}
