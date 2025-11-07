package com.example.lab012.service;
import com.example.lab012.model.Cliente;
import com.example.lab012.dto.ClienteDTO;
import com.example.lab012.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteService {
    @Autowired private ClienteRepository repo;
    public List<ClienteDTO> getAll() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }
    public ClienteDTO save(ClienteDTO dto) {
        Cliente entity = toEntity(dto);
        return toDto(repo.save(entity));
    }
    public void delete(Long id) { repo.deleteById(id); }
    public ClienteDTO toDto(Cliente c) {
        ClienteDTO dto = new ClienteDTO();
        dto.setIdCliente(c.getIdCliente());
        dto.setDni(c.getDni());
        dto.setNombres(c.getNombres());
        dto.setApellidos(c.getApellidos());
        dto.setTelefono(c.getTelefono());
        dto.setCorreo(c.getCorreo());
        dto.setEstado(c.getEstado());
        return dto;
    }
    public Cliente toEntity(ClienteDTO dto) {
        Cliente c = new Cliente();
        c.setIdCliente(dto.getIdCliente());
        c.setDni(dto.getDni());
        c.setNombres(dto.getNombres());
        c.setApellidos(dto.getApellidos());
        c.setTelefono(dto.getTelefono());
        c.setCorreo(dto.getCorreo());
        c.setEstado(dto.getEstado());
        return c;
    }
}
