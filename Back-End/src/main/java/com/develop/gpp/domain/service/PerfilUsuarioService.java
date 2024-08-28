package com.develop.gpp.domain.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.develop.gpp.domain.entity.Account;
import com.develop.gpp.domain.entity.PerfilUsuario;
import com.develop.gpp.domain.entity.dto.AccountDTO;
import com.develop.gpp.domain.entity.dto.LoginDTO;
import com.develop.gpp.domain.repository.AccountRepository;
import com.develop.gpp.domain.repository.PerfilRepository;

@Service
public class PerfilUsuarioService {

    @Autowired
    private AccountRepository repository;

    @Autowired
    private PerfilRepository perfilRepository;

    public List<AccountDTO> getUser(String username) {
        List<AccountDTO> user = repository.buscarAccountDTO(username);
        System.out.println(username);
        if (user.isEmpty()) {

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado!");

        }
        return user;
    }

    public Account vincularPerfil(LoginDTO dto, Long id) {

        Optional<Account> user = repository.findByUsernameAndPassword(dto.getUsername(), dto.getPassword());

        Optional<PerfilUsuario> perfil = perfilRepository.findById(id);

        try {

            if (user.isPresent()) {

                if (perfil == null) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Perfil deve ser escolhido para fazer o vinculo!");
                }
                user.get().setPerfilUsuario(perfil.get());

            }

            return repository.save(user.get());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro ao vincular Perfil! " + e.getMessage());
        }

    }

}
