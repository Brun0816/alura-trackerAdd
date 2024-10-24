import IProjeto from "./IProjeto";

export default interface ITarefa {
    duracaoEmSegundos: number,
    descricao: string,
    projeto: IProjeto, //obviamente pedimos o import do IProjeto pois precisamos validar esse atributo
    id: number
}
//colocamos aqui os atributos do nosso ITarefas