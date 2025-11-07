package com.example.lab012.service;
import com.example.lab012.dto.PlatoInsumoDTO;
import com.example.lab012.model.PlatoInsumo;
import com.example.lab012.repository.PlatoInsumoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlatoInsumoService {
    @Autowired private PlatoInsumoRepository repo;

    public List<PlatoInsumoDTO> getAll() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }
    public PlatoInsumoDTO save(PlatoInsumoDTO dto) {
        PlatoInsumo entity = toEntity(dto);
        return toDto(repo.save(entity));
    }
    public void delete(Long id) { repo.deleteById(id); }

    public PlatoInsumoDTO toDto(PlatoInsumo pi) {
        PlatoInsumoDTO dto = new PlatoInsumoDTO();
        dto.setIdPlatoInsumo(pi.getIdPlatoInsumo());
        dto.setIdPlato(pi.getPlato()!=null?pi.getPlato().getIdPlato():null);
        dto.setIdInsumo(pi.getInsumo()!=null?pi.getInsumo().getIdInsumo():null);
        dto.setCantidadUsada(pi.getCantidadUsada());
        return dto;
    }
    public PlatoInsumo toEntity(PlatoInsumoDTO dto) {
        PlatoInsumo pi = new PlatoInsumo();
        pi.setIdPlatoInsumo(dto.getIdPlatoInsumo());
        // Setear Plato e Insumo usando repos si lo necesitas
        pi.setCantidadUsada(dto.getCantidadUsada());
        return pi;
    }
}
