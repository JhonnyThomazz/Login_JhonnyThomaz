package com.projetosSpring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.projetosSpring.entity.Login;
import com.projetosSpring.repository.LoginRepository;

@Service
public class LoginService {

	final private LoginRepository loginRepository;
	
	public LoginService (LoginRepository loginRepository) {
		this.loginRepository = loginRepository;
	}
	
	public Login authenticate(String username, String passwd) {
		Login user = loginRepository.findByUsername(username);
		
		if(user != null && user.getPassword().equals(passwd)) {
			return user;
		}
		return null;
	}
	
	public Login GetLoginById(Long id) {
		return loginRepository.findById(id).orElse(null);
	}
	
	public List<Login> GetAllLogin(){
		return loginRepository.findAll();
	}
	
	public Login SaveLogin(Login login) {
		return loginRepository.save(login);
	}
	
	public Login UpdateLogin(Long id, Login login) {
		Optional<Login> loginExists = loginRepository.findById(id);
		if(loginExists.isPresent()) {
			Login UpdateLogin = loginExists.get();
			BeanUtils.copyProperties(login, UpdateLogin, "id");
			return loginRepository.save(UpdateLogin);
		}
		return null;
	}
	
	public Boolean DeleteLogin(Long id) {
		Optional <Login> loginExists = loginRepository.findById(id);
		if(loginExists.isPresent()) {
			loginRepository.deleteById(id);
			return true;
		}
		else {
			return false;
		}
	}
}
