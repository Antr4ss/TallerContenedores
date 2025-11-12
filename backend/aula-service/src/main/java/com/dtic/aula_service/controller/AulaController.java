package com.dtic.aula_service.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dtic.aula_service.models.Aula;
import com.dtic.aula_service.repository.AulaRepository;

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
    public ResponseEntity<?> eliminarAula(@PathVariable Long id) {
        if (aulaRepository.existsById(id)) {
            aulaRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
}

}
