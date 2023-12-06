"use client"
import { useEffect, useState } from "react";
import Produto from "./core/produto";
import { atualizarProduto, cadastrarProduto, excluirProduto, fetchProdutos } from "../../service/produtoService";
import Layout from "./components/produtos/layout";
import Botao from "./components/produtos/botao";
import Tabela from "./components/produtos/tabela";
import Formulario from "./components/formulario";

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[] | undefined>(undefined);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const produtosData = await fetchProdutos();
        setProdutos(produtosData);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchDataFromApi();
  }, []);

  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela');
  const [produto, setProduto] = useState<Produto>(Produto.vazio());

  async function fetchData() {
    try {
      const produtosData = await fetchProdutos();
      setProdutos(produtosData);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  }

  function produtoSelecionado(produto: Produto) {
    setProduto(produto);
    setVisivel("form");
  }

  async function produtoExcluido(produto: Produto) {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este produto?");
    if (confirmacao) {
      try {
        if (produto.id !== null) {
          await excluirProduto(produto.id);
          setProdutos(prevProdutos => prevProdutos?.filter(pr => pr.id !== produto.id));
        } else {
          console.error("produtoId é null!");
        }
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
      }
    }
  }

  async function salvarOuAlterarProduto(produto: Produto) {
    try {
      if (produto.id) {
        await atualizarProduto(produto);
      } else {
        await cadastrarProduto(produto);
      }
      setVisivel("tabela");
      fetchData();
    } catch (error) {
      console.error("Erro ao salvar ou alterar produto:", error);
    }
  }

  function novoProduto() {
    setProduto(Produto.vazio());
    setVisivel("form");
  }

  return (
    <div className={`
 flex justify-center items-center h-screen`}>
      <Layout titulo="Cadastro de Produtos">
        {visivel == "tabela" ? (
          <> <div className="flex justify-end">
            <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700"
              onClick={() => novoProduto()}>Novo Produto</Botao>
          </div>
            <Tabela produtos={produtos || []} produtoSelecionado={produtoSelecionado} produtoExcluido={produtoExcluido} />
          </>
        ) : (<Formulario produto={produto}
          produtoMudou={salvarOuAlterarProduto}
          cancelado={() => setVisivel("tabela")} />)}
      </Layout>
    </div>
  )
}
