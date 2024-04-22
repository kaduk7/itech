"use client"
import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Col, Form, Row } from '@themesberg/react-bootstrap';
import { Button } from 'primereact/button';
import { mingguDepan, rupiah, tanggalHariIni, tanggalIndo } from '@/app/helper';
import { useReactToPrint } from 'react-to-print';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const LabaPenjualan = () => {

  const [datapenjualan, setDatapenjualan] = useState([])
  const [semuadata, setSemuaData] = useState([])
  const [tanggalawal, setTanggalawal] = useState(tanggalHariIni)
  const [tanggalakhir, setTanggalakhir] = useState(mingguDepan)
  const [grandtotal, setGrandtotal] = useState(0)
  const [filterText, setFilterText] = React.useState('');
  const [totallaba, setTotallaba] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    reload()
  }, [])

  const reload = async () => {
    try {
      const response = await fetch(`/api/transaksi`);
      const result = await response.json();
      let x = []
      const isidata = result.map((item: any) => ({
        nofaktur: item.nofaktur,
        tanggal: item.tanggal,
        detail: item.detailTransaksiTb,
      }));
      setDatapenjualan(isidata)
      setSemuaData(isidata)
      x = isidata
      let total = 0;
      let totallaba = 0;
      x.forEach((item: any) => {
        const y = item.detail
        y.forEach((item: any) => {
          total += (Number(item.hargaJual) * Number(item.qty));
          totallaba += ((Number(item.hargaJual) * Number(item.qty)) - (Number(item.hargaModal) * Number(item.qty)));
        })
      })
      setGrandtotal(total)
      setTotallaba(totallaba)
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

  const ttt = useReactToPrint({
    content: () => {
      if (componentRef.current) {
        return componentRef.current;
      }
      return null;
    },
    documentTitle: 'Print Laporan Barang',
  });

  const showw = async () => {
    if (tanggalakhir === "" || tanggalawal === "") {
      return
    }
    const awal = new Date(tanggalawal).toISOString()
    const akhir = new Date(tanggalakhir + 'T23:59:59.999Z').toISOString()
    const xxx: any = semuadata.filter((item: any) => item.tanggal >= awal && item.tanggal <= akhir)
    let x = []
    const isidata = xxx.map((item: any) => ({
      nofaktur: item.nofaktur,
      tanggal: item.tanggal,
      detail: item.detail,
    }));
    setDatapenjualan(isidata);
    x = isidata
    let total = 0;
    let totallaba = 0;
    x.forEach((item: any) => {
      const y = item.detail
      y.forEach((item: any) => {
        total += (Number(item.hargaJual) * Number(item.qty));
        totallaba += ((Number(item.hargaJual) * Number(item.qty)) - (Number(item.hargaModal) * Number(item.qty)));
      })
    })
    setGrandtotal(total)
    setTotallaba(totallaba)
  }

  const reset = () => {
    let x = []
    setDatapenjualan(semuadata)
    x = semuadata
    let total = 0;
    let totallaba = 0;
    x.forEach((item: any) => {
      const y = item.detail
      y.forEach((item: any) => {
        total += (Number(item.hargaJual) * Number(item.qty));
        totallaba += ((Number(item.hargaJual) * Number(item.qty)) - (Number(item.hargaModal) * Number(item.qty)));
      })
    })
    setGrandtotal(total)
    setTotallaba(totallaba)
    setTanggalawal(tanggalHariIni)
    setTanggalakhir(mingguDepan)
  }

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
      name: 'Nama Barang',
      selector: (row: any) => row.detail,
      cell: (row: any) => (
        <div>
          {row.detail?.map((item: any, index: any) => (
            <div
              key={index}
              className="mt-3 mb-3"
            >
              {item.BarangTb.namaBarang.length > 25 ? `${item.BarangTb.namaBarang.slice(0, 25)}...` : item.BarangTb.namaBarang}
            </div>
          ))}
        </div>
      ),
      width: '250px'
    },
    {
      name: 'Harga Modal',
      selector: (row: any) => row.detail,
      cell: (row: any) => (
        <div>
          {row.detail?.map((item: any, index: number) => (
            <div key={index}
              className="mt-3 mb-3"
            >
              {rupiah(item.hargaModal)}
            </div>
          ))}
        </div>
      ),
      width: '130px'
    },
    {
      name: 'Harga Jual',
      selector: (row: any) => row.detail,
      cell: (row: any) => (
        <div>
          {row.detail?.map((item: any, index: number) => (
            <div key={index}
              className="mt-3 mb-3"
            >
              {rupiah(item.hargaJual)}
            </div>
          ))}
        </div>
      ),
      width: '130px'
    },
    {
      name: 'Qty',
      selector: (row: any) => row.detail,
      cell: (row: any) => (
        <div>
          {row.detail?.map((item: any, index: number) => (
            <div key={index}
              className="mt-3 mb-3"
            >
              {item.qty}
            </div>
          ))}
        </div>
      ),
      width: '80px'
    },
    {
      name: 'Laba',
      selector: (row: any) => row.detail,
      cell: (row: any) => (
        <div>
          {row.detail?.map((item: any, index: number) => (
            <div key={index}
              className="mt-3 mb-3"
            >
              {rupiah((Number(item.hargaJual) * Number(item.qty)) - (Number(item.hargaModal) * Number(item.qty)))}
            </div>
          ))}
        </div>
      ),
      width: '150px'
    },
    {
      name: 'Sub Total',
      selector: (row: any) => row.detail,
      cell: (row: any) => (
        <div>
          {row.detail?.map((item: any, index: number) => (
            <div key={index}
              className="mt-3 mb-3"
            >
              {rupiah(Number(item.hargaJual) * Number(item.qty))}
            </div>
          ))}
        </div>
      ),
      width: '150px'
    },
  ];

  const GrandTotalComponent = () => (
    <div style={{ textAlign: 'right', paddingRight: '20px', marginTop: '10px', fontSize: 20, fontWeight: 'bold', color: 'black' }}>
      <div className='row'>
        <div className='col-md-6'>
          Total Laba: {rupiah(totallaba)}
        </div>
        <div className='col-md-6'>
          Grand Total: {rupiah(grandtotal)}
        </div>
      </div>

    </div>
  );

  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <h1 className="card-title" style={{ fontFamily: "initial", fontSize: 20 }}>Laporan Laba Penjualan</h1>
            </div>
            <div className="card-body">
              <Row className="mb-4">
                <Col md={2} className="mb-1 mt-3">
                  <div className="flex flex-column gap-2">
                    <label style={{ color: 'black' }} htmlFor="username">Tanggal Awal</label>
                    <Form.Control
                      required
                      value={tanggalawal}
                      onChange={(e) => { setTanggalawal(e.target.value); console.log('tgl', e.target.value); }}
                      type="date"
                      style={{ color: 'black', background: 'white' }}
                    />
                  </div>
                </Col>
                <Col md={2} className="mb-1 mt-3">
                  <Form.Group id="lastName">
                    <label style={{ color: 'black' }} htmlFor="username">Tanggal Akhir</label>
                    <Form.Control
                      required
                      value={tanggalakhir}
                      onChange={(e) => { setTanggalakhir(e.target.value); console.log('tgla', e.target.value); }}
                      type="date"
                      style={{ color: 'black', background: 'white' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={5} className="mb-1 mt-5">
                  <span className="p-buttonset">
                    <Button label="Show" onClick={showw} icon="mdi mdi-eye" className="px-4" severity="info" />
                    <Button onClick={reset} icon="mdi mdi-refresh" className="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700" label="Reset" severity="success" />
                    <Button label="Print" onClick={ttt} icon="mdi mdi-printer" severity="danger" />
                  </span>
                </Col>

              </Row>
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
                      fontWeight: 'bold',
                      fontFamily: 'initial'
                    },
                  },
                  cells: {
                    style: {
                      fontSize: 15,
                      fontFamily: 'initial',
                    },
                  },
                }}
              />
              <GrandTotalComponent />
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default LabaPenjualan