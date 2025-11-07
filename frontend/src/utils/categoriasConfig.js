// src/utils/categoriasConfig.js

export const CATEGORIAS_PREDEFINIDAS = [
    {
        id: 1,
        nombre: "Entrada",
        descripcion: "Aperitivos y entradas",
        icono: "🥗",
        color: "#4CAF50"
    },
    {
        id: 2,
        nombre: "Plato Fuerte",
        descripcion: "Carnes, pescados y aves",
        icono: "🍖",
        color: "#FF6B6B"
    },
    {
        id: 3,
        nombre: "Bebidas",
        descripcion: "Bebidas frías y calientes",
        icono: "🥤",
        color: "#2196F3"
    },
    {
        id: 4,
        nombre: "Postres",
        descripcion: "Postres y dulces",
        icono: "🍰",
        color: "#FF9800"
    },
    {
        id: 5,
        nombre: "Marina",
        descripcion: "Platos de mariscos",
        icono: "🦞",
        color: "#009688"
    }
];

export const NOMBRES_CATEGORIAS = CATEGORIAS_PREDEFINIDAS.map(c => c.nombre);

export function getCategoriaInfo(nombre) {
    return CATEGORIAS_PREDEFINIDAS.find(c => c.nombre === nombre);
}
