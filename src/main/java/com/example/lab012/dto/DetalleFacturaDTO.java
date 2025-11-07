package com.example.lab012.dto;

import lombok.Data;

@Data
public class DetalleFacturaDTO {
    private Long idDetalleFactura;
    private Long idFactura;
    private String concepto;
    private double monto;
}
