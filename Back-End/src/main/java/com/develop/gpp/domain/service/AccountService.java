package com.develop.gpp.domain.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.develop.gpp.domain.entity.Account;
import com.develop.gpp.domain.entity.dto.LoginDTO;
import com.develop.gpp.domain.entity.dto.RegisterDTO;
import com.develop.gpp.domain.repository.AccountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {

    @Autowired
    private AccountRepository repository;
    
    public ResponseEntity<Account> register(RegisterDTO dto) {
        existsByUsername(dto.getUsername());
        Account novoUser =  new Account();
        if (dto != null) {
            if (dto.getName() == null || dto.getName().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome é obrigatório!");
            }else if(dto.getUsername() == null || dto.getUsername().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário é obrigatório!");
            }else if(dto.getPassword() == null || dto.getPassword().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha é obrigatória!");
            }
        }
        novoUser.setName(dto.getName());
        novoUser.setAtivo(1);//- 1 Sim,2-Não;
        novoUser.setPassword(dto.getPassword());
        novoUser.setUsername(dto.getUsername());
        novoUser.setPerfilUsuario(null);
        repository.save(novoUser);
        return new ResponseEntity<Account>(novoUser,HttpStatus.CREATED);
    }

    public Account getByLogin(LoginDTO dto) {
        Optional<Account> acc = repository.findByUsernameAndPassword(dto.getUsername(), dto.getPassword());

        if (acc.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalido Usuário ou Senha");
        } else if (acc.get().getPerfilUsuario() == null) {

            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Usuário sem perfil vinculado! Solicite acesso ao Administrador do sistema!");
        }

        return acc.get();
    }

    private void existsByUsername(String username) {
        if (repository.findByUsername(username).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário já registrado!");
        }
    }
}
