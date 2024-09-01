package com.develop.gpp.domain.entity.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class AccountDTO {

    private String nomeUsuario;
    private Long idUsuario;
    private Long idPerfilUsuario;
    private String descricaoPerfil;
    private List<VagaDTO> vagas;

    public AccountDTO(String nomeUsuario, Long idPerfilUsuario, String descricaoPerfil, List<VagaDTO> vagas,Long idUsuario) {
        this.nomeUsuario = nomeUsuario;
        this.idPerfilUsuario = idPerfilUsuario;
        this.descricaoPerfil = descricaoPerfil;
        this.vagas = vagas;
        this.idUsuario = idUsuario;
    }
}