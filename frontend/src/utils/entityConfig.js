export const entityConfig = {
    clientes: {
        title: "Clientes",
        endpoint: "/admin/clientes",
        idField: "idCliente",
        roles: ["ADMIN", "CAJERO"],
        fields: [
            { name: "nombres", label: "Nombres", type: "text", required: true },
            { name: "apellidos", label: "Apellidos", type: "text", required: true },
            { name: "dni", label: "DNI", type: "text", required: true },
            { name: "telefono", label: "Teléfono", type: "tel", required: false },
            { name: "correo", label: "Correo", type: "email", required: false },
            { name: "estado", label: "Estado", type: "select", required: false, options: ["activo", "inactivo"] },
        ],
        displayFields: ["nombres", "apellidos", "dni", "telefono", "correo"],
    },
    mesas: {
        title: "Mesas",
        endpoint: "/admin/mesas",
        idField: "idMesa",
        roles: ["ADMIN", "MOZO"],
        fields: [
            { name: "numero", label: "Número", type: "number", required: true },
            { name: "capacidad", label: "Capacidad", type: "number", required: true },
            { name: "estado", label: "Estado", type: "select", required: true, options: ["LIBRE", "OCUPADA", "RESERVADA"] },
        ],
        displayFields: ["numero", "capacidad", "estado"],
    },
    platos: {
        title: "Platos",
        endpoint: "/inventario/platos",
        idField: "idPlato",
        roles: ["ADMIN", "COCINERO"],
        fields: [
            { name: "nombre", label: "Nombre", type: "text", required: true },
            { name: "descripcion", label: "Descripción", type: "textarea", required: false },
            { name: "precio", label: "Precio", type: "number", required: true, step: "0.01" },
            { name: "categoria", label: "Categoría", type: "categoriaSelect", required: false },
            { name: "disponible", label: "Disponible", type: "checkbox", required: false },
        ],
        displayFields: ["nombre", "precio", "categoria", "disponible"],
    },
    proveedores: {
        title: "Proveedores",
        endpoint: "/inventario/proveedores",
        idField: "idProveedor",
        roles: ["ADMIN"],
        fields: [
            { name: "ruc", label: "RUC", type: "text", required: true },
            { name: "nombre", label: "Nombre", type: "text", required: true },
            { name: "telefono", label: "Teléfono", type: "tel", required: false },
            { name: "correo", label: "Correo", type: "email", required: false },
            { name: "direccion", label: "Dirección", type: "text", required: false },
        ],
        displayFields: ["ruc", "nombre", "telefono", "correo"],
    },
    pedidos: {
        title: "Pedidos",
        endpoint: "/pedidos",
        idField: "idPedido",
        roles: ["ADMIN", "MOZO", "COCINERO"],
        fields: [
            { name: "numeroMesa", label: "Mesa", type: "mesaSelect", required: true },
            { name: "cliente", label: "Cliente", type: "clienteSearch", required: false },
            { name: "estado", label: "Estado", type: "select", required: true, options: ["PENDIENTE", "PREPARANDO", "COMPLETADO", "CANCELADO"] },
            { name: "total", label: "Total", type: "number", required: true, step: "0.01" },
            { name: "notas", label: "Notas", type: "textarea", required: false },
        ],
        displayFields: ["numeroMesa", "cliente", "estado", "total"],
    },
};

export function getEntityConfig(entityName) {
    if (!entityConfig[entityName]) {
        console.warn(`⚠️ Entidad no encontrada: ${entityName}`);
        return null;
    }
    return entityConfig[entityName];
}

export function getMenuByRole(role) {
    if (!role) {
        console.warn("⚠️ Rol no definido");
        return [];
    }
    const allEntities = Object.keys(entityConfig);
    const filteredEntities = allEntities.filter(entity =>
        entityConfig[entity].roles.includes(role)
    );
    console.log(`✓ Menú para ${role}:`, filteredEntities);
    return filteredEntities;
}

export function getAllEntities() {
    return Object.keys(entityConfig);
}

export function canAccessEntity(rol, entityName) {
    const config = getEntityConfig(entityName);
    if (!config) return false;
    return config.roles.includes(rol);
}
