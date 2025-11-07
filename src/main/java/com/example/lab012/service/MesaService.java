package com.example.lab012.service;
import com.example.lab012.model.Mesa;
import com.example.lab012.dto.MesaDTO;
import com.example.lab012.repository.MesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MesaService {
    @Autowired private MesaRepository repo;
    public List<MesaDTO> getAll() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }
    public MesaDTO save(MesaDTO dto) {
        Mesa entity = toEntity(dto);
        return toDto(repo.save(entity));
    }
    public void delete(Long id) { repo.deleteById(id); }
    public MesaDTO toDto(Mesa m) {
        MesaDTO dto = new MesaDTO();
        dto.setIdMesa(m.getIdMesa());
        dto.setNumero(m.getNumero());
        dto.setCapacidad(m.getCapacidad());
        dto.setEstado(m.getEstado());
        return dto;
    }
    public Mesa toEntity(MesaDTO dto) {
        Mesa m = new Mesa();
        m.setIdMesa(dto.getIdMesa());
        m.setNumero(dto.getNumero());
        m.setCapacidad(dto.getCapacidad());
        m.setEstado(dto.getEstado());
        return m;
    }
}
