package com.example.lab012.model;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "detallefactura")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalleFactura {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetalleFactura;
    @ManyToOne
    @JoinColumn(name = "idFactura")
    private Factura factura;
    private String concepto;
    private double monto;
}

