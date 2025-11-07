import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCheck, FaSpinner, FaSyncAlt, FaSearch } from "react-icons/fa";
import { getEntityConfig } from "../utils/entityConfig";
import { MESAS_PREDEFINIDAS, getMesaInfo } from "../utils/mesasConfig";
import CategoriaSelect from "../components/CategoriaSelect";
import "./CrudPanel.css";

const API_URL = "http://localhost:9090";

export default function CrudPanel({ token, entity }) {
    const config = getEntityConfig(entity);
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState("card");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const [clientes, setClientes] = useState([]);
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [clientSearchTerm, setClientSearchTerm] = useState("");
    const [showClientDropdown, setShowClientDropdown] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedMesa, setSelectedMesa] = useState(null);

    useEffect(() => {
        cargarDatos();
        if (entity === "pedidos") {
            cargarClientes();
        }
    }, [entity, token]);

    useEffect(() => {
        const filtered = items.filter(item => {
            const searchString = Object.values(item).join(" ").toLowerCase();
            return searchString.includes(searchTerm.toLowerCase());
        });
        setFilteredItems(filtered);
        setCurrentPage(1);
    }, [searchTerm, items]);

    useEffect(() => {
        if (clientSearchTerm.trim() === "") {
            setFilteredClientes([]);
        } else {
            const filtered = clientes.filter(cliente => {
                const fullName = `${cliente.nombres} ${cliente.apellidos} ${cliente.dni}`.toLowerCase();
                return fullName.includes(clientSearchTerm.toLowerCase());
            });
            setFilteredClientes(filtered);
        }
    }, [clientSearchTerm, clientes]);

    const cargarDatos = async () => {
        setLoading(true);
        setError("");
        try {
            const url = `${API_URL}${config.endpoint}`;
            const response = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                setItems(Array.isArray(data) ? data : []);
                setFilteredItems(Array.isArray(data) ? data : []);
                setSuccess("✓ Datos cargados");
                setTimeout(() => setSuccess(""), 2000);
            } else {
                throw new Error(`Error ${response.status}`);
            }
        } catch (err) {
            console.error("❌ Error al cargar datos:", err);
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const cargarClientes = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/clientes`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setClientes(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error("❌ Error cargando clientes:", err);
        }
    };

    // AL EDITAR
    const handleOpenForm = (item = null) => {
        if (item) {
            setFormData(item);
            setEditingId(item[config.idField]);
            if (item.numeroMesa) {
                const mesa = MESAS_PREDEFINIDAS.find(m => m.numero === item.numeroMesa || m.idMesa === item.idMesa);
                setSelectedMesa(mesa || null);
            }
            if (item.idCliente) {
                const cliente = clientes.find(c => c.idCliente === item.idCliente);
                setSelectedClient(cliente || null);
            } else if (item.cliente) {
                const cliente = clientes.find(c => `${c.nombres} ${c.apellidos}` === item.cliente);
                setSelectedClient(cliente || null);
            }
        } else {
            const emptyForm = {};
            config.fields.forEach(field => {
                emptyForm[field.name] = field.type === "checkbox" ? false : "";
            });
            setFormData(emptyForm);
            setEditingId(null);
            setSelectedMesa(null);
            setSelectedClient(null);
        }
        setClientSearchTerm("");
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingId(null);
        setError("");
        setSelectedClient(null);
        setClientSearchTerm("");
        setSelectedMesa(null);
    };

    // GUARDADO DEL PEDIDO (aquí está la clave)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        // Incluye idCliente y idMesa correctos
        const body = {
            ...formData,
            idCliente: selectedClient ? selectedClient.idCliente : formData.idCliente,
            idMesa: selectedMesa ? selectedMesa.idMesa : formData.idMesa,
        };
        try {
            const url = editingId
                ? `${API_URL}${config.endpoint}/${editingId}`
                : `${API_URL}${config.endpoint}`;
            const method = editingId ? "PUT" : "POST";
            const response = await fetch(url, {
                method,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                setSuccess(editingId ? "✓ Actualizado" : "✓ Creado");
                setTimeout(() => {
                    cargarDatos();
                    handleCloseForm();
                }, 1500);
            } else {
                setError("Error al guardar");
            }
        } catch (err) {
            setError("Error al guardar");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar este registro?")) {
            try {
                const response = await fetch(`${API_URL}${config.endpoint}/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (response.ok) {
                    setSuccess("✓ Eliminado");
                    cargarDatos();
                } else {
                    setError("Error al eliminar");
                }
            } catch (err) {
                setError("Error al eliminar");
            }
        }
    };

    // Al seleccionar cliente
    const handleSelectCliente = (cliente) => {
        setSelectedClient(cliente);
        setFormData(prev => ({
            ...prev,
            cliente: cliente.nombres + " " + cliente.apellidos,
            idCliente: cliente.idCliente
        }));
        setClientSearchTerm("");
        setShowClientDropdown(false);
    };

    // Al seleccionar mesa
    const handleSelectMesa = (numeroMesa) => {
        // Buscamos en MESAS_PREDEFINIDAS por numero
        const mesa = MESAS_PREDEFINIDAS.find(m => m.numero === Number(numeroMesa));
        setSelectedMesa(mesa);
        setFormData(prev => ({
            ...prev,
            numeroMesa: mesa ? mesa.numero : "",
            idMesa: mesa ? mesa.idMesa : ""
        }));
    };

    if (loading) {
        return (
            <div className="crud-panel">
                <div className="loading-container">
                    <FaSpinner className="spinner" /> Cargando {config?.title}...
                </div>
            </div>
        );
    }

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="crud-panel">
            {error && <div className="error-banner">{error}</div>}
            {success && <div className="success-banner">{success}</div>}
            {!showForm ? (
                <>
                    <div className="crud-header">
                        <div className="crud-header-left">
                            <h2>{config.title}</h2>
                            <span className="item-count">({filteredItems.length})</span>
                        </div>
                        <button className="btn btn-primary" onClick={() => handleOpenForm()}>
                            <FaPlus /> Nuevo
                        </button>
                    </div>
                    <div className="crud-toolbar">
                        <div className="search-box">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder={`Buscar en ${config.title}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        <div className="toolbar-actions">
                            <button className={`view-mode-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}>⊟⊞</button>
                            <button className={`view-mode-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}>≡</button>
                            <button className="btn btn-refresh" onClick={cargarDatos}><FaSyncAlt /> Recargar</button>
                        </div>
                    </div>
                    {filteredItems.length === 0 ? (
                        <div className="no-data-container"><p className="no-data">No hay registros</p></div>
                    ) : viewMode === "card" ? (
                        <>
                            <div className="cards-grid">
                                {paginatedItems.map(item => (
                                    <div key={item[config.idField]} className="card">
                                        <div className="card-header">
                                            <h3>#{item[config.idField]}</h3>
                                            <div className="card-actions">
                                                <button className="card-btn edit" onClick={() => handleOpenForm(item)}><FaEdit /></button>
                                                <button className="card-btn delete" onClick={() => handleDelete(item[config.idField])}><FaTrash /></button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            {config.displayFields.map(field => {
                                                let displayValue = item[field];
                                                let displayLabel = field;
                                                if (field === "numeroMesa") displayLabel = "🪑 Mesa";
                                                if (field === "cliente") displayLabel = "👤 Cliente";
                                                if (field === "estado") displayLabel = "📊 Estado";
                                                if (field === "total") displayLabel = "💰 Total";
                                                if (typeof displayValue === 'boolean') {
                                                    displayValue = displayValue ? "✓ Sí" : "✗ No";
                                                } else if (field === "total" && displayValue) {
                                                    displayValue = `S/. ${parseFloat(displayValue).toFixed(2)}`;
                                                }
                                                return (
                                                    <div key={field} className="card-field">
                                                        <label>{displayLabel}:</label>
                                                        <p>{displayValue || "-"}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>← Anterior</button>
                                    <span className="page-info">Página {currentPage} de {totalPages}</span>
                                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Siguiente →</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="table-container">
                                <table className="crud-table">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        {config.displayFields.map(field => {
                                            let label = field.charAt(0).toUpperCase() + field.slice(1);
                                            if (field === "numeroMesa") label = "Mesa";
                                            if (field === "disponible") label = "Disponible";
                                            return <th key={field}>{label}</th>;
                                        })}
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {paginatedItems.map(item => (
                                        <tr key={item[config.idField]}>
                                            <td>#{item[config.idField]}</td>
                                            {config.displayFields.map(field => {
                                                let value = item[field];
                                                if (typeof value === 'boolean') {
                                                    value = value ? "✓" : "✗";
                                                } else if ((field === "total" || field === "precio") && value) {
                                                    value = `S/. ${parseFloat(value).toFixed(2)}`;
                                                }
                                                return <td key={field}>{value || "-"}</td>;
                                            })}
                                            <td className="acciones">
                                                <button className="btn-icon btn-edit" onClick={() => handleOpenForm(item)}><FaEdit /></button>
                                                <button className="btn-icon btn-delete" onClick={() => handleDelete(item[config.idField])}><FaTrash /></button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>← Anterior</button>
                                    <span className="page-info">Página {currentPage} de {totalPages}</span>
                                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Siguiente →</button>
                                </div>
                            )}
                        </>
                    )}
                </>
            ) : (
                <div className="form-container">
                    <div className="form-header">
                        <h2>{editingId ? `Editar ${config.title}` : `Crear ${config.title}`}</h2>
                        <button className="btn-close-form" onClick={handleCloseForm}><FaTimes /> Volver</button>
                    </div>
                    <form onSubmit={handleSubmit} className="crud-form">
                        <div className="form-grid">
                            {config.fields.map(field => {
                                if (field.type === "clienteSearch" && entity === "pedidos") {
                                    return (
                                        <div key={field.name} className="form-group" style={{ gridColumn: '1 / -1' }}>
                                            <label>{field.label} {field.required && "*"}</label>
                                            <div className="cliente-search-wrapper">
                                                <div className="search-box-form">
                                                    <FaSearch className="search-icon" />
                                                    <input
                                                        type="text"
                                                        placeholder={selectedClient ? `${selectedClient.nombres} ${selectedClient.apellidos}` : "Buscar cliente..."}
                                                        value={clientSearchTerm}
                                                        onChange={e => {
                                                            setClientSearchTerm(e.target.value);
                                                            setShowClientDropdown(e.target.value.trim() !== "");
                                                        }}
                                                        onFocus={() => clientSearchTerm.trim() !== "" && setShowClientDropdown(true)}
                                                        className="search-input-form"
                                                        required={field.required && !selectedClient}
                                                        autoComplete="off"
                                                    />
                                                    {selectedClient && (
                                                        <button type="button" className="clear-search-btn" onClick={() => {
                                                            setSelectedClient(null);
                                                            setClientSearchTerm("");
                                                            setFormData({...formData, cliente: "", idCliente: ""});
                                                        }}>✕</button>
                                                    )}
                                                </div>
                                                {showClientDropdown && clientSearchTerm.trim() !== "" && filteredClientes.length > 0 && (
                                                    <div className="dropdown-form client-dropdown">
                                                        <div className="dropdown-header">
                                                            <span className="result-count">{filteredClientes.length} resultado{filteredClientes.length !== 1 ? 's' : ''}</span>
                                                        </div>
                                                        {filteredClientes.slice(0, 6).map(cliente => (
                                                            <button
                                                                key={cliente.idCliente}
                                                                className={`dropdown-item-form ${selectedClient?.idCliente === cliente.idCliente ? 'selected' : ''}`}
                                                                onClick={() => handleSelectCliente(cliente)}
                                                                type="button"
                                                            >
                                                                <div className="client-avatar">👤</div>
                                                                <div className="client-info-detailed">
                                                                    <div className="client-name-form">{cliente.nombres} {cliente.apellidos}</div>
                                                                    <div className="client-detail-form">DNI: {cliente.dni}</div>
                                                                    <div className="client-phone-form">{cliente.telefono || "Sin teléfono"}</div>
                                                                </div>
                                                                {selectedClient?.idCliente === cliente.idCliente && <span className="checkmark-form">✓</span>}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                                {selectedClient && !clientSearchTerm && (
                                                    <div className="selected-client-badge">
                                                        <div className="badge-content">
                                                            <span className="badge-avatar">👤</span>
                                                            <div className="badge-info">
                                                                <div className="badge-name">{selectedClient.nombres} {selectedClient.apellidos}</div>
                                                                <div className="badge-dni">DNI: {selectedClient.dni}</div>
                                                            </div>
                                                            <button type="button" className="badge-close" onClick={() => {
                                                                setSelectedClient(null);
                                                                setClientSearchTerm("");
                                                                setFormData({...formData, cliente: "", idCliente: ""});
                                                            }}>✕</button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                                if (field.type === "mesaSelect" && entity === "pedidos") {
                                    return (
                                        <div key={field.name} className="form-group">
                                            <label>{field.label} {field.required && "*"}</label>
                                            <select
                                                value={formData.numeroMesa || ""}
                                                onChange={e => handleSelectMesa(e.target.value)}
                                                required={field.required}
                                                className="mesa-select"
                                            >
                                                <option value="">Seleccionar mesa...</option>
                                                {MESAS_PREDEFINIDAS.map(mesa => (
                                                    <option key={mesa.numero} value={mesa.numero}>
                                                        Mesa {mesa.numero} - Cap: {mesa.capacidad} | Zona {mesa.zona}
                                                    </option>
                                                ))}
                                            </select>
                                            {selectedMesa && (
                                                <div className="mesa-info-form">
                                                    ✓ Mesa {selectedMesa.numero} | Cap: {selectedMesa.capacidad} | Zona {selectedMesa.zona}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                                if (field.type === "categoriaSelect" && entity === "platos") {
                                    return (
                                        <div key={field.name} className="form-group">
                                            <label>{field.label} {field.required && "*"}</label>
                                            <CategoriaSelect
                                                value={formData[field.name] || ""}
                                                onChange={(cat) => setFormData({...formData, [field.name]: cat})}
                                                required={field.required}
                                            />
                                        </div>
                                    );
                                }
                                if (field.type === "select") {
                                    return (
                                        <div key={field.name} className="form-group">
                                            <label>{field.label} {field.required && "*"}</label>
                                            <select
                                                value={formData[field.name] || ""}
                                                onChange={e => setFormData({...formData, [field.name]: e.target.value})}
                                                required={field.required}
                                            >
                                                <option value="">Seleccionar...</option>
                                                {field.options?.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                                            </select>
                                        </div>
                                    );
                                }
                                if (field.type === "checkbox") {
                                    return (
                                        <div key={field.name} className="form-group">
                                            <label><input type="checkbox" checked={formData[field.name] || false} onChange={e => setFormData({...formData, [field.name]: e.target.checked})} />{field.label}</label>
                                        </div>
                                    );
                                }
                                if (field.type === "textarea") {
                                    return (
                                        <div key={field.name} className="form-group" style={{ gridColumn: '1 / -1' }}>
                                            <label>{field.label} {field.required && "*"}</label>
                                            <textarea value={formData[field.name] || ""} onChange={e => setFormData({...formData, [field.name]: e.target.value})} required={field.required} rows="4" />
                                        </div>
                                    );
                                }
                                return (
                                    <div key={field.name} className="form-group">
                                        <label>{field.label} {field.required && "*"}</label>
                                        <input type={field.type} step={field.step} value={formData[field.name] || ""} onChange={e => setFormData({...formData, [field.name]: e.target.value})} required={field.required} />
                                    </div>
                                );
                            })}
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
