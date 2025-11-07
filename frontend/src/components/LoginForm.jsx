import { useState } from "react";
import { FaUtensils, FaArrowLeft, FaSpinner, FaLock, FaUser } from "react-icons/fa";
import "./LoginForm.css";

const API_URL = "http://localhost:9090";

export default function LoginForm({ onLogin }) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [rol, setRol] = useState("ADMIN");

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password: pass })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Credenciales inválidas");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("rol", data.rol);
            localStorage.setItem("nombreUsuario", data.nombreUsuario);
            onLogin(data.token, data.rol);
        } catch (err) {
            setError(err.message || "Credenciales inválidas. Por favor intente de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password: pass, rol: rol })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || errorData.mensaje || "Error al registrar");
            }

            const data = await res.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("rol", data.rol);
            localStorage.setItem("nombreUsuario", data.nombreUsuario);
            onLogin(data.token, data.rol);
        } catch (err) {
            setError(err.message || "Error en el registro");
        } finally {
            setLoading(false);
        }
    }

    if (!isRegister) {
        return (
            <div className="login-wrapper">
                {/* LEFT SIDE - MOTIVATIONAL SECTION */}
                <div className="login-left">
                    <div className="left-content">
                        <div className="left-header">
                            <FaUtensils className="left-icon" />
                            <h2>Sabor Gourmet</h2>
                        </div>
                        <div className="left-quote">
                            <p className="quote-text">
                                "La excelencia en cada plato, la calidad en cada servicio"
                            </p>
                            <p className="quote-author">Sistema de Gestión Gastronómica</p>
                        </div>
                        <div className="features">
                            <div className="feature">
                                <span className="feature-icon">📊</span>
                                <span>Gestión Integral</span>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">👥</span>
                                <span>Multi-usuario</span>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">📈</span>
                                <span>Análisis Real-time</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - LOGIN FORM */}
                <div className="login-right">
                    <div className="login-card">
                        <div className="login-header">
                            <h1>Bienvenido</h1>
                            <p>Accede a tu cuenta</p>
                        </div>

                        <form onSubmit={handleLogin} className="login-form">
                            <div className="form-group">
                                <label>Usuario</label>
                                <div className="input-group">
                                    <FaUser className="input-icon" />
                                    <input
                                        type="text"
                                        value={user}
                                        onChange={e => setUser(e.target.value)}
                                        placeholder="Tu usuario"
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Contraseña</label>
                                <div className="input-group">
                                    <FaLock className="input-icon" />
                                    <input
                                        type="password"
                                        value={pass}
                                        onChange={e => setPass(e.target.value)}
                                        placeholder="Tu contraseña"
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <button
                                className="btn-login"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <FaSpinner className="spinner" /> Ingresando...
                                    </>
                                ) : (
                                    "Iniciar Sesión"
                                )}
                            </button>
                        </form>

                        <div className="divider">O</div>

                        <button
                            className="btn-register"
                            onClick={() => {
                                setIsRegister(true);
                                setError("");
                                setUser("");
                                setPass("");
                            }}
                        >
                            Crear Nueva Cuenta
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // REGISTER VIEW
    return (
        <div className="login-wrapper">
            <div className="login-left">
                <div className="left-content">
                    <div className="left-header">
                        <FaUtensils className="left-icon" />
                        <h2>Sabor Gourmet</h2>
                    </div>
                    <div className="left-quote">
                        <p className="quote-text">
                            "Únete a nuestro equipo de profesionales"
                        </p>
                    </div>
                </div>
            </div>

            <div className="login-right">
                <div className="login-card">
                    <button
                        className="btn-back"
                        onClick={() => {
                            setIsRegister(false);
                            setError("");
                            setUser("");
                            setPass("");
                            setRol("ADMIN");
                        }}
                    >
                        <FaArrowLeft /> Volver
                    </button>

                    <div className="login-header">
                        <h1>Crear Cuenta</h1>
                        <p>Regístrate en el sistema</p>
                    </div>

                    <form onSubmit={handleRegister} className="login-form">
                        <div className="form-group">
                            <label>Usuario</label>
                            <div className="input-group">
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    value={user}
                                    onChange={e => setUser(e.target.value)}
                                    placeholder="Nombre de usuario"
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Contraseña</label>
                            <div className="input-group">
                                <FaLock className="input-icon" />
                                <input
                                    type="password"
                                    value={pass}
                                    onChange={e => setPass(e.target.value)}
                                    placeholder="Contraseña"
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Rol</label>
                            <select
                                value={rol}
                                onChange={e => setRol(e.target.value)}
                                className="form-control"
                            >
                                <option value="ADMIN">👨‍💼 Administrador</option>
                                <option value="MOZO">🚶 Mozo</option>
                                <option value="CAJERO">💰 Cajero</option>
                                <option value="COCINERO">👨‍🍳 Cocinero</option>
                            </select>
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <button
                            className="btn-login"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="spinner" /> Registrando...
                                </>
                            ) : (
                                "Crear Cuenta"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
