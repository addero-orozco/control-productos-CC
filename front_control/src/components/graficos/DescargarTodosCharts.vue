<template>
    <div name="area_descarga_chart" style="padding-top: 50px; padding-bottom: 50px;">
        <h2 class="ui center aligned icon header">
            <b>{{grafico.titulo}}</b>
        </h2>
        <h4 class="ui center aligned icon header">
            <b>Total: {{grafico.total}} (100%)</b>
        </h4>

        <contenedor-bar v-if="grafico.grafico.type==='bar'" :chart-data="grafico.grafico.data" :legendPosition="posicion_legends" @generated="setLegend"/>
        <contenedor-pie v-if="grafico.grafico.type==='pie'" :chart-data="grafico.grafico.data" :legendPosition="posicion_legends" @generated="setLegend"/>
        <div style="padding-top: 35px;" class="legend-con" v-html="html_de_legends"/>
    </div>
</template>

<script>

import ContenedorBar from "./Bar.js";
import ContenedorPie from "./Pie.js";

export default {
    name:'Descargar-Todos-Charts',
    components: {
        ContenedorBar,
        ContenedorPie
    },
    props: {
        grafico: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            posicion_legends: 'bottom',
            html_de_legends: ''
        };
    },
    methods: {
        setLegend (html) {
            this.html_de_legends = html
        },
    }
}
</script>





