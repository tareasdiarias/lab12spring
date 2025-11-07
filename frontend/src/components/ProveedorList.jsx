import { FaTruck } from "react-icons/fa";

export default function ProveedorList({ proveedores }) {
    return (
        <div className="card shadow-sm mt-3">
            <div className="card-header bg-dark text-white">
                <h5 className="mb-0"><FaTruck className="me-2"/>Proveedores</h5>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                        <tr>
                            <th>RUC</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(proveedores || []).map(p => (
                            <tr key={p.idProveedor}>
                                <td>{p.ruc}</td>
                                <td>{p.nombre}</td>
                                <td>{p.telefono}</td>
                                <td>{p.correo}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
