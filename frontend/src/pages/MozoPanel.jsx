import { useEffect, useState } from "react";
import { getPedidos } from "../api";
import PedidoList from "../components/PedidoList";
import { FaShoppingCart } from "react-icons/fa";

export default function MozoPanel({ token }) {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPedidos(token).then(setPedidos).finally(() => setLoading(false));
    }, [token]);

    if (loading) return <p className="text-center">Cargando pedidos...</p>;

    return (
        <div>
            <div className="page-header">
                <h2><FaShoppingCart className="me-2"/>Panel Mozo - Gestión de Pedidos</h2>
                <div className="stat-card-solo">
                    <h3>{pedidos.length}</h3>
                    <p>Pedidos Activos</p>
                </div>
            </div>
            <div className="mt-4">
                <PedidoList pedidos={pedidos} />
            </div>
        </div>
    );
}
