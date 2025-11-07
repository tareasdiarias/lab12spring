package com.example.lab012.service;
import com.example.lab012.model.DetalleCompra;
import com.example.lab012.dto.DetalleCompraDTO;
import com.example.lab012.repository.DetalleCompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DetalleCompraService {
    @Autowired private DetalleCompraRepository repo;
    public List<DetalleCompraDTO> getAll() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }
    public DetalleCompraDTO save(DetalleCompraDTO dto) {
        DetalleCompra entity = toEntity(dto);
        return toDto(repo.save(entity));
    }
    public void delete(Long id) { repo.deleteById(id); }
    public DetalleCompraDTO toDto(DetalleCompra d) {
        DetalleCompraDTO dto = new DetalleCompraDTO();
        dto.setIdDetalleCompra(d.getIdDetalleCompra());
        dto.setIdCompra(d.getCompra()!=null?d.getCompra().getIdCompra():null);
        dto.setIdInsumo(d.getInsumo()!=null?d.getInsumo().getIdInsumo():null);
        dto.setCantidad(d.getCantidad());
        dto.setPrecioUnitario(d.getPrecioUnitario());
        dto.setSubtotal(d.getSubtotal());
        return dto;
    }
    public DetalleCompra toEntity(DetalleCompraDTO dto) {
        DetalleCompra d = new DetalleCompra();
        d.setIdDetalleCompra(dto.getIdDetalleCompra());
        // Setear Compra e Insumo usando repoes si necesario
        d.setCantidad(dto.getCantidad());
        d.setPrecioUnitario(dto.getPrecioUnitario());
        d.setSubtotal(dto.getSubtotal());
        return d;
    }
}
