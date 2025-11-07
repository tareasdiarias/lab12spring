package com.example.lab012.service;
import com.example.lab012.model.Proveedor;
import com.example.lab012.dto.ProveedorDTO;
import com.example.lab012.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProveedorService {
    @Autowired private ProveedorRepository proveedorRepo;
    public List<ProveedorDTO> getAll() {
        return proveedorRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }
    public ProveedorDTO save(ProveedorDTO dto) {
        Proveedor p = toEntity(dto);
        return toDto(proveedorRepo.save(p));
    }
    public void delete(Long id) { proveedorRepo.deleteById(id); }
    public ProveedorDTO toDto(Proveedor p) {
        ProveedorDTO dto = new ProveedorDTO();
        dto.setIdProveedor(p.getIdProveedor());
        dto.setRuc(p.getRuc());
        dto.setNombre(p.getNombre());
        dto.setTelefono(p.getTelefono());
        dto.setCorreo(p.getCorreo());
        dto.setDireccion(p.getDireccion());
        return dto;
    }
    public Proveedor toEntity(ProveedorDTO dto) {
        Proveedor p = new Proveedor();
        p.setIdProveedor(dto.getIdProveedor());
        p.setRuc(dto.getRuc());
        p.setNombre(dto.getNombre());
        p.setTelefono(dto.getTelefono());
        p.setCorreo(dto.getCorreo());
        p.setDireccion(dto.getDireccion());
        return p;
    }
}
