package com.develop.gpp.domain.service;

import java.util.ArrayList;
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
import com.develop.gpp.domain.entity.dto.VagaDTO;
import com.develop.gpp.domain.repository.AccountRepository;
import com.develop.gpp.domain.repository.PerfilRepository;

@Service
public class PerfilUsuarioService {

    @Autowired
    private AccountRepository repository;

    @Autowired
    private PerfilRepository perfilRepository;

    public AccountDTO getUser(String username) {
        System.out.println(username);
        List<Object[]> userVagas = repository.buscarAccountDTO(username);
        AccountDTO account = montarAccountComVagas(userVagas);
        return account;
    }

    private AccountDTO montarAccountComVagas(List<Object[]> resultados) {
        String nomeUsuario = null;
        Long idPerfilUsuario = null;
        String descricaoPerfil = null;
        List<VagaDTO> vagas = new ArrayList<>();
    
        for (Object[] row : resultados) {
            if (nomeUsuario == null) {
                nomeUsuario = (String) row[0]; 
                idPerfilUsuario = (Long) row[1]; 
                descricaoPerfil = (String) row[2]; 
            }
    
            Integer idVaga = (Integer) row[3];
            String descricaoVaga = (String) row[4];
            String tituloVaga = (String) row[5];
    
            vagas.add(new VagaDTO(idVaga, descricaoVaga, tituloVaga));
        }
    
        return new AccountDTO(nomeUsuario, idPerfilUsuario, descricaoPerfil, vagas);
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
