package com.dtic.reporte_service.service;


import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.dtic.reporte_service.models.PrestamoDTO;

@FeignClient(name = "prestamo-service", url = "http://prestamo-service:8080/prestamos")
public interface PrestamoClient {
    @GetMapping
    List<PrestamoDTO> obtenerPrestamos();
}
