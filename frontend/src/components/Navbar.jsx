import React from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar({ rol, onMenuToggle, onLogout }) {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <button className="menu-toggle" onClick={onMenuToggle}>
                        <FaBars />
                    </button>
                    <div className="navbar-brand">
                        <span className="brand-icon">🍽️</span>
                        <h1>RestaurantPro</h1>
                    </div>
                </div>
                <div className="navbar-right">
                    <span className="user-role">{rol}</span>
                    <button className="btn-logout-navbar" onClick={onLogout}>
                        <FaSignOutAlt /> Salir
                    </button>
                </div>
            </div>
        </nav>
    );
}
