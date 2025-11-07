import { useEffect, useState } from "react";
import { getFacturas } from "../api";
import FacturaList from "../components/FacturaList";
import { FaCashRegister } from "react-icons/fa";

export default function CajeroPanel({ token }) {
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFacturas(token).then(setFacturas).finally(() => setLoading(false));
    }, [token]);

    if (loading) return <p className="text-center">Cargando panel del cajero...</p>;

    return (
        <div>
            <div className="page-header">
                <h2><FaCashRegister className="me-2"/>Panel Cajero - Gestión de Ventas</h2>
                <div className="stat-card-solo">
                    <h3>{facturas.length}</h3>
                    <p>Facturas Registradas</p>
                </div>
            </div>
            <div className="mt-4">
                <FacturaList facturas={facturas} />
            </div>
        </div>
    );
}
