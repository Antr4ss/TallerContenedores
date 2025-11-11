package com.dtic.reporte_service.controller;

import org.springframework.web.bind.annotation.*;
import com.dtic.reporte_service.service.PrestamoClient;
import com.dtic.reporte_service.models.PrestamoDTO;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;



@RestController
@RequestMapping("/reportes")
@CrossOrigin
public class ReporteController {

    private final PrestamoClient prestamoClient;

    public ReporteController(PrestamoClient prestamoClient) {
        this.prestamoClient = prestamoClient;
    }

    @GetMapping("/frecuencia")
    public Map<String, Long> frecuenciaPorPrograma() {
        List<PrestamoDTO> prestamos = prestamoClient.obtenerPrestamos();
        return prestamos.stream()
                .collect(Collectors.groupingBy(PrestamoDTO::getPrograma, Collectors.counting()));
    }

    @GetMapping("/horario-frecuente")
    public String horarioMasFrecuente() {
        List<PrestamoDTO> prestamos = prestamoClient.obtenerPrestamos();
        Map<Integer, Long> horas = prestamos.stream()
                .filter(p -> p.getInicio() != null) // <--- agregado: evitar NPE
                .collect(Collectors.groupingBy(p -> p.getInicio().getHour(), Collectors.counting()));
        return horas.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(e -> "Hora con más préstamos: " + e.getKey() + ":00 (" + e.getValue() + " veces)")
                .orElse("No hay datos");
    }

    @GetMapping("/frecuencia-semana")
    public Map<String, Long> frecuenciaSemanalPorPrograma() {
        LocalDateTime desde = LocalDateTime.now().minusWeeks(1);
        List<PrestamoDTO> prestamos = prestamoClient.obtenerPrestamos();
        return prestamos.stream()
                .filter(p -> p.getInicio() != null && p.getInicio().isAfter(desde))
                .collect(Collectors.groupingBy(PrestamoDTO::getPrograma, Collectors.counting()));
    }

    @GetMapping("/frecuencia-mes")
    public Map<String, Long> frecuenciaMensualPorPrograma() {
        LocalDateTime desde = LocalDateTime.now().minusMonths(1);
        List<PrestamoDTO> prestamos = prestamoClient.obtenerPrestamos();
        return prestamos.stream()
                .filter(p -> p.getInicio() != null && p.getInicio().isAfter(desde))
                .collect(Collectors.groupingBy(PrestamoDTO::getPrograma, Collectors.counting()));
    }

    @GetMapping("/frecuencia-aulas")
    public Map<Long, Long> frecuenciaPorAula() {
        List<PrestamoDTO> prestamos = prestamoClient.obtenerPrestamos();
        return prestamos.stream()
                .filter(p -> p.getAulaId() != null)
                .collect(Collectors.groupingBy(PrestamoDTO::getAulaId, Collectors.counting()));
    }
}
