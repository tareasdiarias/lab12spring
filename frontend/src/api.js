const API_URL = "http://localhost:9090";

// ✅ LOGIN
export async function login(username, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Login failed");
    }
    return await res.json();
}

// ✅ REGISTER (NUEVA FUNCIÓN)
export async function register(username, password, rol) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, rol })
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Registration failed");
    }
    return await res.json();
}

// ✅ ADMIN - CLIENTES
export async function getClientes(token) {
    const res = await fetch(`${API_URL}/admin/clientes`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Error al cargar clientes");
    return await res.json();
}

// ✅ ADMIN - MESAS
export async function getMesas(token) {
    const res = await fetch(`${API_URL}/admin/mesas`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Error al cargar mesas");
    return await res.json();
}

// ✅ PEDIDOS
export async function getPedidos(token) {
    const res = await fetch(`${API_URL}/pedidos`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Error al cargar pedidos");
    return await res.json();
}

// ✅ VENTAS - FACTURAS
export async function getFacturas(token) {
    const res = await fetch(`${API_URL}/ventas/facturas`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Error al cargar facturas");
    return await res.json();
}

// ✅ INVENTARIO - PLATOS
export async function getPlatos(token) {
    const res = await fetch(`${API_URL}/inventario/platos`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Error al cargar platos");
    return await res.json();
}

// ✅ INVENTARIO - PROVEEDORES
export async function getProveedores(token) {
    const res = await fetch(`${API_URL}/inventario/proveedores`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Error al cargar proveedores");
    return await res.json();
}
