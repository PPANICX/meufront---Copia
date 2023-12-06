import { useState } from "react";
import Produto from "../core/produto";
import Entrada from "./entrada";
import Botao from "./produtos/botao";


interface FormularioProps {
    produto: Produto
    produtoMudou?: (propduto: Produto) => void
    cancelado?: () => void
}

export default function Fomulario(props: FormularioProps) {
    const id = props.produto?.id
    const [nome, setNome] = useState(props.produto?.nome)
    const [preco, setPreco] = useState(props.produto?.preco)
    const [descricao, setDescricao] = useState(props.produto?.descricao)

    return (
        <div>
            {id ? (<Entrada texto="id :" valor={id} somenteLeitura></Entrada>) : false}
            <Entrada texto="nome :" valor={nome} onChange={setNome}></Entrada>
            <Entrada texto="preco :" valor={preco} onChange={setPreco}></Entrada>
            <Entrada texto="descricao :" valor={descricao} onChange={setDescricao}></Entrada>
            <div className="flex justify-end mt-5">
            <Botao className="mr-3" cor="bg-gradient-to-r from-blue-500 to-blue-700"
            onClick={() => props.produtoMudou?.(new Produto(id, nome, preco, descricao))}>
                {id ? 'Alterar' : 'Salvar'}</Botao>
                <Botao cor="bg-gradient-to-r from-gray-500 to-gray-700"
                onClick={props.cancelado}>Cancelar</Botao>
            </div>
        </div>
    )
}