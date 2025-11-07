import React, { useState, useEffect } from "react";
import { FaUsers, FaShoppingCart, FaUtensils, FaTruck } from "react-icons/fa";
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, ComposedChart
} from "recharts";
import "./Dashboard.css";

const API_URL = "http://localhost:9090";

export default function Dashboard({ token }) {
    const [stats, setStats] = useState({
        clientes: 0,
        pedidos: 0,
        platos: 0,
        proveedores: 0
    });

    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarDatos();
    }, [token]);

    const cargarDatos = async () => {
        try {
            // Datos reales de tu API
            const endpoints = [
                { key: "clientes", url: "/admin/clientes" },
                { key: "pedidos", url: "/pedidos" },
                { key: "platos", url: "/inventario/platos" },
                { key: "proveedores", url: "/inventario/proveedores" }
            ];

            const newStats = { ...stats };

            for (const endpoint of endpoints) {
                try {
                    const response = await fetch(`${API_URL}${endpoint.url}`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        newStats[endpoint.key] = Array.isArray(data) ? data.length : 0;
                    }
                } catch (err) {
                    console.error(`Error: ${endpoint.key}`, err);
                }
            }

            setStats(newStats);

            // Generar datos para gráficos tipo trading
            const data = [];
            for (let i = 0; i < 12; i++) {
                data.push({
                    mes: `Mes ${i + 1}`,
                    ventas: Math.floor(Math.random() * 5000) + 2000,
                    pedidos: Math.floor(Math.random() * 100) + 20,
                    clientes: Math.floor(Math.random() * 80) + 10,
                    trending: Math.floor(Math.random() * 50) + 5
                });
            }
            setChartData(data);
            setLoading(false);
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <div className={`stat-card stat-${color}`}>
            <div className="stat-icon"><Icon /></div>
            <div className="stat-content">
                <p className="stat-title">{title}</p>
                <h3 className="stat-value">{value}</h3>
            </div>
        </div>
    );

    if (loading) {
        return <div className="dashboard loading">Cargando...</div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p className="timestamp">Última actualización: {new Date().toLocaleTimeString()}</p>
            </div>

            {/* STATS CARDS */}
            <div className="stats-grid">
                <StatCard icon={FaUsers} title="Clientes" value={stats.clientes} color="blue" />
                <StatCard icon={FaShoppingCart} title="Pedidos" value={stats.pedidos} color="green" />
                <StatCard icon={FaUtensils} title="Platos" value={stats.platos} color="orange" />
                <StatCard icon={FaTruck} title="Proveedores" value={stats.proveedores} color="red" />
            </div>

            {/* TRADING CHARTS */}
            <div className="charts-section">
                {/* CHART 1: Área con línea - Ventas y Pedidos */}
                <div className="chart-card">
                    <h3>📈 Ventas vs Pedidos</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="mes" stroke="#666" />
                            <YAxis yAxisId="left" stroke="#0073aa" />
                            <YAxis yAxisId="right" orientation="right" stroke="#28a745" />
                            <Tooltip
                                contentStyle={{ background: "#fff", border: "1px solid #ccc" }}
                            />
                            <Legend />
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="ventas"
                                fill="#0073aa20"
                                stroke="#0073aa"
                                strokeWidth={2}
                                name="Ventas (S/.)"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="pedidos"
                                stroke="#28a745"
                                strokeWidth={3}
                                dot={{ fill: "#28a745", r: 4 }}
                                name="Pedidos"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* CHART 2: Línea dual - Clientes y Tendencia */}
                <div className="chart-card">
                    <h3>📊 Clientes vs Tendencia</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="mes" stroke="#666" />
                            <YAxis yAxisId="left" stroke="#fd7e14" />
                            <YAxis yAxisId="right" orientation="right" stroke="#dc3545" />
                            <Tooltip
                                contentStyle={{ background: "#fff", border: "1px solid #ccc" }}
                            />
                            <Legend />
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="clientes"
                                fill="#fd7e1420"
                                stroke="#fd7e14"
                                strokeWidth={2}
                                name="Clientes"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="trending"
                                stroke="#dc3545"
                                strokeWidth={3}
                                dot={{ fill: "#dc3545", r: 4 }}
                                name="Índice"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* CHART 3: Área rellena completa - Todas las métricas */}
                <div className="chart-card full-width">
                    <h3>📉 Análisis Completo</h3>
                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="mes" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                                contentStyle={{ background: "#fff", border: "1px solid #ccc" }}
                            />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="ventas"
                                stackId="1"
                                fill="#0073aa40"
                                stroke="#0073aa"
                                name="Ventas"
                            />
                            <Area
                                type="monotone"
                                dataKey="pedidos"
                                stackId="1"
                                fill="#28a74540"
                                stroke="#28a745"
                                name="Pedidos"
                            />
                            <Area
                                type="monotone"
                                dataKey="clientes"
                                stackId="1"
                                fill="#fd7e1440"
                                stroke="#fd7e14"
                                name="Clientes"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
