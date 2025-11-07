package com.example.lab012.service;

import com.example.lab012.model.Plato;
import com.example.lab012.repository.PlatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PlatoService {

    @Autowired
    private PlatoRepository platoRepository;

    public List<Plato> obtenerTodos() {
        return platoRepository.findAll();
    }

    public Optional<Plato> obtenerPorId(Long id) {
        return platoRepository.findById(id);
    }

    public Plato guardar(Plato plato) {
        return platoRepository.save(plato);
    }

    public void eliminar(Long id) {
        platoRepository.deleteById(id);
    }
}
