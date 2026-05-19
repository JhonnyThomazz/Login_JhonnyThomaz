'use client';

import { useState, useCallback } from 'react';
import api from '../lib/api';
import { Produto } from '../types/produtos';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export function useProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Estados para o formulário (seguindo seu padrão de states separados)
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [url, setUrl] = useState('');
    const [editandoId, setEditandoId] = useState<number | null>(null);

    // GET - Listar
    const listarProdutos = useCallback(async () => {
        setLoading(true);
        try {
            const resposta = await api.get('/produtos/');
            setProdutos(resposta.data);
        } catch (error) {
            Swal.fire({
                title: "Oops...!",
                text: "Erro ao buscar o produto!",
                icon: "error",
                showConfirmButton: true,
                confirmButtonColor: "rgb(212, 11, 11)"
            });
        } finally {
            setLoading(false);
        }
    }, []);

    // POST / PUT - Salvar
    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();
        const dados: Produto = { nome, descricao, preco: Number(preco), url };

        try {
            if (editandoId) {
                await api.put(`/produtos/${editandoId}`, dados);
            } else {
                await api.post('/produtos/', dados);
            }
            limparFormulario();
            Swal.fire({
                title: "sucesso!",
                text: "Produto cadastrado com sucesso.",
                icon: "success",
                showConfirmButton: true,
                confirmButtonColor: "rgb(11, 212, 34)"
            });
            router.push('/dashboard');
        } catch (error) {
            Swal.fire({
                title: "Oops...!",
                text: "Erro ao cadastrar o produto!",
                icon: "error",
                showConfirmButton: true,
                confirmButtonColor: "rgb(212, 11, 11)"
            });
        }
    };

    // DELETE
    const excluir = async (id: number) => {
        if (!confirm("Excluir este produto?")) return;
        try {
            await api.delete(`/produtos/${id}`);
            listarProdutos();
        } catch (error) {
            Swal.fire({
                title: "Oops...!",
                text: "Erro ao excluir o produto!",
                icon: "error",
                showConfirmButton: true,
                confirmButtonColor: "rgb(212, 11, 11)"
            });
        }
    };

    const prepararEdicao = (p: Produto) => {
        setEditandoId(p.id!);
        setNome(p.nome);
        setDescricao(p.descricao);
        setPreco(p.preco.toString());
        setUrl(p.url);
    };

    const limparFormulario = () => {
        setEditandoId(null);
        setNome('');
        setDescricao('');
        setPreco('');
        setUrl('');
    };

    return {
        produtos, loading, listarProdutos, salvar, excluir, prepararEdicao,
        nome, setNome, descricao, setDescricao, preco, setPreco, url, setUrl,
        editandoId, limparFormulario
    };
}