package com.example.lab012.controller;
import com.example.lab012.dto.InsumoDTO;
import com.example.lab012.service.InsumoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/inventario/insumos")
public class InsumoController {
    @Autowired InsumoService service;
    @GetMapping
    public List<InsumoDTO> getAll() { return service.getAll(); }
    @PostMapping
    public InsumoDTO save(@RequestBody InsumoDTO dto) { return service.save(dto); }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
