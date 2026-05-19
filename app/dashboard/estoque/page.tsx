'use client';

import { useEffect } from 'react';
import { useStock } from '../../hooks/useStock';
import '../../formStyle.css';
import NavBar from '@/app/components/navbar';

export default function Estoque() {
    const {
        produtos, loading, listarProdutos, salvar, excluir, prepararEdicao,
        nome, setNome, descricao, setDescricao, preco, setPreco, url, setUrl,
        editandoId, limparFormulario
    } = useStock();

    useEffect(() => {
        listarProdutos();
    }, [listarProdutos]);

    return (
        <>
        <NavBar />

        <div className="login-container" style={{ padding: '20px', minHeight: '100vh' }}>
            
            <div className="login-card" style={{ width: '100%', maxWidth: '500px', marginBottom: '30px' }}>
                <h1>{editandoId ? 'Atualizar estoque' : 'Adicionar ao estoque'}</h1>
                
                <form onSubmit={salvar}>
                    <div className="input-group">
                        <input type="text" placeholder="Localização do produto" className="input-field"
                            value={nome} onChange={e => setNome(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <input type="number" placeholder="Quantidade" className="input-field"
                            value={descricao} onChange={e => setDescricao(e.target.value)} required />
                    </div>

                    
                    <div className="input-group">
                        <select className="input-field" name="id_produto" id="">
                            <option value="">produto 01</option>
                            <option value="">produto 02</option>
                            <option value="">produto 03</option>
                        </select>
                    </div>

                    <button type="submit" className="button">
                        {editandoId ? 'Atualizar estoque' : 'Adiconar ao estoque'}
                    </button>
                    {editandoId && (
                        <button type="button" onClick={limparFormulario} 
                                style={{ background: 'none', border: 'none', color: 'gray', marginTop: '10px', cursor: 'pointer' }}>
                            Cancelar Edição
                        </button>
                    )}
                </form>
            </div>
        </div>
        </>
    );
}