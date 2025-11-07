import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";
import { FaUtensils, FaArrowLeft } from "react-icons/fa";

export default function RegisterForm({ onRegisterSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("ADMIN");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:9090/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    password,
                    rol
                })
            });

            if (!res.ok) throw new Error("Error al registrar");

            const data = await res.json();
            onRegisterSuccess(data.token, data.rol);
        } catch (err) {
            setError(err.message || "Error en el registro");
        } finally {
            setLoading(false);
        }
    }

    if (showRegister) {
        return (
            <div className="register-container">
                <div className="register-card">
                    <button className="btn-back" onClick={() => setShowRegister(false)}>
                        <FaArrowLeft /> Volver
                    </button>

                    <div className="register-header">
                        <FaUtensils size={50} className="mb-3 text-primary"/>
                        <h2>Crear Nueva Cuenta</h2>
                        <p>Sabor Gourmet</p>
                    </div>

                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label>Usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Ingrese nombre de usuario"
                                required
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Ingrese contraseña"
                                required
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Rol</label>
                            <select
                                value={rol}
                                onChange={e => setRol(e.target.value)}
                                className="form-control"
                            >
                                <option value="ADMIN">Administrador</option>
                                <option value="MOZO">Mozo</option>
                                <option value="CAJERO">Cajero</option>
                                <option value="COCINERO">Cocinero</option>
                            </select>
                        </div>

                        <button className="btn-register" type="submit" disabled={loading}>
                            {loading ? "Registrando..." : "Registrarse"}
                        </button>

                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </form>
                </div>
            </div>
        );
    }

    // Vista de Login con opción de Registro
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <FaUtensils size={50} className="mb-3 text-primary"/>
                    <h1>Sabor Gourmet</h1>
                    <p>Sistema de Gestión de Restaurante</p>
                </div>

                <button
                    className="btn-toggle-register mb-3"
                    onClick={() => setShowRegister(true)}
                >
                    ¿No tienes cuenta? Regístrate aquí
                </button>
            </div>
        </div>
    );
}
