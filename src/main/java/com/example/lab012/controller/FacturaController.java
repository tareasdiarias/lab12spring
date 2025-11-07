package com.example.lab012.controller;
import com.example.lab012.dto.FacturaDTO;
import com.example.lab012.service.FacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/ventas/facturas")
public class FacturaController {
    @Autowired FacturaService service;
    @GetMapping
    public List<FacturaDTO> getAll() { return service.getAll(); }
    @PostMapping
    public FacturaDTO save(@RequestBody FacturaDTO dto) { return service.save(dto); }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
