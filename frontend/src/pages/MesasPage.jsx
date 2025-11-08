import React, { useState, useEffect } from "react";
import { FaChair, FaPlus, FaEdit, FaTrash, FaSyncAlt, FaSearch } from "react-icons/fa";
import "./MesasPage.css";

const API_URL = "http://localhost:9090";

export default function MesasPage({ token }) {
    const [mesas, setMesas] = useState([]);
    const [filteredMesas, setFilteredMesas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filtroZona, setFiltroZona] = useState("TODAS");
    const [filtroEstado, setFiltroEstado] = useState("TODOS");
    const [formData, setFormData] = useState({
        numero: "",
        capacidad: 2,
        zona: "A"
    });

    const ZONAS = ["A", "B", "C", "D"];

    useEffect(() => {
        cargarMesas();
    }, [token]);

    useEffect(() => {
        aplicarFiltros();
    }, [mesas, searchTerm, filtroZona, filtroEstado]);

    const cargarMesas = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/admin/mesas`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setMesas(Array.isArray(data) ? data : []);
                setSuccess("✓ Mesas cargadas");
                setTimeout(() => setSuccess(""), 2000);
            }
        } catch (err) {
            setError("Error al cargar mesas");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const aplicarFiltros = () => {
        let filtered = mesas.filter(mesa => {
            const matchBusqueda = mesa.numero.toString().includes(searchTerm.toLowerCase());
            const matchZona = filtroZona === "TODAS" || mesa.zona === filtroZona;
            const matchEstado = filtroEstado === "TODOS" || mesa.estado === filtroEstado;
            return matchBusqueda && matchZona && matchEstado;
        });
        setFilteredMesas(filtered);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const url = editingId
                ? `${API_URL}/admin/mesas/${editingId}`
                : `${API_URL}/admin/mesas`;

            const response = await fetch(url, {
                method: editingId ? "PUT" : "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSuccess(editingId ? "✓ Mesa actualizada" : "✓ Mesa creada");
                setTimeout(() => {
                    cargarMesas();
                    handleCloseForm();
                }, 1500);
            } else {
                setError("Error al guardar mesa");
            }
        } catch (err) {
            setError("Error al guardar");
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar esta mesa?")) {
            try {
                const response = await fetch(`${API_URL}/admin/mesas/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (response.ok) {
                    setSuccess("✓ Mesa eliminada");
                    cargarMesas();
                } else {
                    setError("Error al eliminar");
                }
            } catch (err) {
                setError("Error al eliminar");
            }
        }
    };

    const handleCambiarEstado = async (id, nuevoEstado) => {
        try {
            const response = await fetch(`${API_URL}/admin/mesas/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ estado: nuevoEstado })
            });

            if (response.ok) {
                setSuccess(`✓ Mesa ${nuevoEstado}`);
                cargarMesas();
            }
        } catch (err) {
            setError("Error al cambiar estado");
        }
    };

    const handleOpenForm = (mesa = null) => {
        if (mesa) {
            setFormData(mesa);
            setEditingId(mesa.idMesa);
        } else {
            setFormData({ numero: "", capacidad: 2, zona: "A" });
            setEditingId(null);
        }
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData({ numero: "", capacidad: 2, zona: "A" });
    };

    if (loading) {
        return <div className="mesas-page loading">Cargando mesas...</div>;
    }

    return (
        <div className="mesas-page">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {!showForm ? (
                <>
                    <div className="mesas-header">
                        <div>
                            <h1><FaChair /> Gestión de Mesas</h1>
                            <p className="info-text">Total: {mesas.length} | Disponibles: {mesas.filter(m => m.estado === "disponible").length}</p>
                        </div>
                        <button className="btn btn-primary" onClick={() => handleOpenForm()}>
                            <FaPlus /> Nueva Mesa
                        </button>
                    </div>

                    <div className="filtros-mesas">
                        <div className="filtro-item">
                            <label>Buscar</label>
                            <div className="search-box">
                                <FaSearch />
                                <input
                                    type="text"
                                    placeholder="Número de mesa..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="filtro-item">
                            <label>Zona</label>
                            <select value={filtroZona} onChange={(e) => setFiltroZona(e.target.value)}>
                                <option value="TODAS">Todas</option>
                                {ZONAS.map(z => <option key={z} value={z}>Zona {z}</option>)}
                            </select>
                        </div>

                        <div className="filtro-item">
                            <label>Estado</label>
                            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                                <option value="TODOS">Todos</option>
                                <option value="disponible">Disponible</option>
                                <option value="ocupada">Ocupada</option>
                            </select>
                        </div>

                        <button className="btn btn-refresh" onClick={cargarMesas}>
                            <FaSyncAlt /> Recargar
                        </button>
                    </div>

                    <div className="mesas-grid">
                        {filteredMesas.length === 0 ? (
                            <div className="no-data">No hay mesas</div>
                        ) : (
                            filteredMesas.map(mesa => (
                                <div
                                    key={mesa.idMesa}
                                    className={`mesa-card mesa-${mesa.estado} mesa-zona-${mesa.zona}`}
                                >
                                    <div className="mesa-number">{mesa.numero}</div>
                                    <div className="mesa-info">
                                        <p><strong>Capacidad:</strong> {mesa.capacidad} pers.</p>
                                        <p><strong>Zona:</strong> {mesa.zona}</p>
                                        <p className={`estado ${mesa.estado}`}>
                                            {mesa.estado === "disponible" ? "✓ Disponible" : "✗ Ocupada"}
                                        </p>
                                    </div>

                                    <div className="mesa-actions">
                                        <button
                                            className={`btn-estado ${mesa.estado === "disponible" ? "btn-ocupar" : "btn-liberar"}`}
                                            onClick={() => handleCambiarEstado(mesa.idMesa, mesa.estado === "disponible" ? "ocupada" : "disponible")}
                                        >
                                            {mesa.estado === "disponible" ? "Ocupar" : "Liberar"}
                                        </button>
                                        <button className="btn-icon btn-edit" onClick={() => handleOpenForm(mesa)}>
                                            <FaEdit />
                                        </button>
                                        <button className="btn-icon btn-delete" onClick={() => handleDelete(mesa.idMesa)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            ) : (
                <div className="form-container">
                    <h2>{editingId ? "Editar Mesa" : "Nueva Mesa"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Número de Mesa *</label>
                            <input
                                type="number"
                                value={formData.numero}
                                onChange={(e) => setFormData({...formData, numero: e.target.value})}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Capacidad *</label>
                            <select
                                value={formData.capacidad}
                                onChange={(e) => setFormData({...formData, capacidad: parseInt(e.target.value)})}
                            >
                                <option value={2}>2 personas</option>
                                <option value={4}>4 personas</option>
                                <option value={6}>6 personas</option>
                                <option value={8}>8 personas (VIP)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Zona *</label>
                            <select
                                value={formData.zona}
                                onChange={(e) => setFormData({...formData, zona: e.target.value})}
                            >
                                {ZONAS.map(z => <option key={z} value={z}>Zona {z}</option>)}
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-success">
                                {editingId ? "Actualizar" : "Crear"}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
