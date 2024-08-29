package com.develop.gpp.domain.entity.dto;

import lombok.Getter;

@Getter
public class AccountVagaDTO {
    
    private String nomeUsuario;

    public AccountVagaDTO(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }
}
