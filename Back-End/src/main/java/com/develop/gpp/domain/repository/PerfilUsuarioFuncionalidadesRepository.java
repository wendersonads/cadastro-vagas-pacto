package com.develop.gpp.domain.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.develop.gpp.domain.entity.PerfilUsuarioFuncionalidade;

@Repository
public interface PerfilUsuarioFuncionalidadesRepository extends JpaRepository<PerfilUsuarioFuncionalidade,Integer>{

    List<PerfilUsuarioFuncionalidade> findByPerfilUsuario(Integer id);
    
}
