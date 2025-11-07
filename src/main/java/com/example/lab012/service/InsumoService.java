package com.example.lab012.service;
import com.example.lab012.model.Insumo;
import com.example.lab012.dto.InsumoDTO;
import com.example.lab012.repository.InsumoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InsumoService {
    @Autowired private InsumoRepository repo;
    public List<InsumoDTO> getAll() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }
    public InsumoDTO save(InsumoDTO dto) {
        Insumo entity = toEntity(dto);
        return toDto(repo.save(entity));
    }
    public void delete(Long id) { repo.deleteById(id); }
    public InsumoDTO toDto(Insumo i) {
        InsumoDTO dto = new InsumoDTO();
        dto.setIdInsumo(i.getIdInsumo());
        dto.setNombre(i.getNombre());
        dto.setUnidadMedida(i.getUnidadMedida());
        dto.setStock(i.getStock());
        dto.setStockMinimo(i.getStockMinimo());
        dto.setPrecioCompra(i.getPrecioCompra());
        dto.setEstado(i.getEstado());
        return dto;
    }
    public Insumo toEntity(InsumoDTO dto) {
        Insumo i = new Insumo();
        i.setIdInsumo(dto.getIdInsumo());
        i.setNombre(dto.getNombre());
        i.setUnidadMedida(dto.getUnidadMedida());
        i.setStock(dto.getStock());
        i.setStockMinimo(dto.getStockMinimo());
        i.setPrecioCompra(dto.getPrecioCompra());
        i.setEstado(dto.getEstado());
        return i;
    }
}
