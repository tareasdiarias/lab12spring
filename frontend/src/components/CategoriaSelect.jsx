import React, { useState } from "react";
import { CATEGORIAS_PREDEFINIDAS } from "../utils/categoriasConfig";
import "./CategoriaSelect.css";

export default function CategoriaSelect({ value, onChange, required = false }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const selectedCategoria = CATEGORIAS_PREDEFINIDAS.find(c => c.nombre === value);

    return (
        <div className="categoria-select-container">
            <div className="categoria-select-trigger">
                <button
                    type="button"
                    className="categoria-select-btn"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    {selectedCategoria ? (
                        <>
                            <span className="categoria-icon">{selectedCategoria.icono}</span>
                            <span className="categoria-nombre">{selectedCategoria.nombre}</span>
                        </>
                    ) : (
                        "Seleccionar categoría..."
                    )}
                    <span className="dropdown-arrow">▼</span>
                </button>
            </div>

            {showDropdown && (
                <div className="categoria-dropdown">
                    {CATEGORIAS_PREDEFINIDAS.map(cat => (
                        <button
                            key={cat.id}
                            type="button"
                            className={`categoria-option ${selectedCategoria?.id === cat.id ? 'selected' : ''}`}
                            onClick={() => {
                                onChange(cat.nombre);
                                setShowDropdown(false);
                            }}
                            style={{ borderLeftColor: cat.color }}
                        >
                            <span className="option-icon">{cat.icono}</span>
                            <div className="option-info">
                                <div className="option-nombre">{cat.nombre}</div>
                                <div className="option-desc">{cat.descripcion}</div>
                            </div>
                            {selectedCategoria?.id === cat.id && <span className="checkmark">✓</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
