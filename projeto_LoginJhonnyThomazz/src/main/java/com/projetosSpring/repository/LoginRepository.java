package com.projetosSpring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetosSpring.entity.Login;

public interface LoginRepository extends JpaRepository<Login, Long> {
	Login findByUsername(String username);
}
