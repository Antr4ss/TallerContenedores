package com.dtic.aula_service.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.dtic.aula_service.models.Aula;

public interface AulaRepository extends JpaRepository<Aula, Long> {
}
