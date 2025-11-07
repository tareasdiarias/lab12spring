import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCheck, FaSpinner, FaRefresh } from "react-icons/fa";
import "./AdminPanel.css";

const API_URL = "http://localhost:9090";

export default function AdminPanel({ token }) {
    const [stats, setStats] = useState({ clientes: 0, mesas: 0, platos: 0, proveedores: 0 });
    const [pedidos, setPedidos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        cliente: { id: "" },
        numeroMesa: "",
        estado: "PENDIENTE",
        total: "",
    });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        setLoading(true);
        setError("");
        try {
            const clientesRes = await fetch(`${API_URL}/clientes`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (clientesRes.ok) {
                const clientesData = await clientesRes.json();
                setClientes(clientesData || []);
                setStats(prev => ({ ...prev, clientes: clientesData.length || 0 }));
            }

            const pedidosRes = await fetch(`${API_URL}/pedidos`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (pedidosRes.ok) {
                const pedidosData = await pedidosRes.json();
                setPedidos(Array.isArray(pedidosData) ? pedidosData : []);
            }

            const mesasRes = await fetch(`${API_URL}/mesas`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (mesasRes.ok) {
                const mesas = await mesasRes.json();
                setStats(prev => ({ ...prev, mesas: mesas.length || 0 }));
            }

            const platosRes = await fetch(`${API_URL}/platos`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (platosRes.ok) {
                const platos = await platosRes.json();
                setStats(prev => ({ ...prev, platos: platos.length || 0 }));
            }

            const proveedoresRes = await fetch(`${API_URL}/proveedores`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (proveedoresRes.ok) {
                const proveedores = await proveedoresRes.json();
                setStats(prev => ({ ...prev, proveedores: proveedores.length || 0 }));
            }

            setSuccess("✓ Datos cargados desde BD");
            setTimeout(() => setSuccess(""), 2000);
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.cliente.id || !formData.numeroMesa || !formData.total) {
            setError("Todos los campos son requeridos");
            return;
        }

        try {
            const url = editingId ? `${API_URL}/pedidos/${editingId}` : `${API_URL}/pedidos`;
            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess(editingId ? "✓ Pedido actualizado" : "✓ Pedido creado");
                setTimeout(() => {
                    cargarDatos();
                    handleCloseForm();
                }, 1500);
            } else {
                setError("Error al guardar");
            }
        } catch (err) {
            setError("Error al guardar el pedido");
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
                    cargarDatos();
                }
            } catch (err) {
                setError("Error al eliminar");
            }
        }
    };

    const handleOpenForm = (pedido = null) => {
        if (pedido) {
            setFormData({
                cliente: pedido.cliente || { id: "" },
                numeroMesa: pedido.numeroMesa || "",
                estado: pedido.estado || "PENDIENTE",
                total: pedido.total || "",
            });
            setEditingId(pedido.id);
        } else {
            setFormData({ cliente: { id: "" }, numeroMesa: "", estado: "PENDIENTE", total: "" });
            setEditingId(null);
        }
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingId(null);
        setError("");
    };

    const getEstadoColor = (estado) => {
        switch(estado) {
            case "PENDIENTE": return "#ffc107";
            case "PREPARANDO": return "#0073aa";
            case "COMPLETADO": return "#28a745";
            case "CANCELADO": return "#dc3545";
            default: return "#666";
        }
    };

    if (loading) {
        return (
            <div className="admin-panel">
                <div className="loading-container">
                    <FaSpinner className="spinner" /> Cargando desde BD...
                </div>
            </div>
        );
    }

    return (
        <div className="admin-panel">
            <div className="stats-container">
                <div className="stat-card"><h3>{stats.clientes}</h3><p>Clientes</p></div>
                <div className="stat-card"><h3>{stats.mesas}</h3><p>Mesas</p></div>
                <div className="stat-card"><h3>{stats.platos}</h3><p>Platos</p></div>
                <div className="stat-card"><h3>{stats.proveedores}</h3><p>Proveedores</p></div>
            </div>

            {error && <div className="error-banner">{error}</div>}
            {success && <div className="success-banner">{success}</div>}

            {!showForm ? (
                <>
                    <div className="section-header">
                        <h2>Gestión de Pedidos</h2>
                        <div className="header-actions">
                            <button className="btn btn-refresh" onClick={cargarDatos}><FaRefresh /> Recargar</button>
                            <button className="btn btn-primary" onClick={() => handleOpenForm()}><FaPlus /> Nuevo</button>
                        </div>
                    </div>

                    <div className="section-content">
                        {pedidos.length === 0 ? (
                            <p className="no-data">No hay pedidos en la BD</p>
                        ) : (
                            <table className="pedidos-table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Mesa</th>
                                    <th>Estado</th>
                                    <th>Total</th>
                                    <th>Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {pedidos.map(pedido => (
                                    <tr key={pedido.id}>
                                        <td>#{pedido.id}</td>
                                        <td>{pedido.cliente?.nombre || "-"}</td>
                                        <td>{pedido.numeroMesa || "-"}</td>
                                        <td>
                        <span className="estado-badge" style={{ background: getEstadoColor(pedido.estado) }}>
                          {pedido.estado || "SIN ESTADO"}
                        </span>
                                        </td>
                                        <td>${pedido.total || "0.00"}</td>
                                        <td className="acciones">
                                            <button className="btn-icon btn-edit" onClick={() => handleOpenForm(pedido)}><FaEdit /></button>
                                            <button className="btn-icon btn-delete" onClick={() => handleDelete(pedido.id)}><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            ) : (
                <div className="form-container">
                    <div className="form-header">
                        <h2>{editingId ? "Editar Pedido" : "Crear Nuevo Pedido"}</h2>
                        <button className="btn-close-form" onClick={handleCloseForm}><FaTimes /> Volver</button>
                    </div>

                    <form onSubmit={handleSubmit} className="pedido-form-full">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Cliente *</label>
                                <select value={formData.cliente.id} onChange={(e) => setFormData({...formData, cliente: { id: e.target.value }})} required>
                                    <option value="">Seleccionar...</option>
                                    {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Mesa *</label>
                                <input type="number" value={formData.numeroMesa} onChange={(e) => setFormData({...formData, numeroMesa: e.target.value})} required />
                            </div>
                            <div className="form-group">
                                <label>Estado *</label>
                                <select value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value})}>
                                    <option value="PENDIENTE">Pendiente</option>
                                    <option value="PREPARANDO">Preparando</option>
                                    <option value="COMPLETADO">Completado</option>
                                    <option value="CANCELADO">Cancelado</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Total *</label>
                                <input type="number" step="0.01" value={formData.total} onChange={(e) => setFormData({...formData, total: e.target.value})} required />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn btn-success-lg"><FaCheck /> {editingId ? "Actualizar" : "Crear"}</button>
                            <button type="button" className="btn btn-secondary-lg" onClick={handleCloseForm}><FaTimes /> Cancelar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
