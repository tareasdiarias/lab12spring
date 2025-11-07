package com.example.lab012.controller;
import com.example.lab012.dto.PlatoInsumoDTO;
import com.example.lab012.service.PlatoInsumoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/inventario/platinsumo")
public class PlatoInsumoController {
    @Autowired PlatoInsumoService service;
    @GetMapping
    public List<PlatoInsumoDTO> getAll() { return service.getAll(); }
    @PostMapping
    public PlatoInsumoDTO save(@RequestBody PlatoInsumoDTO dto) { return service.save(dto); }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
