package com.projetosSpring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetosSpring.entity.Produtos;
import com.projetosSpring.service.ProdutosService;

@RestController
@RequestMapping("/produtos")
public class ProdutosController {

	final private ProdutosService produtosService;
	
	public ProdutosController(ProdutosService produtosService) {
		this.produtosService = produtosService;
	}
	
	@GetMapping ("/{id}")
	public ResponseEntity <Produtos> GetProdutosById(@PathVariable Long id){
		Produtos produtos = produtosService.GetProdutosById(id);
		if (produtos != null) {
			return ResponseEntity.ok(produtos);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping ("/")
	public ResponseEntity <List<Produtos>> GetAllProdutos(){
		List <Produtos> produtos = produtosService.GetAllProdutos();
		return ResponseEntity.ok(produtos);
	}
	
	@PostMapping ("/")
	public ResponseEntity <Produtos> SaveProdutos(@RequestBody Produtos produtos){
		Produtos saveProdutos = produtosService.SaveProdutos(produtos);
		return ResponseEntity.status(HttpStatus.CREATED).body(saveProdutos);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity <Produtos> UpdateProdutos(@PathVariable Long id, @RequestBody Produtos produtos){
		Produtos updateProdutos = produtosService.UpdateProdutos(id, produtos);
		if(updateProdutos != null) {
			return ResponseEntity.ok(updateProdutos);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity <Produtos> DeleteProdutos(@PathVariable Long id){
		boolean deleteProdutos = produtosService.DeleteProdutos(id);
		if(deleteProdutos) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
}

