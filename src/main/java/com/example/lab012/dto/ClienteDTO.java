package com.example.lab012.dto;

import lombok.Data;

@Data
public class ClienteDTO {
    private Long idCliente;
    private String dni;
    private String nombres;
    private String apellidos;
    private String telefono;
    private String correo;
    private String estado;
}
