package com.develop.gpp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.develop.gpp.domain.entity.Vaga;
import com.develop.gpp.domain.entity.dto.VagaAccountDTO;
import com.develop.gpp.domain.service.VagasService;

import java.util.List;

@RestController
@RequestMapping("/api/vagas")
public class VagasController {

    @Autowired
    private VagasService vagasService;

    @GetMapping
    public ResponseEntity<List<Vaga>> listarTodasVagas() {
        return vagasService.todasVagas();
    }

    @PostMapping
    public ResponseEntity<Vaga> criarVaga(@RequestBody Vaga vaga) {
        return vagasService.novaVaga(vaga);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vaga> atualizarVaga(@PathVariable Integer id, @RequestBody Vaga vagaAtualizada) {
        return vagasService.updateVaga(id, vagaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVaga(@PathVariable Integer id) {
        return vagasService.deleteVaga(id);
    }

    @PostMapping("/cadastrar/{vagaId}/{accountId}")
    public ResponseEntity<String> cadastrarNaVaga(@PathVariable Integer vagaId, @PathVariable Long accountId) {
        return vagasService.cadastrarNaVaga(accountId, vagaId);
    }

    @GetMapping("/vagas/candidatos")
    public ResponseEntity<List<VagaAccountDTO>> getVagasComCandidatos() {
     List<VagaAccountDTO> vagasComCandidatos = vagasService.getVagasComCandidatos();
      return ResponseEntity.ok(vagasComCandidatos);
    }
}
