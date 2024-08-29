package com.develop.gpp.domain.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.develop.gpp.domain.entity.Vaga;

public interface VagasRepository extends JpaRepository<Vaga, Integer>{

    @Query(value = "SELECT V.ID AS ID_VAGA, V.DESCRICAO AS DESCRICAO_VAGA, V.TITULO AS TITULO_VAGA, "
    + "AC.NAME AS NOME_USUARIO "
    + "FROM VAGAS V "
    + "LEFT JOIN ACCOUNT_VAGAS AV ON AV.VAGA_ID = V.ID "
    + "LEFT JOIN ACCOUNT AC ON AC.ID = AV.ACCOUNT_ID", 
    nativeQuery = true)   
    List<Object[]> vagasUsuarios();
}
