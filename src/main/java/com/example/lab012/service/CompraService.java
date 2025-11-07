package com.example.lab012.service;
import com.example.lab012.model.Compra;
import com.example.lab012.dto.CompraDTO;
import com.example.lab012.repository.CompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompraService {
    @Autowired private CompraRepository repo;
    public List<CompraDTO> getAll() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }
    public CompraDTO save(CompraDTO dto) {
        Compra entity = toEntity(dto);
        return toDto(repo.save(entity));
    }
    public void delete(Long id) { repo.deleteById(id); }
    public CompraDTO toDto(Compra c) {
        CompraDTO dto = new CompraDTO();
        dto.setIdCompra(c.getIdCompra());
        dto.setIdProveedor(c.getProveedor()!=null?c.getProveedor().getIdProveedor():null);
        dto.setFechaCompra(c.getFechaCompra()!=null?c.getFechaCompra().toString():null);
        dto.setTotal(c.getTotal());
        return dto;
    }
    public Compra toEntity(CompraDTO dto) {
        Compra c = new Compra();
        c.setIdCompra(dto.getIdCompra());
        // Setear Proveedor usando repo si necesario
        c.setFechaCompra(dto.getFechaCompra()!=null?java.time.LocalDateTime.parse(dto.getFechaCompra()):null);
        c.setTotal(dto.getTotal());
        return c;
    }
}
