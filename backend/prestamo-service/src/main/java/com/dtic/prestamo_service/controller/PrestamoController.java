package com.dtic.prestamo_service.controller;


import org.springframework.web.bind.annotation.*;
import com.dtic.prestamo_service.models.Prestamo;
import com.dtic.prestamo_service.repository.PrestamoRepository;
import java.util.List;

@RestController
@RequestMapping("/prestamos")
@CrossOrigin
public class PrestamoController {
    private final PrestamoRepository prestamoRepository;

    public PrestamoController(PrestamoRepository prestamoRepository) {
        this.prestamoRepository = prestamoRepository;
    }

    @GetMapping
    public List<Prestamo> listar() {
        return prestamoRepository.findAll();
    }

    @PostMapping
    public Prestamo crear(@RequestBody Prestamo prestamo) {
        return prestamoRepository.save(prestamo);
    }

    @GetMapping("/por-programa/{programa}")
    public List<Prestamo> porPrograma(@PathVariable String programa) {
        return prestamoRepository.findByPrograma(programa);
    }
}
