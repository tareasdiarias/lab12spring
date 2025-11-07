package com.example.lab012.controller;
import com.example.lab012.dto.DetalleCompraDTO;
import com.example.lab012.service.DetalleCompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/inventario/detallecompra")
public class DetalleCompraController {
    @Autowired DetalleCompraService service;
    @GetMapping
    public List<DetalleCompraDTO> getAll() { return service.getAll(); }
    @PostMapping
    public DetalleCompraDTO save(@RequestBody DetalleCompraDTO dto) { return service.save(dto); }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
