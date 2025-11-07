package com.example.lab012.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "facturas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Factura {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFactura;
    @ManyToOne
    @JoinColumn(name = "idPedido")
    private Pedido pedido;
    private LocalDateTime fechaEmision;
    private double total;
    private String metodoPago; //efectivo, tarjeta, yape
    private String estado; //pendiente, pagado
}
