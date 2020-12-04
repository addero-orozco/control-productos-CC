<template>
    <div id="contenedor">

        <multiselect
            @input="changeValue"
            v-model="valor"
            :options="opciones"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Seleccionar"
            label="nombre"
            track-by="id"
            :preselect-first="false">

            <template slot="selection" slot-scope="{ values, search, isOpen }">
                <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">
                    {{ values.length }} opciones seleccionadas
                </span>
            </template>
        </multiselect>

    </div>
</template>

<script>

import Multiselect from 'vue-multiselect'

export default {
    name: 'Dropdown-Search-Multiple',
    props: {
        value: {
            type: Array,
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
            valor: []
        }
    },
    watch: {
        reiniciar() {
            alert(this.reiniciar)
            if (this.reiniciar) {
                this.valor = []
                //this.reiniciar = false
            }
        }
    },
    methods: {
        textoMostrar(option) {
            return `${option.nombre}`
        },
        changeValue() {
            this.$emit("modified", this.valor);
            this.$emit('reseteo')
        }
    },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>