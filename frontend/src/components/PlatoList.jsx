import { FaUtensils } from "react-icons/fa";

export default function PlatoList({ platos }) {
    return (
        <div className="card shadow-sm mt-3">
            <div className="card-header bg-danger text-white">
                <h5 className="mb-0"><FaUtensils className="me-2"/>Menú de Platos</h5>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Precio</th>
                            <th>Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(platos || []).map(p => (
                            <tr key={p.idPlato}>
                                <td>{p.nombre}</td>
                                <td><span className="badge bg-secondary">{p.tipo}</span></td>
                                <td>S/. {p.precio}</td>
                                <td><span className={`badge ${p.estado === 'activo' ? 'bg-success' : 'bg-secondary'}`}>{p.estado}</span></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
