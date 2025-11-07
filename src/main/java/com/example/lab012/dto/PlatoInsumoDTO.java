package com.example.lab012.dto;
import lombok.Data;

@Data
public class PlatoInsumoDTO {
    private Long idPlatoInsumo;
    private Long idPlato;
    private Long idInsumo;
    private double cantidadUsada;
}
