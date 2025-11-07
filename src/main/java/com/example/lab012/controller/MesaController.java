package com.example.lab012.controller;
import com.example.lab012.dto.MesaDTO;
import com.example.lab012.service.MesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/admin/mesas")
public class MesaController {
    @Autowired
    MesaService service;

    @GetMapping
    public List<MesaDTO> getAll() { return service.getAll(); }

    @PostMapping
    public MesaDTO save(@RequestBody MesaDTO dto) { return service.save(dto); }

    @PutMapping("/{id}")
    public MesaDTO update(@PathVariable Long id, @RequestBody MesaDTO dto) {
        dto.setIdMesa(id); // ← Ajusta según tu DTO
        return service.save(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
