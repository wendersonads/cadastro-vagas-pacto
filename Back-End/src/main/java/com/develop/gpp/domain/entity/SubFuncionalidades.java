package com.develop.gpp.domain.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "sub_funcionalidadades")
public class SubFuncionalidades {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSubfuncionalidade;

    @ManyToOne
    @JoinColumn(name = "id_funcionalidade")
    private FuncionalidadesModel funcionalidade;

    private String nome;

    private String rota;

    private Integer situacao;

}
