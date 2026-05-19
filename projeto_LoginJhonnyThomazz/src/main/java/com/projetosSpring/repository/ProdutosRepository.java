package com.projetosSpring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetosSpring.entity.Produtos;

public interface ProdutosRepository extends JpaRepository<Produtos, Long>{

}
