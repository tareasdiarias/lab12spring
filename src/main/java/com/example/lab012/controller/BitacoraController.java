package com.example.lab012.controller;
import com.example.lab012.dto.BitacoraDTO;
import com.example.lab012.service.BitacoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin/bitacora")
public class BitacoraController {
    @Autowired BitacoraService service;
    @GetMapping
    public List<BitacoraDTO> getAll() {
        return service.getAll();
    }

}
