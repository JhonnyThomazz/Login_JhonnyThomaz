'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import Swal from 'sweetalert2'

export function useCad() {
  const router = useRouter();

  // Estados simples e separados, iguais aos do cadastro de produtos
  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Função disparada ao clicar no botão Entrar
  function cadastrar(evento: React.FormEvent) {
    evento.preventDefault(); // Evita que a página recarregue

    // Montamos o objeto que vai para a API
    const dadosLogin = {
      nome: nome,
      username: username,
      password: password
    };

    api.post('/users/', dadosLogin)
      .then((resposta) => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuário criado com sucesso!",
            showConfirmButton: false,
            timer: 1600
        });

        // Vai para a página principal (Dashboard)
        router.push('/');
      })
      .catch(() => {
        // Mostra o erro simples se a senha estiver errado
        if(password.length < 8) {
        Swal.fire({
            title: "Oops!",
            text: "A senha precisa de no mínimo 8 caracteres!",
            icon: "error",
            confirmButtonColor: " rgb(235, 0, 0)"
        });
      }

      else{
        Swal.fire({
            title: "Oops!",
            text: "Erro ao criar conta... Tente novamente!",
            icon: "error",
            confirmButtonColor: "rgb(11, 212, 34)"
        })
      }
      });
    
      

  }

  // Exportamos tudo que a tela vai precisar
  return {
    nome, setNome,
    username, setUsername,
    password, setPassword,
    cadastrar
  };
}