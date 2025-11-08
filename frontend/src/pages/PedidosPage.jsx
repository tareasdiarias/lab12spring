import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaPlus, FaEye, FaTrash, FaSyncAlt, FaSearch } from "react-icons/fa";
import "./PedidosPage.css";

const API_URL = "http://localhost:9090";
const ESTADOS = ["pendiente", "en preparación", "servido", "cerrado"];

export default function PedidosPage({ token }) {
    const [pedidos, setPedidos] = useState([]);
    const [filteredPedidos, setFilteredPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("TODOS");
    const [selectedPedido, setSelectedPedido] = useState(null);

    useEffect(() => {
        cargarPedidos();
        const interval = setInterval(cargarPedidos, 5000); // Actualizar cada 5s
        return () => clearInterval(interval);
    }, [token]);

    useEffect(() => {
        aplicarFiltros();
    }, [pedidos, searchTerm, filtroEstado]);

    const cargarPedidos = async () => {
        try {
            const response = await fetch(`${API_URL}/pedidos`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setPedidos(Array.isArray(data) ? data : []);
                if (!loading) setSuccess("✓ Actualizado");
                setTimeout(() => setSuccess(""), 1500);
            }
        } catch (err) {
            setError("Error al cargar pedidos");
        } finally {
            setLoading(false);
        }
    };

    const aplicarFiltros = () => {
        let filtered = pedidos.filter(pedido => {
            const matchBusqueda = pedido.idPedido.toString().includes(searchTerm) ||
                (pedido.cliente && pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchEstado = filtroEstado === "TODOS" || pedido.estado === filtroEstado;
            return matchBusqueda && matchEstado;
        });
        setFilteredPedidos(filtered);
    };

    const handleCambiarEstado = async (idPedido, nuevoEstado) => {
        try {
            const response = await fetch(`${API_URL}/pedidos/${idPedido}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ estado: nuevoEstado })
            });

            if (response.ok) {
                setSuccess(`✓ Pedido ${nuevoEstado}`);
                cargarPedidos();
            }
        } catch (err) {
            setError("Error al actualizar estado");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar este pedido?")) {
            try {
                const response = await fetch(`${API_URL}/pedidos/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (response.ok) {
                    setSuccess("✓ Pedido eliminado");
                    cargarPedidos();
                }
            } catch (err) {
                setError("Error al eliminar");
            }
        }
    };

    const getEstadoColor = (estado) => {
        const colores = {
            "pendiente": "#ffc107",
            "en preparación": "#17a2b8",
            "servido": "#28a745",
            "cerrado": "#6c757d"
        };
        return colores[estado] || "#007bff";
    };

    const getEstadoBadge = (estado) => {
        const badges = {
            "pendiente": "⏳",
            "en preparación": "👨‍🍳",
            "servido": "✓",
            "cerrado": "✓✓"
        };
        return badges[estado] || "?";
    };

    if (loading) {
        return <div className="pedidos-page loading">Cargando pedidos...</div>;
    }

    return (
        <div className="pedidos-page">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="pedidos-header">
                <div>
                    <h1><FaShoppingCart /> Gestión de Pedidos</h1>
                    <p className="info-text">
                        Total: {pedidos.length} |
                        Pendientes: {pedidos.filter(p => p.estado === "pendiente").length} |
                        En preparación: {pedidos.filter(p => p.estado === "en preparación").length}
                    </p>
                </div>
            </div>

            <div className="filtros-pedidos">
                <div className="filtro-item">
                    <label>Buscar</label>
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="ID o cliente..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="filtro-item">
                    <label>Estado</label>
                    <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                        <option value="TODOS">Todos</option>
                        {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>

                <button className="btn btn-refresh" onClick={cargarPedidos}>
                    <FaSyncAlt /> Recargar
                </button>
            </div>

            <div className="pedidos-container">
                {filteredPedidos.length === 0 ? (
                    <div className="no-data">No hay pedidos</div>
                ) : (
                    <table className="pedidos-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Mesa</th>
                            <th>Estado</th>
                            <th>Total</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredPedidos.map(pedido => (
                            <tr key={pedido.idPedido}>
                                <td className="id-cell">#{pedido.idPedido}</td>
                                <td>{pedido.cliente || "-"}</td>
                                <td className="mesa-cell">
                                    {pedido.numeroMesa ? `Mesa ${pedido.numeroMesa}` : "-"}
                                </td>
                                <td>
                                    <select
                                        className="estado-select"
                                        value={pedido.estado}
                                        onChange={(e) => handleCambiarEstado(pedido.idPedido, e.target.value)}
                                        style={{ borderColor: getEstadoColor(pedido.estado) }}
                                    >
                                        {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
                                    </select>
                                </td>
                                <td className="total-cell">S/. {pedido.total?.toFixed(2) || "0.00"}</td>
                                <td className="fecha-cell">{pedido.fechaHora?.split(" ")[0] || "-"}</td>
                                <td className="acciones-cell">
                                    <button className="btn-icon" onClick={() => setSelectedPedido(pedido)} title="Ver detalles">
                                        <FaEye />
                                    </button>
                                    <button className="btn-icon btn-delete" onClick={() => handleDelete(pedido.idPedido)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {selectedPedido && (
                <div className="modal-overlay" onClick={() => setSelectedPedido(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Detalles del Pedido #{selectedPedido.idPedido}</h2>
                        <div className="modal-body">
                            <p><strong>Cliente:</strong> {selectedPedido.cliente || "-"}</p>
                            <p><strong>Mesa:</strong> {selectedPedido.numeroMesa ? `Mesa ${selectedPedido.numeroMesa}` : "-"}</p>
                            <p><strong>Estado:</strong> {selectedPedido.estado}</p>
                            <p><strong>Total:</strong> S/. {selectedPedido.total?.toFixed(2)}</p>
                            <p><strong>Fecha:</strong> {selectedPedido.fechaHora}</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => setSelectedPedido(null)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
