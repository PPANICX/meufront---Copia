interface EntradaProps {
    tipo?: 'text' | 'text' | 'text'
    texto: string
    valor: any
    somenteLeitura?: boolean
    onChange?: (valor: any) => void
}

export default function Entrada(props: EntradaProps) {
    return (
        <div className="flex lfex-col mt-3">
            <label className="mb-2 text-white">{props.texto}</label>
            <input
                type={props.tipo ?? "text"}
                value={props.valor}
                readOnly={props.somenteLeitura}
                onChange={(e) => props.onChange?.(e.target.value)}
                className={`${props.somenteLeitura ? 'bg-transparent border-opacity-50' : 'bg-transparent border-opacity-50'
                    } text-white border-b border-white outline-none`} />
        </div>
    )
}