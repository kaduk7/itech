
export const metadata = {
    title: "Laporan Laba Penjualan",
}

function LayoutPenjualan({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-10 py-10">{children}</div>
    )
}

export default LayoutPenjualan