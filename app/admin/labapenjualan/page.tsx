/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-async-client-component */
"use client"
import axios from "axios";
import React, { useRef } from "react";
import { useEffect,  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import { faSearch, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useReactToPrint } from "react-to-print"

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import "primereact/resources/primereact.min.css";
import moment from "moment";

const LabaPenjualan = () => {
  const [transaksi, setTransaksi] = useState([])
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    'namaBarang': { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [tanggalawal, setTanggalawal] = useState('')
  const [tanggalakhir, setTanggalakhir] = useState('')
  const [grandtotal, setGrandtotal] = useState(0)
  const [totallaba, setTotallaba] = useState(0)

  const componentRef = useRef<HTMLDivElement | null>(null);

  const paginatorLeft = <Button type="button" icon="mdi mdi-refresh" text />;
  const paginatorRight = <Button type="button" icon="mdi mdi-download" text />;

  useEffect(() => {
    datatransaksi()
  }, [])

  async function datatransaksi() {
    const response = await axios.get(`/api/transaksi`);
    const data = response.data;
    let x = []
    const isidata = data.map((item: any) => ({
      nofakturId: item.nofakturId,
      tanggal: item.TransaksiTB.tanggal,
      namaBarang: item.BarangTb.namaBarang,
      hargaModal: item.hargaModal,
      hargaJual: item.hargaJual,
      qty: item.qty,
      kasir: item.TransaksiTB.kasir,
      subtotal: Number(item.hargaJual) * Number(item.qty),
      laba: (Number(item.hargaJual) * Number(item.qty)) - (Number(item.hargaModal) * Number(item.qty)),
    }));
    setTransaksi(isidata)
    x = isidata
    let total = 0;
    let totallaba = 0;
    x.forEach((item: any) => {
      total += item.subtotal;
      totallaba += item.laba;
    })
    setGrandtotal(total)
    setTotallaba(totallaba)
  }

  const formatDate = (date: any) => {
    return moment(date).format('DD-MM-YYYY');
  }

  const formatCurrency = (value: any) => {
    return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  };

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['namaBarang'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const ttt = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Print Laporan Barang',
  });

  const showw = async () => {
    if (tanggalakhir === "" || tanggalawal === "") {
      return
    }
    let x = []
    const formData = new FormData()
    formData.append('tanggalawal', new Date(tanggalawal).toISOString())
    formData.append('tanggalakhir', new Date(tanggalakhir + 'T23:59:59.999Z').toISOString())

    const response = await axios.post(`/api/transaksiperiode`, formData);
    const data = response.data;
    const isidata = data.map((item: any) => ({
      nofakturId: item.nofakturId,
      tanggal: item.TransaksiTB.tanggal,
      namaBarang: item.BarangTb.namaBarang,
      hargaModal: item.hargaModal,
      hargaJual: item.hargaJual,
      qty: item.qty,
      kasir: item.TransaksiTB.kasir,
      subtotal: Number(item.hargaJual) * Number(item.qty),
      laba: (Number(item.hargaJual) * Number(item.qty)) - (Number(item.hargaModal) * Number(item.qty))
    }));
    setTransaksi(isidata)
    x = isidata
    let total = 0;
    let totallaba = 0;
    x.forEach((item: any) => {
      total += item.subtotal;
      totallaba += item.laba;
    })
    setGrandtotal(total)
    setTotallaba(totallaba)
  }

  const reset = () => {
    datatransaksi()
    setTanggalawal('') //
    setTanggalakhir('') //
  }

  return (
    <div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h1 className="card-title" style={{ fontFamily: "initial", fontSize: 35 }}>Laporan Laba Penjualan</h1>
            </div>
            <div className="card-body">
              <Row className="mb-2">
                <Col md={2} className="mb-1 mt-3">
                  <div className="flex flex-column gap-2">
                    <label style={{ color: 'black', fontFamily: 'monospace', fontWeight: 'bold' }} htmlFor="username">Tanggal Awal</label>
                    <Form.Control
                      required
                      value={tanggalawal}
                      onChange={(e) => { setTanggalawal(e.target.value); console.log('tgl', e.target.value); }}
                      type="date"
                      style={{ color: 'black', background: 'white', fontFamily: 'monospace' }}
                    />
                  </div>
                </Col>
                <Col md={2} className="mb-1 mt-3">
                  <Form.Group id="lastName">
                    <label style={{ color: 'black', fontFamily: 'monospace', fontWeight: 'bold' }} htmlFor="username">Tanggal Akhir</label>
                    <Form.Control
                      required
                      value={tanggalakhir}
                      onChange={(e) => { setTanggalakhir(e.target.value); console.log('tgla', e.target.value); }}
                      type="date"
                      style={{ color: 'black', background: 'white', fontFamily: 'monospace' }}
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
                <Col md={3} className="mb-4 mt-5">
                  <Form.Group id="lastName">
                    <div className="input-group">
                      <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                      <Form.Control style={{ color: 'black', background: 'white', fontFamily: 'monospace' }}
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Search..." />

                    </div>
                  </Form.Group>

                </Col>
              </Row>

              <DataTable value={transaksi} paginator rows={5} filters={filters} globalFilterFields={['BarangTb.namaBarang']} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                <Column field="nofakturId" header="No Faktur" style={{ width: 100 }}></Column>
                <Column field="formattedBirthdate" header="Tanggal" style={{ width: 100 }} body={rowData => formatDate(rowData.tanggal)}></Column>
                <Column field="namaBarang" header="Nama Barang" style={{ width: 200 }}></Column>
                <Column field="hargaModal" header="Harga Modal" style={{ width: 100 }} body={rowData => formatCurrency(rowData.hargaModal)}></Column>
                <Column field="hargaJual" header="Harga Jual" style={{ width: 100 }} body={rowData => formatCurrency(rowData.hargaJual)}></Column>
                <Column field="qty" header="Qty" style={{ width: 50 }}></Column>
                <Column field="laba" header="Laba" style={{ width: 150 }} body={rowData => formatCurrency(rowData.laba)}></Column>
                <Column field="subtotal" header="Sub Total" style={{ width: 100 }} body={rowData => formatCurrency(rowData.subtotal)}></Column>
              </DataTable>
              <Row>
                <Col md={1} className="mb-4 mt-2">
                  <h3 className="" style={{ color: 'black', fontFamily: 'initial', fontSize: 30, fontWeight: 'bold' }}></h3>
                </Col>
                <Col md={2} className="mb-4 mt-5">
                  <h3 className="" style={{ color: 'black', fontFamily: 'initial', fontSize: 30, fontWeight: 'bold' }}>Total Laba</h3>
                </Col>
                <Col md={3} className="mb-4 mt-5">
                  <h3 className="" style={{ color: 'black', fontFamily: 'initial', fontSize: 30, fontWeight: 'bold' }}>{formatCurrency(totallaba)}</h3>
                </Col>
                <Col md={3} className="mb-4 mt-5">
                  <h3 className="" style={{ color: 'black', fontFamily: 'initial', fontSize: 30, fontWeight: 'bold' }}>Grand Total</h3>
                </Col>
                <Col md={3} className="mb-4 mt-5">
                  <h3 className="" style={{ color: 'black', fontFamily: 'initial', fontSize: 30, fontWeight: 'bold' }}>{formatCurrency(grandtotal)}</h3>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>


      <div className='modal ' >
        <div ref={componentRef} style={{ width: '100%' }} className="card">
          <div className="card-body">
            <h2 className='text-center' style={{ fontFamily: "initial", fontSize: 40, color: "black" }}>Laporan Laba Penjualan</h2>
            <span>
              <h5 className='mt-4' style={{ fontFamily: "initial", fontSize: 25, color: "black" }}>Periode : {moment(tanggalawal).format('DD-MM-yyyy')} s/d {moment(tanggalakhir).format('DD-MM-yyyy')}</h5>
            </span>

          </div>
          <div className="card-block table-border-style">
            <table className="table ">
              <thead>
                <tr>
                  <th style={{ fontFamily: "initial", fontSize: 25, color: "black" }}>No</th>
                  <th style={{ fontFamily: "initial", fontSize: 25, color: "black" }}>No Faktur</th>
                  <th style={{ fontFamily: "initial", fontSize: 25, color: "black" }}>Tanggal</th>
                  <th style={{ fontFamily: "initial", fontSize: 25, color: "black" }}>Nama Barang</th>
                  <th style={{ fontFamily: "initial", fontSize: 25, color: "black" }}>Harga Modal</th>
                  <th style={{ fontFamily: "initial", fontSize: 25, color: "black" }}>Harga Jual</th>
                  <th style={{ fontFamily: "initial", fontSize: 25, color: "black" }}>Qty</th>
                  <th style={{ fontFamily: "initial", fontSize: 25, color: "black" }}>Laba</th>
                  <th style={{ fontFamily: "initial", fontSize: 25, color: "black" }}>Sub Total</th>
                </tr>
              </thead>
              <tbody>
                {transaksi.map((x: any, index) => (
                  <tr className="hover" key={x.id}>
                    <td style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>{index + 1}</td>
                    <td style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>{x.nofakturId}</td>
                    <td style={{ fontFamily: "initial", fontSize: 20, color: "black" }}> {formatDate(x.tanggal)}</td>
                    <td style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>{x.namaBarang}</td>
                    <td style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>{formatCurrency(x.hargaModal)}</td>
                    <td style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>{formatCurrency(x.hargaJual)}</td>
                    <td style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>{x.qty}</td>
                    <td style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>{formatCurrency(x.laba)}</td>
                    <td style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>{formatCurrency(x.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Row>
              <Col md={2} className="mb-4 mt-2">
                <h3 className="" style={{ color: 'black', fontFamily: 'initial', fontSize: 30, fontWeight: 'bold' }}></h3>
              </Col>
              <Col md={2} className="mb-4 mt-5">
                <h3 className="" style={{ color: 'black', fontFamily: 'initial', fontSize: 30, fontWeight: 'bold' }}>Total Laba</h3>
              </Col>
              <Col md={3} className="mb-4 mt-5">
                <h3 className="" style={{ color: 'black', fontFamily: 'initial', fontSize: 30, fontWeight: 'bold' }}>{formatCurrency(totallaba)}</h3>
              </Col>
              <Col md={2} className="mb-4 mt-5">
                <h3 className="" style={{ color: 'black', fontFamily: 'initial', fontSize: 30, fontWeight: 'bold' }}>Grand Total</h3>
              </Col>
              <Col md={3} className="mb-4 mt-5">
                <h3 className="" style={{ color: 'black', fontFamily: 'initial', fontSize: 30, fontWeight: 'bold' }}>{formatCurrency(grandtotal)}</h3>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div >
  )
}

export default LabaPenjualan