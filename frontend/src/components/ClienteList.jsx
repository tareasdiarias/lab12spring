import { useEffect, useState } from "react";
import { getClientes } from "../api";
import { FaUser, FaSpinner } from "react-icons/fa";

export default function ClienteList({ token }) {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getClientes(token)
            .then(setClientes)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [token]);

    if (loading) return (
        <div className="text-center py-5">
            <FaSpinner className="spinner" size={40} />
            <p className="mt-3">Cargando clientes...</p>
        </div>
    );

    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0"><FaUser className="me-2"/>Gestión de Clientes</h5>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                        <tr>
                            <th>DNI</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th>Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientes.map(c => (
                            <tr key={c.idCliente}>
                                <td>{c.dni}</td>
                                <td>{c.nombres}</td>
                                <td>{c.apellidos}</td>
                                <td>{c.telefono}</td>
                                <td>{c.correo}</td>
                                <td><span className={`badge ${c.estado === 'activo' ? 'bg-success' : 'bg-secondary'}`}>{c.estado}</span></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
