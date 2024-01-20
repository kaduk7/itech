-- CreateTable
CREATE TABLE "BarangTb" (
    "id" SERIAL NOT NULL,
    "kodeBarang" TEXT NOT NULL,
    "namaBarang" TEXT NOT NULL,
    "kategoriId" INTEGER NOT NULL,
    "merek" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "hargaModal" INTEGER NOT NULL,
    "hargaJual" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,
    "foto" TEXT,
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BarangTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KategoriTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KategoriTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TambahstokTb" (
    "id" SERIAL NOT NULL,
    "nofaktur" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "admin" TEXT NOT NULL,
    "totalItem" INTEGER NOT NULL,
    "totalBayar" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TambahstokTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailtambahstokTb" (
    "id" SERIAL NOT NULL,
    "barangId" INTEGER NOT NULL,
    "nofakturId" TEXT NOT NULL,
    "hargaModal" INTEGER NOT NULL,
    "hargaJual" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DetailtambahstokTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransaksiTB" (
    "id" SERIAL NOT NULL,
    "nofaktur" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kasir" TEXT NOT NULL,
    "totalItem" INTEGER NOT NULL,
    "totalBayar" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransaksiTB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailJualTb" (
    "id" SERIAL NOT NULL,
    "barangId" INTEGER NOT NULL,
    "nofakturId" TEXT NOT NULL,
    "hargaModal" INTEGER NOT NULL,
    "hargaJual" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DetailJualTb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BarangTb_kodeBarang_key" ON "BarangTb"("kodeBarang");

-- CreateIndex
CREATE UNIQUE INDEX "TambahstokTb_nofaktur_key" ON "TambahstokTb"("nofaktur");

-- CreateIndex
CREATE UNIQUE INDEX "TransaksiTB_nofaktur_key" ON "TransaksiTB"("nofaktur");

-- AddForeignKey
ALTER TABLE "BarangTb" ADD CONSTRAINT "BarangTb_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "KategoriTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailtambahstokTb" ADD CONSTRAINT "DetailtambahstokTb_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "BarangTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailtambahstokTb" ADD CONSTRAINT "DetailtambahstokTb_nofakturId_fkey" FOREIGN KEY ("nofakturId") REFERENCES "TambahstokTb"("nofaktur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailJualTb" ADD CONSTRAINT "DetailJualTb_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "BarangTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailJualTb" ADD CONSTRAINT "DetailJualTb_nofakturId_fkey" FOREIGN KEY ("nofakturId") REFERENCES "TransaksiTB"("nofaktur") ON DELETE CASCADE ON UPDATE CASCADE;
