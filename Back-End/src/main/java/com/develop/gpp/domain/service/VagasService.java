package com.develop.gpp.domain.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.Optional;
import com.develop.gpp.domain.entity.Account;
import com.develop.gpp.domain.entity.Vaga;
import com.develop.gpp.domain.entity.dto.AccountVagaDTO;
import com.develop.gpp.domain.entity.dto.VagaAccountDTO;
import com.develop.gpp.domain.repository.AccountRepository;
import com.develop.gpp.domain.repository.VagasRepository;

@Service
public class VagasService {

    @Autowired
    private VagasRepository vagasRepository;

    @Autowired
    private AccountRepository accountRepository;

    public ResponseEntity<List<Vaga>> todasVagas() {
        List<Vaga>vagas = vagasRepository.findAll();
        return ResponseEntity.ok(vagas);
    }

    public ResponseEntity<Vaga> novaVaga(Vaga vaga) {
        if (vaga != null) {
            if (vaga.getDescricao() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Descrição da vaga deve ser informada!");
            }
            if (vaga.getTitulo() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Título da vaga deve ser informada!");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Dados inválidos. Verifique!");
        }

        vagasRepository.save(vaga);
        return new ResponseEntity<Vaga>(vaga, HttpStatus.CREATED);
    }

    public ResponseEntity<Vaga> updateVaga(Integer id, Vaga vagaAtualizada) {
        Optional<Vaga> vagaExistente = vagasRepository.findById(id);
        if (vagaExistente.isPresent()) {
            Vaga vaga = vagaExistente.get();
            if (vagaAtualizada.getDescricao() != null) {
                vaga.setDescricao(vagaAtualizada.getDescricao());
            }
            if (vagaAtualizada.getTitulo() != null) {
                vaga.setTitulo(vagaAtualizada.getTitulo());
            }

            vagasRepository.save(vaga);
            return new ResponseEntity<>(vaga, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vaga não encontrada!");
        }
    }
    public ResponseEntity<Void> deleteVaga(Integer id) {
        Optional<Vaga> vagaExistente = vagasRepository.findById(id);
        if (vagaExistente.isPresent()) {
            Vaga vaga = vagaExistente.get();

            List<Account> accounts = accountRepository.findByVagasContains(vaga);
            for (Account account : accounts) {
                account.getVagas().remove(vaga);
                accountRepository.save(account);
            }

            vagasRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vaga não encontrada!");
        }
    }

    public ResponseEntity<String> cadastrarNaVaga(Long accountId, Integer vagaId) {
        Optional<Account> accountOpt = accountRepository.findById(accountId);
        Optional<Vaga> vagaOpt = vagasRepository.findById(vagaId);

        if (accountOpt.isPresent() && vagaOpt.isPresent()) {
            Account account = accountOpt.get();
            Vaga vaga = vagaOpt.get();

            if (account.getVagas().contains(vaga)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Candidato já está cadastrado nessa vaga!");
            }

            account.getVagas().add(vaga);
            accountRepository.save(account);

            return new ResponseEntity<>("Cadastrado realizado com sucesso!", HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Conta ou Vaga não encontrada!");
        }
    }

    public List<VagaAccountDTO> getVagasComCandidatos() {
        List<Object[]> resultados =  vagasRepository.vagasUsuarios();
        
        Map<Integer, VagaAccountDTO> vagasMap = new HashMap<>();
        
        for (Object[] resultado : resultados) {
            Integer idVagaResult = (Integer) resultado[0];  
            String descricaoVaga = (String) resultado[1];   
            String tituloVaga = (String) resultado[2];      
            String nomeUsuario = (String) resultado[3];     
            
            VagaAccountDTO vaga = vagasMap.get(idVagaResult);
            
            if (vaga == null) {
                vaga = new VagaAccountDTO(idVagaResult, descricaoVaga, tituloVaga, new ArrayList<>());
                vagasMap.put(idVagaResult, vaga);
            }
            
            if (nomeUsuario != null) {
                vaga.getCadidatos().add(new AccountVagaDTO(nomeUsuario));
            }
        }
    
        return new ArrayList<>(vagasMap.values());
    }
}


