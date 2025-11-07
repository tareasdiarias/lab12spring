import { FaShoppingCart } from "react-icons/fa";

export default function PedidoList({ pedidos }) {
    return (
        <div className="card shadow-sm">
            <div className="card-header bg-warning text-dark">
                <h5 className="mb-0"><FaShoppingCart className="me-2"/>Pedidos</h5>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                        <tr>
                            <th>N° Pedido</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(pedidos || []).map(p => (
                            <tr key={p.idPedido}>
                                <td>#{p.idPedido}</td>
                                <td><span className={`badge bg-info`}>{p.estado}</span></td>
                                <td>{p.fechaHora}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
