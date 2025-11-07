package com.example.lab012.service;
import com.example.lab012.model.Factura;
import com.example.lab012.dto.FacturaDTO;
import com.example.lab012.repository.FacturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FacturaService {
    @Autowired private FacturaRepository repo;
    public List<FacturaDTO> getAll() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }
    public FacturaDTO save(FacturaDTO dto) {
        Factura f = toEntity(dto);
        return toDto(repo.save(f));
    }
    public void delete(Long id) { repo.deleteById(id); }
    public FacturaDTO toDto(Factura f) {
        FacturaDTO dto = new FacturaDTO();
        dto.setIdFactura(f.getIdFactura());
        dto.setIdPedido(f.getPedido() != null ? f.getPedido().getIdPedido() : null);
        dto.setFechaEmision(f.getFechaEmision() != null ? f.getFechaEmision().toString() : null);
        dto.setTotal(f.getTotal());
        dto.setMetodoPago(f.getMetodoPago());
        dto.setEstado(f.getEstado());
        return dto;
    }
    public Factura toEntity(FacturaDTO dto) {
        Factura f = new Factura();
        f.setIdFactura(dto.getIdFactura());
        // Asegúrate de setear el Pedido al guardar (usa repo si necesario)
        f.setFechaEmision(dto.getFechaEmision()!=null ? java.time.LocalDateTime.parse(dto.getFechaEmision()) : null);
        f.setTotal(dto.getTotal());
        f.setMetodoPago(dto.getMetodoPago());
        f.setEstado(dto.getEstado());
        return f;
    }
}
