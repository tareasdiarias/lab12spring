package com.example.lab012.model;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;
    @Column(unique = true, nullable = false)
    private String nombreUsuario;
    @Column(nullable = false)
    private String contrasena;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol;
    @Column(nullable = false)
    private String estado; // activo/inactivo
    public enum Rol {
        ADMIN, MOZO, CAJERO, COCINERO
    }
}

