package com.develop.gpp.domain.entity.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class AccountDTO {

    private String nomeUsuario;
    private Long idPerfilUsuario;
    private String descricaoPerfil;
    private List<VagaDTO> vagas;
    private Integer idVaga;
    private String descricaoVaga;
    private String tituloVaga;

    public AccountDTO(String nomeUsuario, Long idPerfilUsuario, String descricaoPerfil, List<VagaDTO> vagas) {
        this.nomeUsuario = nomeUsuario;
        this.idPerfilUsuario = idPerfilUsuario;
        this.descricaoPerfil = descricaoPerfil;
        this.vagas = vagas;
        // this.idVaga = idVaga;
        // this.descricaoVaga = descricaoVaga;
        // this.tituloVaga = tituloVaga;
    }
}