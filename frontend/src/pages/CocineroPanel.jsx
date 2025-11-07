import React, { useState, useEffect } from "react";
import "./CocineroPanel.css";
import { FaCheckCircle, FaClock, FaClipboardList } from "react-icons/fa";

export default function CocineroPanel({ token, onLogout }) {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filtro, setFiltro] = useState("pendiente");

    useEffect(() => {
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:9090/api/pedidos", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Error al cargar pedidos");

            const data = await response.json();
            setPedidos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const cambiarEstado = async (idPedido, nuevoEstado) => {
        try {
            const response = await fetch(`http://localhost:9090/api/pedidos/${idPedido}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ estado: nuevoEstado }),
            });

            if (!response.ok) throw new Error("Error al actualizar pedido");

            cargarPedidos();
        } catch (err) {
            setError(err.message);
        }
    };

    const pedidosFiltrados = pedidos.filter(
        (p) => !filtro || p.estado === filtro
    );

    if (loading) return <div className="loading">Cargando...</div>;

    return (
        <div className="cocinero-panel">
            <div className="panel-header">
                <h2>🍳 Panel de Cocinero</h2>
                <button className="btn-logout" onClick={onLogout}>
                    Cerrar Sesión
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {/* Filtros */}
            <div className="filtros-container">
                <button
                    className={`btn-filtro ${filtro === "pendiente" ? "active" : ""}`}
                    onClick={() => setFiltro("pendiente")}
                >
                    <FaClock /> Pendientes
                </button>
                <button
                    className={`btn-filtro ${filtro === "en_preparacion" ? "active" : ""}`}
                    onClick={() => setFiltro("en_preparacion")}
                >
                    <FaClipboardList /> En Preparación
                </button>
                <button
                    className={`btn-filtro ${filtro === "completado" ? "active" : ""}`}
                    onClick={() => setFiltro("completado")}
                >
                    <FaCheckCircle /> Completados
                </button>
                <button className="btn-filtro" onClick={() => setFiltro("")}>
                    Ver Todos
                </button>
            </div>

            {/* Lista de Pedidos */}
            <div className="pedidos-list">
                {pedidosFiltrados.length === 0 ? (
                    <div className="empty-state">
                        <p>No hay pedidos en este estado</p>
                    </div>
                ) : (
                    pedidosFiltrados.map((pedido) => (
                        <div key={pedido.id} className={`pedido-card ${pedido.estado}`}>
                            <div className="pedido-info">
                                <h3>Pedido #{pedido.id}</h3>
                                <p>
                                    <strong>Mesa:</strong> {pedido.mesa}
                                </p>
                                <p>
                                    <strong>Cliente:</strong> {pedido.cliente}
                                </p>

                                {/* Platillos */}
                                <div className="platillos">
                                    <h4>Platillos:</h4>
                                    <ul>
                                        {pedido.platillos &&
                                            pedido.platillos.map((plato, idx) => (
                                                <li key={idx}>
                                                    {plato.nombre} x{plato.cantidad}
                                                </li>
                                            ))}
                                    </ul>
                                </div>

                                <p>
                                    <strong>Estado:</strong>{" "}
                                    <span className={`estado-badge ${pedido.estado}`}>
                    {pedido.estado}
                  </span>
                                </p>
                            </div>

                            {/* Botones de Acción */}
                            <div className="pedido-actions">
                                {pedido.estado === "pendiente" && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => cambiarEstado(pedido.id, "en_preparacion")}
                                    >
                                        Iniciar Preparación
                                    </button>
                                )}

                                {pedido.estado === "en_preparacion" && (
                                    <button
                                        className="btn btn-success"
                                        onClick={() => cambiarEstado(pedido.id, "completado")}
                                    >
                                        Marcar como Completado
                                    </button>
                                )}

                                {pedido.estado === "completado" && (
                                    <span className="badge badge-success">✓ Completado</span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
