package com.example.lab012.dto;

import lombok.Data;

@Data
public class ProveedorDTO {
    private Long idProveedor;
    private String ruc;
    private String nombre;
    private String telefono;
    private String correo;
    private String direccion;
}
