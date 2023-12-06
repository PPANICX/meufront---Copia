import Produto from "../../core/produto";
import { IconeEdicao, IconeLixo } from "../itens/tabela";



interface TabelaProps {
    produtos: Produto[]
    produtoSelecionado?: (produto:Produto) => void
    produtoExcluido?: (produto:Produto) => void
}

export default function Tabela(props: TabelaProps) {
    function renderHeader() {
        return(
            <tr>
                <th className="text-left p-3">id</th>
                <th className="text-left p-3">nome</th>
                <th className="text-left p-3">preco</th>
                <th className="text-left p-3">descricao</th>
                <th className="p-3">Ações</th>
            </tr>
        )
    }

    function renderDados() {
        return props.produtos?.map((produto, i) => {
            return(
                <tr key={produto.id}>
                    <td className="text-left p-3 text-white">{produto.id} </td>
                    <td className="text-left p-3 text-white">{produto.nome} </td>
                    <td className="text-left p-3 text-white">{produto.preco}</td>
                    <td className="text-left p-3 text-white">{produto.descricao} </td>
                {renderizarAcoes(produto)}</tr>
            )
        })
    }

    function renderizarAcoes(produto : Produto) {
        return(
            <td className="flex">
                <button onClick={() => props.produtoSelecionado?.(produto)} className={`flex justify-center items text-green-600 
                rouded-full p-2 m-1 hover:opacity-50`}>{IconeEdicao}</button>
                <button onClick={() => props.produtoExcluido?.(produto)} className={`flex justify-center items text-red-600 
                rouded-full p-2 m-1 hover:opacity-50`}>{IconeLixo}</button>
            </td>
        )
    }

    return(
        <table className="w-full rouded-xl overflow-hidden">
            <thead className={`text-gray-100
            bg-gradient-to-r from-indigo-500 to-indigo-800`}>
                {renderHeader()}
            </thead>
            <tbody>
                {renderDados()}
            </tbody>
        </table>
    )

}