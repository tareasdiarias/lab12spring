package com.example.lab012.service;
import com.example.lab012.model.Bitacora;
import com.example.lab012.dto.BitacoraDTO;
import com.example.lab012.repository.BitacoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BitacoraService {
    @Autowired private BitacoraRepository repo;
    public List<BitacoraDTO> getAll() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }
    public BitacoraDTO toDto(Bitacora b) {
        BitacoraDTO dto = new BitacoraDTO();
        dto.setIdBitacora(b.getIdBitacora());
        dto.setIdUsuario(b.getUsuario()!=null?b.getUsuario().getIdUsuario():null);
        dto.setAccion(b.getAccion());
        dto.setFechaHora(b.getFechaHora()!=null?b.getFechaHora().toString():null);
        dto.setEntidad(b.getEntidad());
        dto.setDetalle(b.getDetalle());
        return dto;
    }
}
