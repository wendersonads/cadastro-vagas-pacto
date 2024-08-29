package com.develop.gpp.domain.entity.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class VagaAccountDTO {
    private Integer idVaga;
    private String descricaoVaga;
    private String tituloVaga;
    private List<AccountVagaDTO> cadidatos;

    public VagaAccountDTO(Integer idVaga, String descricaoVaga, String tituloVaga, List<AccountVagaDTO> cadidatos) {
        this.idVaga = idVaga;
        this.descricaoVaga = descricaoVaga;
        this.tituloVaga = tituloVaga;
        this.cadidatos = cadidatos;
    }
}
