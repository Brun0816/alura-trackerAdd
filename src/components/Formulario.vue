<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulario para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorFinalizado="FinalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from 'vuex';
import { key } from '@/store';

export default defineComponent({
    name: 'FormularioTemp',
    emits: ['aoSalvarTarefa'],
    components: {
        Temporizador
    },

    setup(props, { emit }) {

        const store = useStore(key)

        const descricao = ref("")
        const idProjeto = ref("")

        const projetos = computed (() => store.state.projeto.projetos) //o projeto.projetos acontece pois o projeto é o estado do meu modulo, e projetos é o estado dele em si. Precisa ser evidenciado

        const FinalizarTarefa = (tempoDecorrido: number): void => {
            emit('aoSalvarTarefa', { //o contexto define varias coisas, uma delas é o emit
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projetos.value.find(proj => proj.id == idProjeto.value) //projetos. value pois é uma variavel, então precisa do .value
            })
            descricao.value = ''
        }

        return {
            descricao,
            idProjeto,
            projetos,
            FinalizarTarefa
        }
    }
});
</script>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>
