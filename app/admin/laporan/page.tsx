"use client"
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
// import Add from './action/Add';
// import Update from './action/Update';
// import Delete from './action/Delete';
import { mingguDepan, rupiah, tanggalHariIni, tanggalIndo } from '@/app/helper';

const Laporan = () => {
  const [datapenjualan, setDatapenjualan] = useState([])
  const [semuadata, setSemuaData] = useState([])
  const [tanggalawal, setTanggalawal] = useState(tanggalHariIni)
  const [tanggalakhir, setTanggalakhir] = useState(mingguDepan)
  const [grandtotal, setGrandtotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = React.useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);;

  useEffect(() => {
    reload()
  }, [])

  const reload = async () => {
    try {
      const response = await fetch(`/admin/api/transaksi`);
      const hasil = await response.json();
      const result = hasil.data
      setDatapenjualan(result)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = datapenjualan.filter(
    (item: any) => item.nofaktur && item.nofaktur.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columns = [
    {
      name: 'No',
      cell: (row: any, index: number) => <div>{(currentPage - 1) * itemsPerPage + index + 1}</div>,
      sortable: false,
      width: '80px'
    },
    {
      name: 'No Faktur',
      selector: (row: any) => row.nofaktur,
      sortable: true,
    },
    {
      name: 'Tanggal',
      selector: (row: any) => tanggalIndo(row.tanggal),
    },
    {
      name: 'Kasir',
      selector: (row: any) => row.kasir,
    },
    {
      name: 'Nama Barang',
      selector: (row: any) => row.detailTransaksiTb,
      cell: (row: any) => (
        <div>
          {row.detailTransaksiTb?.map((item: any, index: any) => (
            <div
              key={index}
              className="mt-4 mb-4"
            >
              {item.BarangTb.namaBarang.length > 20 ? `${item.BarangTb.namaBarang.slice(0, 20)}...` : item.BarangTb.namaBarang}
            </div>
          ))}
        </div>
      ),
      width: '200px'
    },
    {
      name: 'Harga Jual',
      selector: (row: any) => row.detailTransaksiTb,
      cell: (row: any) => (
        <div>
          {row.detailTransaksiTb?.map((item: any, index: number) => (
            <div key={index}
              className="mt-4 mb-4"
            >
              {rupiah(item.hargaJual)}
            </div>
          ))}
        </div>
      ),
      width: '150px'
    },
    {
      name: 'Qty',
      selector: (row: any) => row.detailTransaksiTb,
      cell: (row: any) => (
        <div>
          {row.detailTransaksiTb?.map((item: any, index: number) => (
            <div key={index}
              className="mt-4 mb-4"
            >
              {item.qty}
            </div>
          ))}
        </div>
      ),
      width: '80px'
    },
    {
      name: 'Sub Total',
      selector: (row: any) => row.detailTransaksiTb,
      cell: (row: any) => (
        <div>
          {row.detailTransaksiTb?.map((item: any, index: number) => (
            <div key={index}
              className="mt-4 mb-4"
            >
              {rupiah(Number(item.hargaJual) * Number(item.qty))}
            </div>
          ))}
        </div>
      ),
      width: '180px'
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <h1 className="card-title">Data Laporan</h1>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-9">
                  {/* <Add reload={reload} /> */}
                </div>
                <div className="col-md-3">
                 
                </div>
              </div>
              <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                persistTableHead
                responsive
                paginationPerPage={itemsPerPage}
                paginationTotalRows={filteredItems.length}
                onChangePage={(page) => setCurrentPage(page)}
                onChangeRowsPerPage={handleRowsPerPageChange}
                paginationRowsPerPageOptions={[5, 10, 20]}
                customStyles={{
                  headRow: {
                    style: {
                      backgroundColor: '#53d0b2',
                      fontSize: 15,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Laporan