import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "./tipo-acoes";
import http from "@/http"
import ITarefa from "@/interfaces/ITarefa";
import { EstadoProjeto, projeto } from "./modulos/projeto";

export interface Estado {   //usamos o export para transferir/enviar dados de um arquivo para outro
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes: [],
        projeto: {
            projetos: []
        }
    },
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {  //encontramos a tarefas[] no nosso estado local, alteramos ela. Agora oque temos no nosso estado local, representa oque temos na nossa API
            const index = state.tarefas.findIndex(t => t.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {

            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    },
    actions: {
        [OBTER_TAREFAS]({ commit }) {
            http.get('tarefas')
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post(`/tarefas`, tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
        //usamos o commit para transmitir a mudança != do contexto todo
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
            .then(() => commit(ALTERAR_TAREFA, tarefa))
            //o .then representa o "se a nossa tarefa for executada com sucesso", faremos o commit da mutação, ou seja, transmitimos a mudança
            //esta é uma promessa, oque significa que vai ser alterado se tudo der certo, então devemos encadear no "alterarTarefa" no Tarefas.vue (view)
        },
    },
    modules: {
        projeto   //aqui chamamos e avisamos o vue que temos um modulo que necessita ser importado
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}