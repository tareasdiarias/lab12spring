package com.example.lab012.controller;
import com.example.lab012.dto.DetalleFacturaDTO;
import com.example.lab012.service.DetalleFacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/ventas/detallefactura")
public class DetalleFacturaController {
    @Autowired DetalleFacturaService service;
    @GetMapping
    public List<DetalleFacturaDTO> getAll() { return service.getAll(); }
    @PostMapping
    public DetalleFacturaDTO save(@RequestBody DetalleFacturaDTO dto) { return service.save(dto); }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
