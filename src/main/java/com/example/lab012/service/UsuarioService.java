package com.example.lab012.service;
import com.example.lab012.model.Usuario;
import com.example.lab012.dto.UsuarioDTO;
import com.example.lab012.dto.AuthRequestDTO;
import com.example.lab012.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {
    @Autowired private UsuarioRepository usuarioRepo;
    @Autowired private PasswordEncoder encoder;

    public List<UsuarioDTO> getAll() {
        return usuarioRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }
    public UsuarioDTO save(UsuarioDTO dto) {
        Usuario u = toEntity(dto);
        u.setContrasena(encoder.encode(u.getContrasena()));
        return toDto(usuarioRepo.save(u));
    }
    public void delete(Long id) { usuarioRepo.deleteById(id); }
    public Optional<Usuario> getByNombreUsuario(String nombreUsuario) { return usuarioRepo.findByNombreUsuario(nombreUsuario); }

    // Para registro admin desde AuthRequestDTO
    public UsuarioDTO registerAdmin(AuthRequestDTO req) {
        Usuario u = new Usuario();
        u.setNombreUsuario(req.getUsername());
        u.setContrasena(encoder.encode(req.getPassword()));
        u.setRol(Usuario.Rol.ADMIN);
        u.setEstado("activo");
        return toDto(usuarioRepo.save(u));
    }

    public UsuarioDTO toDto(Usuario u) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setIdUsuario(u.getIdUsuario());
        dto.setNombreUsuario(u.getNombreUsuario());
        dto.setRol(u.getRol().name());
        dto.setEstado(u.getEstado());
        return dto;
    }
    public Usuario toEntity(UsuarioDTO dto) {
        Usuario u = new Usuario();
        u.setIdUsuario(dto.getIdUsuario());
        u.setNombreUsuario(dto.getNombreUsuario());
        u.setRol(dto.getRol() != null ? Usuario.Rol.valueOf(dto.getRol()) : null);
        u.setEstado(dto.getEstado());
        return u;
    }
}
