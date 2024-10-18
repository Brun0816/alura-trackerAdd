<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulario para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorFinalizado="FinalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';

export default defineComponent({
    name: 'FormularioTemp',
    emits: ['aoSalvarTarefa'],
    components: {
        Temporizador
    },
    data() {
        return {
        descricao: ''
        }
    },
    methods: {
        FinalizarTarefa(tempoDecorrido: number): void {
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao
            })
            this.descricao = ''
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


