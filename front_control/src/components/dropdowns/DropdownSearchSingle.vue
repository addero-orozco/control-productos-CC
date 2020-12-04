<template>
    <div id="contenedor">

        <multiselect
            @input="changeValue"
            v-model="valor"
            :options="opciones"
            :searchable="true"
            :close-on-select="true"
            :show-labels="false"
            :custom-label="textoMostrar"
            placeholder="Seleccionar">
        </multiselect>

    </div>
</template>

<script>

import Multiselect from 'vue-multiselect'

export default {
    name: 'Dropdown-Search-Single',
    props: {
        value: {
            type: Number,
            required: false
        },
        opciones: {
            type: Array,
            required: true
        },
        reiniciar: {
            type: Boolean,
            required: false
        },
    },
    model: {
        event: "modified"
    },
    components: {
        Multiselect
    },
    data() {
        return {
            valor: null,
        }
    },
    watch: {
        reiniciar() {
            //alert(this.reiniciar)
            if (this.reiniciar) {
                this.valor = []
                //this.$emit('reseteo')
                //this.reiniciar = false
            }
        }
    },
    methods: {
        textoMostrar(option) {
            return `${option.nombre}`
        },
        changeValue(value) {
            this.$emit("modified", value.id);
            this.$emit('reseteo')
        }
    },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>