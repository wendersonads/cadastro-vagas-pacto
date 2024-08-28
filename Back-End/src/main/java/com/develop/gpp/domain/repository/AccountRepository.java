package com.develop.gpp.domain.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.develop.gpp.domain.entity.Account;
import com.develop.gpp.domain.entity.dto.AccountDTO;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByUsernameAndPassword(String username, String password);

    Optional<Account> findByUsername(String username);

    @Query("SELECT new com.develop.gpp.domain.entity.dto.AccountDTO(pu.descricao, f.nome, f.icone, sf.nome, sf.rota )"
            + "FROM Account a "
            + "LEFT JOIN a.perfilUsuario pu "
            + "LEFT JOIN pu.perfilUsuarioFuncionalidades puf "
            + "LEFT JOIN puf.funcionalidade f "
            + "LEFT JOIN f.subFuncionalidades sf "
            + "WHERE a.username = :username")
    List<AccountDTO> buscarAccountDTO(@Param("username") String username);

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
