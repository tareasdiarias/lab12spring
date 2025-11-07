import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./ClienteSelect.css";

const API_URL = "http://localhost:9090";

export default function ClienteSelect({ token, value, onChange, required = false }) {
    const [clientes, setClientes] = useState([]);
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    // Cargar clientes al montar
    useEffect(() => {
        cargarClientes();
    }, [token]);

    // Filtrar clientes mientras escribes
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredClientes(clientes);
        } else {
            const filtered = clientes.filter(cliente => {
                const fullName = `${cliente.nombres} ${cliente.apellidos} ${cliente.dni}`.toLowerCase();
                return fullName.includes(searchTerm.toLowerCase());
            });
            setFilteredClientes(filtered);
        }
    }, [searchTerm, clientes]);

    // Cargar lista de clientes del backend
    const cargarClientes = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/admin/clientes`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setClientes(Array.isArray(data) ? data : []);
                console.log("✓ Clientes cargados:", data.length);
            } else {
                console.error("❌ Error cargando clientes:", response.status);
            }
        } catch (err) {
            console.error("❌ Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Manejar selección de cliente
    const handleSelectCliente = (cliente) => {
        setSelectedClient(cliente);
        onChange(cliente.idCliente);
        setSearchTerm("");
        setShowDropdown(false);
        console.log("✓ Cliente seleccionado:", cliente.nombres);
    };

    // Limpiar selección
    const handleClear = () => {
        setSelectedClient(null);
        setSearchTerm("");
        onChange(null);
    };

    return (
        <div className="cliente-select-container">
            <div className="cliente-select-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder={selectedClient ? "" : "Buscar cliente por nombre, apellido o DNI..."}
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="cliente-select-input"
                    required={required && !selectedClient}
                />
                {selectedClient && (
                    <button
                        className="clear-btn"
                        onClick={handleClear}
                        type="button"
                        title="Limpiar"
                    >
                        <FaTimes />
                    </button>
                )}
            </div>

            {showDropdown && (
                <div className="cliente-select-dropdown">
                    {loading ? (
                        <div className="dropdown-item loading">Cargando clientes...</div>
                    ) : filteredClientes.length === 0 ? (
                        <div className="dropdown-item empty">
                            {clientes.length === 0
                                ? "No hay clientes registrados"
                                : "No se encontraron clientes"}
                        </div>
                    ) : (
                        filteredClientes.map(cliente => (
                            <button
                                key={cliente.idCliente}
                                className={`dropdown-item ${selectedClient?.idCliente === cliente.idCliente ? 'selected' : ''}`}
                                onClick={() => handleSelectCliente(cliente)}
                                type="button"
                            >
                                <div className="client-info">
                                    <div className="client-name">
                                        {cliente.nombres} {cliente.apellidos}
                                    </div>
                                    <div className="client-details">
                                        DNI: {cliente.dni} | Tel: {cliente.telefono || "N/A"}
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}

            {selectedClient && (
                <div className="selected-client-info">
                    <div className="info-badge">
                        ✓ <strong>{selectedClient.nombres} {selectedClient.apellidos}</strong>
                    </div>
                    <div className="info-details">
                        DNI: {selectedClient.dni} | {selectedClient.correo}
                    </div>
                </div>
            )}
        </div>
    );
}
