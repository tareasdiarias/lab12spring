package com.example.lab012.dto;

import lombok.Data;

@Data
public class CompraDTO {
    private Long idCompra;
    private Long idProveedor;
    private String fechaCompra;
    private double total;
}
