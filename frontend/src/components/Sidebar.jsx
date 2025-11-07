import React from "react";
import { FaTimes, FaHome, FaUsers, FaTable, FaUtensils, FaTruck, FaBox, FaSignOutAlt, FaChartLine } from "react-icons/fa";
import { getMenuByRole, getEntityConfig } from "../utils/entityConfig";
import "./Sidebar.css";

const icons = {
    dashboard: FaChartLine,
    clientes: FaUsers,
    mesas: FaTable,
    platos: FaUtensils,
    proveedores: FaTruck,
    pedidos: FaBox,
};

export default function Sidebar({ isOpen, rol, onClose, currentPage, onNavigate, onLogout }) {
    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: FaChartLine },
        ...getMenuByRole(rol).map(entity => ({
            id: entity,
            label: getEntityConfig(entity).title,
            icon: icons[entity] || FaBox,
        }))
    ];

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} onClick={onClose} />
            <aside className={`sidebar ${isOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <FaChartLine className="brand-icon" />
                        <h2>RestoAdmin</h2>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="user-info">
                    <p className="user-role">👤 {rol}</p>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-item ${currentPage === item.id ? "active" : ""}`}
                            onClick={() => {
                                onNavigate(item.id);
                                onClose();
                            }}
                        >
                            <item.icon className="nav-icon" />
                            <span>{item.label}</span>
                            {currentPage === item.id && <span className="active-indicator" />}
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="btn-logout" onClick={onLogout}>
                        <FaSignOutAlt /> Cerrar Sesión
                    </button>
                </div>
            </aside>
        </>
    );
}
