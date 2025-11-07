package com.example.lab012.model;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "detallecompra")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalleCompra {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetalleCompra;
    @ManyToOne
    @JoinColumn(name = "idCompra")
    private Compra compra;
    @ManyToOne
    @JoinColumn(name = "idInsumo")
    private Insumo insumo;
    private double cantidad;
    private double precioUnitario;
    private double subtotal;
}
