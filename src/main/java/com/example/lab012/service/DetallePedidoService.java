package com.example.lab012.service;
import com.example.lab012.model.DetallePedido;
import com.example.lab012.dto.DetallePedidoDTO;
import com.example.lab012.repository.DetallePedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DetallePedidoService {
    @Autowired private DetallePedidoRepository repo;
    public List<DetallePedidoDTO> getAll() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }
    public DetallePedidoDTO save(DetallePedidoDTO dto) {
        DetallePedido entity = toEntity(dto);
        return toDto(repo.save(entity));
    }
    public void delete(Long id) { repo.deleteById(id); }
    public DetallePedidoDTO toDto(DetallePedido d) {
        DetallePedidoDTO dto = new DetallePedidoDTO();
        dto.setIdDetallePedido(d.getIdDetallePedido());
        dto.setIdPedido(d.getPedido()!=null?d.getPedido().getIdPedido():null);
        dto.setIdPlato(d.getPlato()!=null?d.getPlato().getIdPlato():null);
        dto.setCantidad(d.getCantidad());
        dto.setSubtotal(d.getSubtotal());
        return dto;
    }
    public DetallePedido toEntity(DetallePedidoDTO dto) {
        DetallePedido d = new DetallePedido();
        d.setIdDetallePedido(dto.getIdDetallePedido());
        // Setear Pedido y Plato usando repos si necesario
        d.setCantidad(dto.getCantidad());
        d.setSubtotal(dto.getSubtotal());
        return d;
    }
}
