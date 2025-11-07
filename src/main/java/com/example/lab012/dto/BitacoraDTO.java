package com.example.lab012.dto;

import lombok.Data;

@Data
public class BitacoraDTO {
    private Long idBitacora;
    private Long idUsuario;
    private String accion;
    private String fechaHora;
    private String entidad;
    private String detalle;
}
