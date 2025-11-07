import { FaFileInvoice } from "react-icons/fa";

export default function FacturaList({ facturas }) {
    return (
        <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
                <h5 className="mb-0"><FaFileInvoice className="me-2"/>Facturas</h5>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                        <tr>
                            <th>N° Factura</th>
                            <th>Fecha Emisión</th>
                            <th>Total</th>
                            <th>Método Pago</th>
                            <th>Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(facturas || []).map(f => (
                            <tr key={f.idFactura}>
                                <td>#{f.idFactura}</td>
                                <td>{f.fechaEmision}</td>
                                <td>S/. {f.total}</td>
                                <td>{f.metodoPago}</td>
                                <td><span className={`badge ${f.estado === 'pagado' ? 'bg-success' : 'bg-warning'}`}>{f.estado}</span></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
