package com.example.lab012.aspect;
import com.example.lab012.model.Bitacora;
import com.example.lab012.model.Usuario;
import com.example.lab012.repository.BitacoraRepository;
import com.example.lab012.repository.UsuarioRepository;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Aspect
@Component
public class AuditoriaAspect {
    @Autowired BitacoraRepository bitacoraRepository;
    @Autowired UsuarioRepository usuarioRepository;
    @AfterReturning(pointcut = "execution(* com.example.lab012.service.*.save(..))", returning = "result")
    public void auditarCreacion(JoinPoint joinPoint, Object result) {
        registrar("CREATE", joinPoint);
    }
    @AfterReturning(pointcut = "execution(* com.example.lab012.service.*.delete(..))")
    public void auditarDelete(JoinPoint joinPoint) {
        registrar("DELETE", joinPoint);
    }
    private void registrar(String accion, JoinPoint joinPoint) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = (auth != null) ? auth.getName() : "ANONIMO";
        Usuario u = usuarioRepository.findByNombreUsuario(username).orElse(null);
        Bitacora b = new Bitacora();
        b.setUsuario(u);
        b.setAccion(accion);
        b.setFechaHora(LocalDateTime.now());
        b.setEntidad(joinPoint.getSignature().getDeclaringType().getSimpleName());
        b.setDetalle("Método: " + joinPoint.getSignature().getName());
        bitacoraRepository.save(b);
    }
}
