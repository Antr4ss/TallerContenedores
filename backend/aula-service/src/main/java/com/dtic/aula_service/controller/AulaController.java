package com.dtic.aula_service.controller;

import org.springframework.web.bind.annotation.*;
import com.dtic.aula_service.models.Aula;
import com.dtic.aula_service.repository.AulaRepository;
import java.util.List;

@RestController
@RequestMapping("/aulas")
@CrossOrigin
public class AulaController {
    private final AulaRepository aulaRepository;

    public AulaController(AulaRepository aulaRepository) {
        this.aulaRepository = aulaRepository;
    }

    @GetMapping
    public List<Aula> listar() {
        return aulaRepository.findAll();
    }

    @PostMapping
    public Aula crear(@RequestBody Aula aula) {
        return aulaRepository.save(aula);
    }

    @PutMapping("/{id}")
    public Aula actualizar(@PathVariable Long id, @RequestBody Aula datos) {
        return aulaRepository.findById(id).map(aula -> {
            aula.setNombre(datos.getNombre());
            aula.setCapacidad(datos.getCapacidad());
            aula.setUbicacion(datos.getUbicacion());
            aula.setTipo(datos.getTipo());
            return aulaRepository.save(aula);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        aulaRepository.deleteById(id);
    }
}

