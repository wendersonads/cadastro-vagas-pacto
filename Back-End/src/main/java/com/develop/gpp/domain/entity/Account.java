package com.develop.gpp.domain.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String name;

    private String username;

    private String password;

    private Integer ativo;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_perfil_usuario")
    private PerfilUsuario perfilUsuario;
}
