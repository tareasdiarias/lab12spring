package com.example.lab012.model;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "platinsumo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlatoInsumo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPlatoInsumo;
    @ManyToOne
    @JoinColumn(name = "idPlato")
    private Plato plato;
    @ManyToOne
    @JoinColumn(name = "idInsumo")
    private Insumo insumo;
    private double cantidadUsada;
}

