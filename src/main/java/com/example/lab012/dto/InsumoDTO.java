package com.example.lab012.dto;

import lombok.Data;

@Data
public class InsumoDTO {
    private Long idInsumo;
    private String nombre;
    private String unidadMedida;
    private double stock;
    private double stockMinimo;
    private double precioCompra;
    private String estado;
}
