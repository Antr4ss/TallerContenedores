package com.dtic.prestamo_service.service;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import com.dtic.prestamo_service.models.AulaDTO;
import java.util.List;

@FeignClient(name = "aula-service", url = "http://aula-service:8081/aulas")
public interface AulaClient {
    @GetMapping
    List<AulaDTO> obtenerAulas();
}
