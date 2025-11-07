package com.example.lab012.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "compras")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Compra {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCompra;
    @ManyToOne
    @JoinColumn(name = "idProveedor")
    private Proveedor proveedor;
    private LocalDateTime fechaCompra;
    private double total;
}
