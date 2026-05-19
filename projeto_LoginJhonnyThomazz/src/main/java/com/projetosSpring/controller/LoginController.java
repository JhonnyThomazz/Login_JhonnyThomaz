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

import com.projetosSpring.entity.Login;
import com.projetosSpring.service.LoginService;

@RestController
@RequestMapping("/users")
public class LoginController {

	final private LoginService loginService;
	
	public LoginController(LoginService loginService) {
		this.loginService = loginService;
	}
	
	@PostMapping("/auth")
	public ResponseEntity <Login> authenticate(@RequestBody Login loginDetails){
		Login authenticatedUser = loginService.authenticate(loginDetails.getUsername(), loginDetails.getPassword());
		
		if(authenticatedUser != null) {
			authenticatedUser.setPassword(null);
			return ResponseEntity.ok(authenticatedUser);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}
	
	@GetMapping ("/{id}")
	public ResponseEntity <Login> GetLoginById(@PathVariable Long id){
		Login login = loginService.GetLoginById(id);
		if (login != null) {
			return ResponseEntity.ok(login);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping ("/")
	public ResponseEntity <List<Login>> GetAllLogin(){
		List <Login> login = loginService.GetAllLogin();
		return ResponseEntity.ok(login);
	}
	
	@PostMapping ("/")
	public ResponseEntity <Login> SaveLogin(@RequestBody Login login){
		Login saveLogin = loginService.SaveLogin(login);
		return ResponseEntity.status(HttpStatus.CREATED).body(saveLogin);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity <Login> UpdateLogin(@PathVariable Long id, @RequestBody Login login){
		Login updateLogin = loginService.UpdateLogin(id, login);
		if(updateLogin != null) {
			return ResponseEntity.ok(updateLogin);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity <Login> DeleteLogin(@PathVariable Long id){
		boolean deleteLogin = loginService.DeleteLogin(id);
		if(deleteLogin) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
}
