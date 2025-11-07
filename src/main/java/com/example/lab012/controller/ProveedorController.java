package com.example.lab012.controller;
import com.example.lab012.dto.ProveedorDTO;
import com.example.lab012.service.ProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/inventario/proveedores")
public class ProveedorController {
    @Autowired
    ProveedorService service;

    @GetMapping
    public List<ProveedorDTO> getAll() {
        return service.getAll();
    }

    @PostMapping
    public ProveedorDTO save(@RequestBody ProveedorDTO dto) {
        return service.save(dto);
    }

    @PutMapping("/{id}")
    public ProveedorDTO update(@PathVariable Long id, @RequestBody ProveedorDTO dto) {
        dto.setIdProveedor(id);
        return service.save(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
