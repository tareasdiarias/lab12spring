package com.example.lab012.service;
import com.example.lab012.model.DetalleFactura;
import com.example.lab012.dto.DetalleFacturaDTO;
import com.example.lab012.repository.DetalleFacturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DetalleFacturaService {
    @Autowired private DetalleFacturaRepository repo;
    public List<DetalleFacturaDTO> getAll() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }
    public DetalleFacturaDTO save(DetalleFacturaDTO dto) {
        DetalleFactura entity = toEntity(dto);
        return toDto(repo.save(entity));
    }
    public void delete(Long id) { repo.deleteById(id); }
    public DetalleFacturaDTO toDto(DetalleFactura d) {
        DetalleFacturaDTO dto = new DetalleFacturaDTO();
        dto.setIdDetalleFactura(d.getIdDetalleFactura());
        dto.setIdFactura(d.getFactura()!=null?d.getFactura().getIdFactura():null);
        dto.setConcepto(d.getConcepto());
        dto.setMonto(d.getMonto());
        return dto;
    }
    public DetalleFactura toEntity(DetalleFacturaDTO dto) {
        DetalleFactura d = new DetalleFactura();
        d.setIdDetalleFactura(dto.getIdDetalleFactura());
        // Setear Factura usando repo si necesario
        d.setConcepto(dto.getConcepto());
        d.setMonto(dto.getMonto());
        return d;
    }
}
