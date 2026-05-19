package com.projetosSpring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.projetosSpring.entity.Produtos;
import com.projetosSpring.repository.ProdutosRepository;

@Service
public class ProdutosService {

final private ProdutosRepository produtosRepository;
	
	public ProdutosService (ProdutosRepository produtosRepository) {
		this.produtosRepository = produtosRepository;
	}
	
	public Produtos GetProdutosById(Long id) {
		return produtosRepository.findById(id).orElse(null);
	}
	
	public List<Produtos> GetAllProdutos(){
		return produtosRepository.findAll();
	}
	
	public Produtos SaveProdutos(Produtos produtos) {
		return produtosRepository.save(produtos);
	}
	
	public Produtos UpdateProdutos(Long id, Produtos produtos) {
		Optional<Produtos> produtosExists = produtosRepository.findById(id);
		if(produtosExists.isPresent()) {
			Produtos UpdateProdutos = produtosExists.get();
			BeanUtils.copyProperties(produtos, UpdateProdutos, "id");
			return produtosRepository.save(UpdateProdutos);
		}
		return null;
	}
	
	public Boolean DeleteProdutos(Long id) {
		Optional <Produtos> produtosExists = produtosRepository.findById(id);
		if(produtosExists.isPresent()) {
			produtosRepository.deleteById(id);
			return true;
		}
		else {
			return false;
		}
	}
}
