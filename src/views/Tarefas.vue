<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Box v-if="listaEstaVazia">
            Você não está muito produtivo hoje
        </Box>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Digite para Filtrar" v-model="filtro" />
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
        <Modal :mostrar="tarefaSelecionada != null">
            <header class="modal-card-head"> <!--cada modaç desse é do Bulma, da onde ja estamos buscando as modificaçoes-->
                <p class="modal-card-title">Editando uma tarefa</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="field"> <!--Aqui talvez se resolvese com um  v-if="tarefaSelecionada"-->
                    <label for="descricaoDaTarefa" class="label">
                        Descrição
                    </label>
                    <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa" />
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button @click="alterarTarefa" class="button is-success">Salvar alteraçoes</button>
                    <!-- usamos o @click para que ao efetuar o clique, uma ação seja realizada, por isso damos o nome entre "", pois depois sera necessario atribuir uma ação nos methods-->
                    <button @click="fecharModal" class="button">Cancelar</button>
                </div>
            </footer>
        </Modal>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import { useStore } from '@/store';
import ITarefa from '@/interfaces/ITarefa';
import Modal from '@/components/Modal.vue';

export default defineComponent({
    name: 'AppWeb',
    components: {
        Formulario,
        Tarefa,
        Box,
        Modal
    },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa): void {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },
        selecionarTarefa(tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa
        },
        fecharModal() {
            this.tarefaSelecionada = null   //null pois ela deixou de existir, logo, fechará
        },
        alterarTarefa() {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada) //significa que, ao clicar em alterar tarefa, ocorrerá um dispatch, ou seja, uma ação será enviada ao store, para que seja alterado o estado da aplicação
                //devemos agora encadear, ou seja, "quando essa promessa se cumprir", logo, usaremos o .then
                .then(() => this.fecharModal()) //esse .then esta aqui pois quando ocorrer o dispacth (açao for executada), o Modal devera ser fechada
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length == 0
        },
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)

        const filtro = ref('')

        //        const tarefas = computed(() => store.state.tarefas.filter((t) => !filtro.value || t.descricao.includes(filtro.value))
        //        );

        watchEffect(() => {  //faz parte da composition API. Usada para reagir a mudancas em dados reativos, executando um efeito sempre que esses dados mudam.
            store.dispatch(OBTER_TAREFAS, filtro.value)
        })

        return {
            tarefas: computed(() => store.state.tarefas),
            store,
            filtro
        };
    },
});
</script>