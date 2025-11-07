import { useState } from "react";
import LoginForm from "./components/LoginForm";
import CrudPanel from "./pages/CrudPanel";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { getMenuByRole } from "./utils/entityConfig";
import "./App.css";

function App() {
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [rol, setRol] = useState(() => localStorage.getItem("rol") || null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("dashboard");  // ← EMPIEZA EN DASHBOARD

    function handleLogin(newToken, newRol) {
        setToken(newToken);
        setRol(newRol);
        localStorage.setItem("token", newToken);
        localStorage.setItem("rol", newRol);
        setCurrentPage("dashboard");
    }

    function handleLogout() {
        setToken(null);
        setRol(null);
        setCurrentPage(null);
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
    }

    if (!token) {
        return <LoginForm onLogin={handleLogin} />;
    }

    return (
        <div className="app-container">
            <Navbar rol={rol} onMenuToggle={() => setMenuOpen(!menuOpen)} onLogout={handleLogout} />
            <div className="main-content">
                <Sidebar
                    isOpen={menuOpen}
                    rol={rol}
                    currentPage={currentPage}
                    onNavigate={setCurrentPage}
                    onLogout={handleLogout}
                    onClose={() => setMenuOpen(false)}
                />
                <div className="page-content">
                    {currentPage === "dashboard" ? (
                        <Dashboard token={token} />
                    ) : (
                        <CrudPanel token={token} entity={currentPage} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
