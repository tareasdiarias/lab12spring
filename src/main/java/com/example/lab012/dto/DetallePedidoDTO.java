package com.example.lab012.dto;

import lombok.Data;

@Data
public class DetallePedidoDTO {
    private Long idDetallePedido;
    private Long idPedido;
    private Long idPlato;
    private int cantidad;
    private double subtotal;
}
