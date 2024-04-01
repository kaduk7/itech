-- CreateTable
CREATE TABLE "KaryawanTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "alamat" TEXT NOT NULL,
    "hp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KaryawanTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTb" (
    "id" SERIAL NOT NULL,
    "karyawanId" INTEGER NOT NULL,
    "usernama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KaryawanTb_hp_key" ON "KaryawanTb"("hp");

-- CreateIndex
CREATE UNIQUE INDEX "KaryawanTb_email_key" ON "KaryawanTb"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserTb_karyawanId_key" ON "UserTb"("karyawanId");

-- CreateIndex
CREATE UNIQUE INDEX "UserTb_usernama_key" ON "UserTb"("usernama");

-- AddForeignKey
ALTER TABLE "UserTb" ADD CONSTRAINT "UserTb_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "KaryawanTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;
