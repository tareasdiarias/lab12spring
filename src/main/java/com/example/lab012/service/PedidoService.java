package com.example.lab012.service;

import com.example.lab012.model.Pedido;
import com.example.lab012.model.Cliente;
import com.example.lab012.model.Mesa;
import com.example.lab012.dto.PedidoDTO;
import com.example.lab012.repository.PedidoRepository;
import com.example.lab012.repository.ClienteRepository;
import com.example.lab012.repository.MesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private MesaRepository mesaRepository;

    // ← CONVERTIR ENTITY A DTO (CLAVE: Aquí se mapean los datos)
    private PedidoDTO convertToDTO(Pedido pedido) {
        PedidoDTO dto = new PedidoDTO();
        dto.setIdPedido(pedido.getIdPedido());

        // CLIENTE: Obtener nombre completo
        if (pedido.getCliente() != null) {
            dto.setIdCliente(pedido.getCliente().getIdCliente());
            String nombreCliente = pedido.getCliente().getNombres() + " " + pedido.getCliente().getApellidos();
            dto.setCliente(nombreCliente);
            System.out.println("✓ Cliente: " + nombreCliente); // DEBUG
        } else {
            dto.setCliente(null);
            System.out.println("⚠️ Cliente NULL"); // DEBUG
        }

        // MESA: Obtener número de mesa
        if (pedido.getMesa() != null) {
            dto.setIdMesa(pedido.getMesa().getIdMesa());
            dto.setNumeroMesa(pedido.getMesa().getNumero());
            System.out.println("✓ Mesa: " + pedido.getMesa().getNumero()); // DEBUG
        } else {
            dto.setNumeroMesa(null);
            System.out.println("⚠️ Mesa NULL"); // DEBUG
        }

        // OTROS CAMPOS
        if (pedido.getFechaHora() != null) {
            dto.setFechaHora(pedido.getFechaHora().toString());
        }
        dto.setEstado(pedido.getEstado());
        dto.setTotal(pedido.getTotal());

        return dto;
    }

    // Convertir DTO a ENTITY
    private Pedido convertToEntity(PedidoDTO dto) {
        Pedido pedido = new Pedido();
        pedido.setIdPedido(dto.getIdPedido());

        if (dto.getIdCliente() != null) {
            Cliente cliente = clienteRepository.findById(dto.getIdCliente()).orElse(null);
            pedido.setCliente(cliente);
        }

        if (dto.getIdMesa() != null) {
            Mesa mesa = mesaRepository.findById(dto.getIdMesa()).orElse(null);
            pedido.setMesa(mesa);
        }

        if (dto.getFechaHora() != null) {
            try {
                pedido.setFechaHora(java.time.LocalDateTime.parse(dto.getFechaHora()));
            } catch (Exception e) {
                pedido.setFechaHora(java.time.LocalDateTime.now());
            }
        }

        pedido.setEstado(dto.getEstado());
        pedido.setTotal(dto.getTotal());

        return pedido;
    }

    public List<PedidoDTO> getAll() {
        System.out.println("🔍 Obteniendo todos los pedidos...");
        return pedidoRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PedidoDTO save(PedidoDTO dto) {
        Pedido pedido = convertToEntity(dto);
        Pedido saved = pedidoRepository.save(pedido);
        return convertToDTO(saved);
    }

    public void delete(Long id) {
        pedidoRepository.deleteById(id);
    }
}
