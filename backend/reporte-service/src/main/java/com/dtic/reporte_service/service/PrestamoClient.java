package com.dtic.reporte_service.service;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import com.dtic.reporte_service.models.PrestamoDTO;
import java.util.List;

@FeignClient(name = "prestamo-service", url = "http://prestamo-service:8082/prestamos")
public interface PrestamoClient {
    @GetMapping
    List<PrestamoDTO> obtenerPrestamos();
}
