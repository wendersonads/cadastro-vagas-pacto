package com.develop.gpp.domain.entity.dto;

import lombok.Getter;

@Getter
public class VagaDTO {
    private Integer idVaga;
    private String descricaoVaga;
    private String tituloVaga;

    public VagaDTO(Integer idVaga, String descricaoVaga, String tituloVaga) {
        this.idVaga = idVaga;
        this.descricaoVaga = descricaoVaga;
        this.tituloVaga = tituloVaga;
    }
}
