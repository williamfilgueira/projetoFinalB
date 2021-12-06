package br.atos.projetoFinal.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.atos.projetoFinal.models.Produto;

@Repository
public interface ProdutoRepository extends  JpaRepository<Produto, Long>{

}
