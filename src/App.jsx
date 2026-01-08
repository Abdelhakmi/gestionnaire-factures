import { useState } from "react";
import FileDropzone from "./components/FileDropzone.jsx";
import InvoiceTable from "./components/InvoiceTable.jsx";
import { parseInvoice } from "./utils/parseInvoice.js";
import logo from "./images/logo.png";
import "./App.css";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {
  const [invoices, setInvoices] = useState([]);

  const handleFiles = async (files) => {
    const parsed = await Promise.all(files.map((f) => parseInvoice(f)));
    setInvoices((prev) =>
      [...prev, ...parsed].sort((a, b) => (b.date || 0) - (a.date || 0))
    );
  };

  const removeInvoice = (index) => {
    setInvoices((prev) => prev.filter((_, i) => i !== index));
  };

  const clearInvoices = () => {
    setInvoices([]);
  };

  const total = invoices.reduce((s, i) => s + i.amount, 0);

  const downloadExcel = () => {
    if (invoices.length === 0) return;

    const totalAmount = invoices.reduce((s, i) => s + i.amount, 0);

    const data = invoices.map((inv, i) => ({
      "#": i + 1,
      Fichier: inv.filename,
      Numéro: inv.number,
      Date: inv.date ? inv.date.toLocaleDateString() : "—",
      "Montant (DH)": inv.amount.toFixed(2),
    }));

    data.push({
      "#": "",
      Fichier: "",
      Numéro: "",
      Date: "Total",
      "Montant (DH)": totalAmount.toFixed(2),
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Factures");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "factures.xlsx"
    );
  };

  return (
    <div className="main">
      <div className="container min-vh-100 d-flex flex-column align-items-left p-4">
        <h2 className="mb-4 text-center m-5">
          <img src={logo} alt="" id="logo" /> Gestionnaire de Factures
        </h2>

        {/* Zone drag & drop */}
        <div className="w-100 mb-3">
          <FileDropzone onFiles={handleFiles} />
        </div>

        {/* Boutons + total */}
        <div className="d-flex justify-content-between align-items-center mb-3 w-100 gap-3 flex-wrap">
          <button className="btn btn-outline-secondary" onClick={clearInvoices}>
            <strong>⟲ </strong>Vider le tableau
          </button>
          <div
            className="alert border-purple bg-purple mb-0"
            style={{ minWidth: "120px", textAlign: "center" }}
          >
            <strong>Total : {total.toFixed(2)} DH</strong>
          </div>
          <button className="btn btn-outline-success" onClick={downloadExcel}>
            🗎 Télécharger en Excel
          </button>
        </div>

        {/* Tableau */}
        <div className="w-100 d-flex justify-content-center">
          <div className="w-100" style={{ maxWidth: "1200px" }}>
            <InvoiceTable invoices={invoices} onRemove={removeInvoice} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
