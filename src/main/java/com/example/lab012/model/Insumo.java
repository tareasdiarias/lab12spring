package com.example.lab012.model;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "insumos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Insumo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idInsumo;
    private String nombre;
    private String unidadMedida;
    private double stock;
    private double stockMinimo;
    private double precioCompra;
    private String estado;
}
