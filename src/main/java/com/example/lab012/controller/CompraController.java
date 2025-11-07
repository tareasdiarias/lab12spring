package com.example.lab012.controller;
import com.example.lab012.dto.CompraDTO;
import com.example.lab012.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/inventario/compras")
public class CompraController {
    @Autowired CompraService service;
    @GetMapping
    public List<CompraDTO> getAll() { return service.getAll(); }
    @PostMapping
    public CompraDTO save(@RequestBody CompraDTO dto) { return service.save(dto); }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
