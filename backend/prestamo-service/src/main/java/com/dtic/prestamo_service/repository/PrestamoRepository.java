package com.dtic.prestamo_service.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.dtic.prestamo_service.models.Prestamo;
import java.util.List;

public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {
    List<Prestamo> findByPrograma(String programa);
}
