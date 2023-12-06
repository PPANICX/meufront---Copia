import axios, { AxiosResponse } from 'axios';
import Produto from '../src/app/core/produto';

export interface ApiResponse {
    id: number;
    nome: string;
    preco: string;
    descricao: string;
}

const BASE_URL = 'http://localhost:8080';

export const fetchProdutos = async (): Promise<Produto[]> => {
    try {
        const response: AxiosResponse<ApiResponse[]> = await axios.get(`${BASE_URL}/api/products`);

        console.log('Resposta completa da API:', response);

        if (!response.data) {
            throw new Error('Dados da API não estão no formato esperado.');
        }

        const produtos: Produto[] = response.data;
        console.log('Dados recebidos:', produtos);

        return produtos;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw new Error('Erro ao buscar produtos');
    }
};


export const cadastrarProduto = async (produto: Produto): Promise<Produto> => {
    try {
        const response = await axios.post<Produto>(`${BASE_URL}/api/products`, produto);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        throw new Error("A função deveria ter retornado um valor, mas ocorreu um erro.");
    }
};


export const atualizarProduto = async (produto: Produto): Promise<Produto> => {
    try {
        const response = await axios.put<Produto>(`${BASE_URL}/api/products/${produto.id}`, produto);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        throw error;
    }
};



export const excluirProduto = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/api/products/${id}`);
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        throw error;
    }
};