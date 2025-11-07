package com.example.lab012.controller;
import com.example.lab012.dto.ClienteDTO;
import com.example.lab012.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/admin/clientes")
public class ClienteController {
    @Autowired
    ClienteService service;

    @GetMapping
    public List<ClienteDTO> getAll() { return service.getAll(); }

    @PostMapping
    public ClienteDTO save(@RequestBody ClienteDTO dto) { return service.save(dto); }

    @PutMapping("/{id}")
    public ClienteDTO update(@PathVariable Long id, @RequestBody ClienteDTO dto) {
        dto.setIdCliente(id); // ← Ajusta según tu DTO
        return service.save(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
