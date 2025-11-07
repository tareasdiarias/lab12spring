package com.example.lab012.dto;

import lombok.Data;

@Data
public class DetalleCompraDTO {
    private Long idDetalleCompra;
    private Long idCompra;
    private Long idInsumo;
    private double cantidad;
    private double precioUnitario;
    private double subtotal;
}
