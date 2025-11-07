package com.example.lab012.repository;

import com.example.lab012.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
public interface FacturaRepository extends JpaRepository<Factura, Long> {}
