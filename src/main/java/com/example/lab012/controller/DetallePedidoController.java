package com.example.lab012.controller;
import com.example.lab012.dto.DetallePedidoDTO;
import com.example.lab012.service.DetallePedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/pedidos/detallepedido")
public class DetallePedidoController {
    @Autowired DetallePedidoService service;
    @GetMapping
    public List<DetallePedidoDTO> getAll() { return service.getAll(); }
    @PostMapping
    public DetallePedidoDTO save(@RequestBody DetallePedidoDTO dto) { return service.save(dto); }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
