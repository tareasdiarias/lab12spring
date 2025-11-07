package com.example.lab012.controller;
import com.example.lab012.dto.PedidoDTO;
import com.example.lab012.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {
    @Autowired
    PedidoService service;

    @GetMapping
    public List<PedidoDTO> getAll() { return service.getAll(); }

    @PostMapping
    public PedidoDTO save(@RequestBody PedidoDTO dto) { return service.save(dto); }

    @PutMapping("/{id}")
    public PedidoDTO update(@PathVariable Long id, @RequestBody PedidoDTO dto) {
        dto.setIdPedido(id); // ← Ajusta según tu DTO
        return service.save(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
