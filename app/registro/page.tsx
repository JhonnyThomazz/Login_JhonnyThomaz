'use client';
import Link from 'next/link';
import { useCad } from '../hooks/useCad';
import "../formStyle.css"

export default function Home() {
  // Puxamos as funções e variáveis do nosso Hook
  const { 
    nome, setNome,
    username, setUsername, 
    password, setPassword, 
    cadastrar 
  } = useCad();

  return (
    <div className="login-container">
        <div className="msn"><img src="msn.png"/></div>
      <div className="login-card">
        <h1>Área de Cadastro</h1>
        
        {/* Quando o formulário for submetido, chama a função entrar */}
        <form onSubmit={cadastrar}>
          
          <div className="input-group">
            <input
              type="text"
              placeholder="Digite seu Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)} // Atualiza apenas o userName
              className="input-field"
              required
            />
          </div>

          
          <div className="input-group">
            <input
              type="text"
              placeholder="Digite seu Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Atualiza apenas o userName
              className="input-field"
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Digite sua Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza apenas o password
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Criar conta
          </button>
        </form>

        <div className="footer-link">
          <span>Já possui uma conta? </span>
          <Link href="./">Faça login aqui</Link>
        </div>
      </div>
    </div>
  );
}