package com.example.lab012.model;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "detallepedido")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetallePedido {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetallePedido;
    @ManyToOne
    @JoinColumn(name = "idPedido")
    private Pedido pedido;
    @ManyToOne
    @JoinColumn(name = "idPlato")
    private Plato plato;
    private int cantidad;
    private double subtotal;
}
