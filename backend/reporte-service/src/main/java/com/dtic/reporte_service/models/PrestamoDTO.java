package com.dtic.reporte_service.models;


import java.time.LocalDateTime;

public class PrestamoDTO {
    private Long id;
    private Long aulaId;
    private String estudiante;
    private String programa;
    private LocalDateTime inicio;
    private LocalDateTime fin;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getAulaId() {
        return aulaId;
    }
    public void setAulaId(Long aulaId) {
        this.aulaId = aulaId;
    }
    public String getEstudiante() {
        return estudiante;
    }
    public void setEstudiante(String estudiante) {
        this.estudiante = estudiante;
    }
    public String getPrograma() {
        return programa;
    }
    public void setPrograma(String programa) {
        this.programa = programa;
    }
    public LocalDateTime getInicio() {
        return inicio;
    }
    public void setInicio(LocalDateTime inicio) {
        this.inicio = inicio;
    }
    public LocalDateTime getFin() {
        return fin;
    }
    public void setFin(LocalDateTime fin) {
        this.fin = fin;
    }

    
}
