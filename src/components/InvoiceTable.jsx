export default function InvoiceTable({ invoices, onRemove }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Facture</th>
            <th>Numéro</th>
            <th>Date</th>
            <th className="text-end">Montant (DH)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{inv.filename}</td>
              <td>{inv.number}</td>
              <td>{inv.date ? inv.date.toLocaleDateString() : '—'}</td>
              <td className="text-end">{inv.amount.toFixed(2)}</td>
              <td className="text-center">
                <button
                  className="btn btn-sm btn-outline-dark"
                  onClick={() => onRemove(i)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
          {invoices.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                Aucune facture
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
