import { FaUtensils, FaChartLine, FaLock } from "react-icons/fa";

export default function Home() {
    return (
        <div className="home-page">
            <div className="hero-section">
                <h1>Bienvenido a Sabor Gourmet</h1>
                <p>Sistema de Gestión de Restaurante con Spring Boot y React</p>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <FaUtensils size={40} className="mb-3"/>
                    <h3>Gestión Completa</h3>
                    <p>Controla clientes, mesas, pedidos, inventario y facturas en un solo lugar.</p>
                </div>
                <div className="feature-card">
                    <FaChartLine size={40} className="mb-3"/>
                    <h3>Reportes en Tiempo Real</h3>
                    <p>Visualiza estadísticas y análisis de tu restaurante en el dashboard.</p>
                </div>
                <div className="feature-card">
                    <FaLock size={40} className="mb-3"/>
                    <h3>Seguridad Garantizada</h3>
                    <p>Acceso controlado por roles con autenticación JWT cifrada.</p>
                </div>
            </div>

            <div className="tech-stack">
                <h2>Stack Tecnológico</h2>
                <ul>
                    <li>Backend: Spring Boot 3 + Java 17</li>
                    <li>Frontend: React + Vite</li>
                    <li>BD: MySQL + Spring Data JPA</li>
                    <li>Seguridad: Spring Security + JWT + BCrypt</li>
                    <li>AOP: Auditoría y Logging</li>
                </ul>
            </div>
        </div>
    );
}
