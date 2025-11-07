package com.example.lab012.controller;
import com.example.lab012.dto.UsuarioDTO;
import com.example.lab012.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/admin/usuarios")
public class UsuarioController {
    @Autowired UsuarioService service;
    @GetMapping
    public List<UsuarioDTO> getAll() { return service.getAll(); }
    @PostMapping
    public UsuarioDTO save(@RequestBody UsuarioDTO dto) { return service.save(dto); }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
