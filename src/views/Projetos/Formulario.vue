<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto" />
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'FormularioWeb',
    props: {
        id: {
            type: String
        }
    },

    setup(props) {
        const router = useRouter()

        const store = useStore();
        const { notificar } = useNotificador();

        const nomeDoProjeto = ref("")

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id);
            nomeDoProjeto.value = projeto?.nome || '';
        }

        const lidarComSucesso = () => {
            nomeDoProjeto.value = '';
            notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'O projeto foi cadastrado com sucesso!');
            router.push('/projetos');
        }

        const salvar = () => {
            if (props.id) {
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value,
                }).then(() => lidarComSucesso());
            } else {
                store.dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
                    .then(() => lidarComSucesso());
            }
        } //props é a maneira de passar dados de um componente pai para um componente filho
        //não precisamos mais do this.store pois o store ja é uma constante identificada no nosso setup.
        //retiramos o this. do nomeDoProjeto pois tbm ja identificamos no setup, porem como ele é uma variavel reativa (ref("")), usamos o .valeu após

        return {
            nomeDoProjeto,
            salvar
        }
    }
});
</script>