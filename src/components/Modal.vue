<template>
    <div class="modal" :class="{ 'is-active': mostrar }" v-if="mostrar">
        <!-- usamos o v-if="tarefaSelecionada" pois todo esse bloco só irá ser renderizado se a tarefa for selecionada   !-->
        <div class="modal-background"></div>
        <div class="modal-card">
            <slot/> <!--Slots são uma forma de passar conteúdo de um componente pai para um componente filho. Eles permitem que você defina áreas dentro de um componente onde o conteúdo pode ser injetado dinamicamente. Exemplo: um componente de modal pode ter um slot para o título e outro para o corpo, permitindo que diferentes conteúdos sejam exibidos sem modificar a estrutura do componente-->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, DefineComponent } from 'vue';

export default defineComponent({
    name: "ModalVue",
    props: {
        mostrar: {
            type: Boolean,
            required: true
        }
    }
});

</script>