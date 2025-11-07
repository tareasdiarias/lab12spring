package com.example.lab012.dto;

import lombok.Data;

@Data
public class FacturaDTO {
    private Long idFactura;
    private Long idPedido;
    private String fechaEmision;
    private double total;
    private String metodoPago;
    private String estado;
}
