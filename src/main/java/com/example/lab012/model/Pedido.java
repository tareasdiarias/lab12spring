package com.example.lab012.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import java.time.LocalDateTime;

@Entity
@Table(name = "pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPedido;

    @ManyToOne(fetch = FetchType.EAGER)  // ← IMPORTANTE: Trae los datos de una vez
    @JoinColumn(name = "idCliente")
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.EAGER)  // ← IMPORTANTE: Trae los datos de una vez
    @JoinColumn(name = "idMesa")
    private Mesa mesa;

    private LocalDateTime fechaHora;
    private String estado;
    private Double total;
}
