package com.example.lab012.model;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "proveedores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Proveedor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProveedor;
    private String ruc;
    private String nombre;
    private String telefono;
    private String correo;
    private String direccion;
}
