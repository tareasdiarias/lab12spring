import { FaChair } from "react-icons/fa";

export default function MesaList({ mesas }) {
    return (
        <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
                <h5 className="mb-0"><FaChair className="me-2"/>Gestión de Mesas</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    {(mesas || []).map(m => (
                        <div key={m.idMesa} className="col-md-3 mb-3">
                            <div className={`card text-center ${m.estado === 'disponible' ? 'border-success' : 'border-danger'}`}>
                                <div className="card-body">
                                    <h3>Mesa {m.numero}</h3>
                                    <p className="mb-1">Capacidad: {m.capacidad}</p>
                                    <span className={`badge ${m.estado === 'disponible' ? 'bg-success' : 'bg-danger'}`}>{m.estado}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
