import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";  //o import é o oposto, usamos TRAZER dados de um outro arquivo, bastando chama-lo "import ... from ..."
import { Estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETOS, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/tipo-acoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {  //usamos o export para ENVIAR dados de um arquivo para outro, bastando "export ..."
    projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = { //a partir desse momento vamos trazer todas as mutacoes e acoes de _PROJETOS, para encapsularmos aqui
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
    },

    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETOS](contexto, nomeDoProjeto: string) {
            return http.post(`/projetos`, {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETO]({ commit }, id: string) {
            return http.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        },
    }
};

//criamos esse index para separar/modularizar os contextos, ou seja, agrupar os estados, açoes e mutaçoes, com o unico objetivo de SEPARAR os contextos. PS: Não teria problema deixar tudo num unico arquivo index.ts (store) como estava