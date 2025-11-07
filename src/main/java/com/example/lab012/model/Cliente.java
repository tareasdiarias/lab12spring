package com.example.lab012.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCliente;

    @Column(nullable = false)
    private String nombres;

    @Column(nullable = false)
    private String apellidos;

    @Column(nullable = false, unique = true)
    private String dni;

    @Column(nullable = true)
    private String telefono;

    @Column(nullable = true)
    private String correo;

    @Column(nullable = true, columnDefinition = "VARCHAR(20) DEFAULT 'activo'")
    private String estado; // activo/inactivo
}
