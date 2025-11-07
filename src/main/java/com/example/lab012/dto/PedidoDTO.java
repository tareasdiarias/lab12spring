package com.example.lab012.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoDTO {
    private Long idPedido;
    private Long idCliente;
    private String cliente;           // ← NUEVO: Nombre del cliente
    private Long idMesa;
    private Integer numeroMesa;       // ← NUEVO: Número de la mesa
    private String fechaHora;
    private String estado;
    private Double total;             // ← NUEVO: Total del pedido
}
