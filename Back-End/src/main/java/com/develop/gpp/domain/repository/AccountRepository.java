package com.develop.gpp.domain.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.develop.gpp.domain.entity.Account;
import com.develop.gpp.domain.entity.Vaga;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByUsernameAndPassword(String username, String password);

    Optional<Account> findByUsername(String username);

    @Query(value = "SELECT A.NAME AS NOME_USUARIO, PF.ID_PERFIL_USUARIO, PF.DESCRICAO AS DESCRICAO_PERFIL, "
                 + "V.ID AS ID_VAGA, V.DESCRICAO AS DESCRICAO_VAGA, V.TITULO AS TITULO_VAGA "   
                 + "FROM ACCOUNT A "
                 + "LEFT JOIN PERFIL_USUARIO PF ON PF.ID_PERFIL_USUARIO = A.ID_PERFIL_USUARIO "
                 + "LEFT JOIN ACCOUNT_VAGAS AV ON AV.ACCOUNT_ID = A.ID "
                 + "LEFT JOIN VAGAS V ON V.ID = AV.VAGA_ID "
                 + "WHERE A.USERNAME = :username", nativeQuery = true)
   List<Object[]> buscarAccountDTO(@Param("username") String username);



    List<Account> findByVagasContains(Vaga vaga);


    // pu.descricao, f.idFuncionalidade, f.nome, f.icone, f.situacao, sf.idSubfuncionalidade, sf.nome, sf.rota, sf.situacao

    // @Query("SELECT new com.develop.gpp.domain.entity.dto.AccountDTO("
    // + "a.id, a.name, a.username, a.ativo, "
    // + "pu.idPerfilUsuario, pu.descricao, "
    // + "f.idFuncionalidade, f.nome, f.icone, f.situacao, "
    // + "sf.idSubFuncionalidade, sf.nome, sf.rota, sf.situacao) "
    // + "FROM Account a "
    // + "LEFT JOIN a.perfilUsuario pu "
    // + "LEFT JOIN pu.perfilUsuarioFuncionalidades puf "
    // + "LEFT JOIN puf.funcionalidade f "
    // + "LEFT JOIN f.subFuncionalidades sf "
    // + "WHERE a.username = :username")
    // List<AccountDTO> buscarAccountDTO(@Param("username") String username);
}
