package com.example.lab012.controller;

import com.example.lab012.model.Plato;
import com.example.lab012.service.PlatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inventario/platos")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PlatoController {

    @Autowired
    private PlatoService platoService;

    @GetMapping
    public List<Plato> obtenerTodos() {
        System.out.println("📋 GET /inventario/platos");
        List<Plato> platos = platoService.obtenerTodos();
        System.out.println("✓ Retornando " + platos.size() + " platos");
        return platos;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plato> obtenerPorId(@PathVariable Long id) {
        Optional<Plato> plato = platoService.obtenerPorId(id);
        return plato.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Plato> crear(@RequestBody Plato plato) {
        System.out.println("✏️ POST /inventario/platos - " + plato.getNombre());
        try {
            Plato saved = platoService.guardar(plato);
            System.out.println("✓ Plato creado: " + saved.getNombre());
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            System.out.println("❌ Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Plato> actualizar(@PathVariable Long id, @RequestBody Plato plato) {
        System.out.println("📝 PUT /inventario/platos/" + id);
        try {
            Optional<Plato> existente = platoService.obtenerPorId(id);
            if (existente.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            plato.setIdPlato(id);
            Plato updated = platoService.guardar(plato);
            System.out.println("✓ Plato actualizado");
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            System.out.println("❌ Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        System.out.println("🗑️ DELETE /inventario/platos/" + id);
        try {
            Optional<Plato> plato = platoService.obtenerPorId(id);
            if (plato.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            platoService.eliminar(id);
            System.out.println("✓ Plato eliminado");
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            System.out.println("❌ Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
