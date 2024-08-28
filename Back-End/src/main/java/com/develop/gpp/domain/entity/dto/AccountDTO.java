package com.develop.gpp.domain.entity.dto;

import lombok.Getter;

@Getter
public class AccountDTO {

    private String descricao;
    private String nomeFuncionalidade;
    private String icone;
    private String nomeSubFuncionalidade;
    private String rota;

    public AccountDTO(String descricao, String nomeFuncionalidade, String icone, String nomeSubFuncionalidade, String rota
    //                   String descricaoPerfil, 
    //                   Long idFuncionalidade, String nomeFuncionalidade, 
    //                   String iconeFuncionalidade, String situacaoFuncionalidade, 
    //                   Long idSubFuncionalidade, String nomeSubFuncionalidade, 
    //                   String rotaSubFuncionalidade, String situacaoSubFuncionalidade
    ) {
       
        this.descricao = descricao;
        this.nomeFuncionalidade = nomeFuncionalidade;
        this.icone = icone;
        this.nomeSubFuncionalidade = nomeSubFuncionalidade;
        this.rota = rota;
       
    }
}