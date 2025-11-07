package com.example.lab012.model;
import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bitacora")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bitacora {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBitacora;
    @ManyToOne @JoinColumn(name = "idUsuario")
    private Usuario usuario;
    @Column(nullable = false)
    private String accion;
    @Column(nullable = false)
    private LocalDateTime fechaHora;
    @Column(nullable = false)
    private String entidad;
    @Column(length = 400)
    private String detalle;
}

