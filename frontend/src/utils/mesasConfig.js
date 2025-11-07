// src/utils/mesasConfig.js

export const MESAS_PREDEFINIDAS = [
    // Zona A: Mesas de 2 personas
    { idMesa: 1, numero: 1, capacidad: 2, zona: "A" },
    { idMesa: 2, numero: 2, capacidad: 2, zona: "A" },
    { idMesa: 3, numero: 3, capacidad: 2, zona: "A" },
    { idMesa: 4, numero: 4, capacidad: 2, zona: "A" },
    { idMesa: 5, numero: 5, capacidad: 2, zona: "A" },

    // Zona B: Mesas de 4 personas
    { idMesa: 6, numero: 6, capacidad: 4, zona: "B" },
    { idMesa: 7, numero: 7, capacidad: 4, zona: "B" },
    { idMesa: 8, numero: 8, capacidad: 4, zona: "B" },
    { idMesa: 9, numero: 9, capacidad: 4, zona: "B" },
    { idMesa: 10, numero: 10, capacidad: 4, zona: "B" },
    { idMesa: 11, numero: 11, capacidad: 4, zona: "B" },
    { idMesa: 12, numero: 12, capacidad: 4, zona: "B" },
    { idMesa: 13, numero: 13, capacidad: 4, zona: "B" },
    { idMesa: 14, numero: 14, capacidad: 4, zona: "B" },
    { idMesa: 15, numero: 15, capacidad: 4, zona: "B" },

    // Zona C: Mesas de 6 personas
    { idMesa: 16, numero: 16, capacidad: 6, zona: "C" },
    { idMesa: 17, numero: 17, capacidad: 6, zona: "C" },
    { idMesa: 18, numero: 18, capacidad: 6, zona: "C" },
    { idMesa: 19, numero: 19, capacidad: 6, zona: "C" },
    { idMesa: 20, numero: 20, capacidad: 6, zona: "C" },
    { idMesa: 21, numero: 21, capacidad: 6, zona: "C" },
    { idMesa: 22, numero: 22, capacidad: 6, zona: "C" },
    { idMesa: 23, numero: 23, capacidad: 6, zona: "C" },
    { idMesa: 24, numero: 24, capacidad: 6, zona: "C" },
    { idMesa: 25, numero: 25, capacidad: 6, zona: "C" },

    // Zona D: Mesas de 8 personas (VIP)
    { idMesa: 26, numero: 26, capacidad: 8, zona: "D" },
    { idMesa: 27, numero: 27, capacidad: 8, zona: "D" },
    { idMesa: 28, numero: 28, capacidad: 8, zona: "D" },
    { idMesa: 29, numero: 29, capacidad: 8, zona: "D" },
    { idMesa: 30, numero: 30, capacidad: 8, zona: "D" },
];

export function getMesaInfo(numeroMesa) {
    return MESAS_PREDEFINIDAS.find(m => m.numero === numeroMesa);
}

export function getMesasByZona(zona) {
    return MESAS_PREDEFINIDAS.filter(m => m.zona === zona);
}
