package com.example.lab012.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        String jwt = null;
        String username = null;
        String rol = null;

        try {
            // Extraer JWT del header
            if (header != null && header.startsWith("Bearer ")) {
                jwt = header.substring(7);

                // Validar JWT
                if (jwtUtil.validateToken(jwt)) {
                    username = jwtUtil.extractUsername(jwt);
                    rol = jwtUtil.extractRol(jwt);  // ← EXTRAER ROL

                    System.out.println("✓ JWT válido");
                    System.out.println("  - Username: " + username);
                    System.out.println("  - Rol: " + rol);
                } else {
                    System.out.println("❌ JWT inválido");
                }
            }

            // Si el usuario no está autenticado y tenemos un username válido
            if (username != null && rol != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // Crear autenticación con el rol extraído del JWT
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                Collections.singletonList(new SimpleGrantedAuthority(rol))  // ← ROL COMO AUTHORITY
                        );

                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(auth);

                System.out.println("✓ Autenticación establecida");
                System.out.println("  - Authorities: " + auth.getAuthorities());
            }

        } catch (Exception e) {
            System.out.println("❌ Error en JwtAuthenticationFilter: " + e.getMessage());
            e.printStackTrace();
        }

        chain.doFilter(request, response);
    }
}
