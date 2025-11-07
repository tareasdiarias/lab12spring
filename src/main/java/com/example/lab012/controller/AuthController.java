package com.example.lab012.controller;

import com.example.lab012.model.Usuario;
import com.example.lab012.repository.UsuarioRepository;
import com.example.lab012.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        try {
            String nombreUsuario = request.get("username");
            String contrasena = request.get("password");

            if (nombreUsuario == null || nombreUsuario.isEmpty() || contrasena == null || contrasena.isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Usuario y contraseña son requeridos");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            Optional<Usuario> usuario = usuarioRepository.findByNombreUsuario(nombreUsuario);

            if (usuario.isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Credenciales inválidas");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            Usuario u = usuario.get();

            if (!passwordEncoder.matches(contrasena, u.getContrasena())) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Credenciales inválidas");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // Verificar que el usuario esté activo
            if (!"activo".equals(u.getEstado())) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Usuario inactivo");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            String token = jwtUtil.generateToken(u.getNombreUsuario(), u.getRol().toString());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("rol", u.getRol().toString());
            response.put("nombreUsuario", u.getNombreUsuario());
            response.put("idUsuario", u.getIdUsuario());
            response.put("mensaje", "✓ Login exitoso");

            System.out.println("✓ Login exitoso: " + nombreUsuario + " - Rol: " + u.getRol());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error en el servidor: " + e.getMessage());
            System.err.println("❌ Error en login: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> request) {
        try {
            String nombreUsuario = request.get("username");
            String contrasena = request.get("password");
            String rolStr = request.get("rol");

            // Validar entrada
            if (nombreUsuario == null || nombreUsuario.isEmpty() || contrasena == null || contrasena.isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Usuario y contraseña son requeridos");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            if (usuarioRepository.findByNombreUsuario(nombreUsuario).isPresent()) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "El usuario ya existe");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
            }

            // Convertir String a Enum Rol
            Usuario.Rol rol;
            try {
                rol = Usuario.Rol.valueOf(rolStr != null ? rolStr.toUpperCase() : "MOZO");
            } catch (IllegalArgumentException e) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Rol inválido. Use: ADMIN, MOZO, CAJERO, COCINERO");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            Usuario nuevoUsuario = new Usuario();
            nuevoUsuario.setNombreUsuario(nombreUsuario);
            nuevoUsuario.setContrasena(passwordEncoder.encode(contrasena));
            nuevoUsuario.setRol(rol);
            nuevoUsuario.setEstado("activo");

            Usuario usuarioGuardado = usuarioRepository.save(nuevoUsuario);

            String token = jwtUtil.generateToken(usuarioGuardado.getNombreUsuario(), usuarioGuardado.getRol().toString());

            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "✓ Usuario registrado exitosamente");
            response.put("token", token);
            response.put("rol", usuarioGuardado.getRol().toString());
            response.put("nombreUsuario", usuarioGuardado.getNombreUsuario());
            response.put("idUsuario", usuarioGuardado.getIdUsuario());

            System.out.println("✓ Registro exitoso: " + nombreUsuario + " - Rol: " + rol);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error en el registro: " + e.getMessage());
            System.err.println("❌ Error en registro: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
