import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()

    const tambahstok = await prisma.tambahstokTb.create({
        data: {
            nofaktur: String(formData.get('nofaktur')),
            tanggal: String(formData.get('tanggal')),
            admin: String(formData.get('admin')),
            totalItem: Number(formData.get('totalItem')),
            totalBayar: Number(formData.get('totalBayar')),
        },
    })
    // const tambahstok = await prisma.tambahstokTb.createMany({
    //     data: [{
    //         nofaktur: String(formData.get('nofaktur')),
    //         tanggal: String(formData.get('tanggal')),
    //         admin: String(formData.get('admin')),
    //         totalItem: Number(formData.get('totalItem')),
    //         totalBayar: Number(formData.get('totalBayar')),
    //     }],
    //     skipDuplicates: true,
    // })

    // const detailtambahstok = await prisma.detailtambahstokTb.createMany({
    //     data: {
    //         barangId: Number(formData.get('barangId')),
    //         nofakturId: String(formData.get('nofaktur')),
    //         hargaModal: Number(formData.get('hargaModal')),
    //         hargaJual: Number(formData.get('hargaJual')),
    //         qty: Number(formData.get('qty')),
    //     },
    // })

    const pilihbarang = JSON.parse(String(formData.get('selected'))) as any[];

    var x = [];
    for (let i = 0; i < pilihbarang.length; i++) {
        x.push({
            barangId: pilihbarang[i].id,
            nofakturId: String(formData.get('nofaktur')),
            hargaModal: Number(pilihbarang[i].hargaModal),
            hargaJual: Number(pilihbarang[i].hargaJual),
            qty: Number(pilihbarang[i].qty),
        });
    }

     await prisma.detailtambahstokTb.createMany({
        data: x
    })

    for (let i = 0; i < pilihbarang.length; i++) {
        await prisma.barangTb.update({
            where: {
                id: pilihbarang[i].id
            },
            data: {
                stok: Number(pilihbarang[i].stokakhir),
                hargaModal: Number(pilihbarang[i].hargaModal),
                hargaJual: Number(pilihbarang[i].hargaJual),
            },
        })
    }


    return NextResponse.json(tambahstok, { status: 201 })
}

export const GET = async () => {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    const tanggal = `${year}${month}${day}`;

    const lastTransaksi = await prisma.tambahstokTb.findFirst({
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

    const nomorFaktur = `TS${tanggal}${nomorUrutFormatted}`;

    return NextResponse.json(nomorFaktur, { status: 201 })
}
