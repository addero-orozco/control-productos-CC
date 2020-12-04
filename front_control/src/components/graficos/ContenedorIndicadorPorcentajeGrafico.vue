<template>
    <div style="padding-top: 15px; padding-bottom: 0px;">
        <div class="ui placeholder segment" v-for="(item, index) in valores" :key="index">
            <div class="ui two column stackable center aligned grid">
                <div class="ui vertical divider"></div>
                <div class="middle aligned row">
                    <div class="column">
                        <b>Denominador: {{item.denominador}} (100%)</b>
                        <pie-char :chart-data="item.datacollection" :legendPosition="posicion_legends" style="width:auto; height:200px;"/>
                    </div>
                    <div class="column">
                        Numerador: {{item.etiqueta_numerador}} / Denominador: {{item.etiqueta_denominador}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

import PieChar from "./Pie.js";


export default {
    name: 'Contenedor-Porcentaje',
    props: {
        valores: {
            type: Array,
            required: true
        }
    },
    components: {
        PieChar,
    },
    data() {
        return {
            posicion_legends: 'right',
        }
    },
    computed: {
        ...mapState(['estadisticas']),
        indicador () {
            return this.estadisticas.indicador
        }
    },
    mounted() {
        this.fillData();
    },
    watch: {
        indicador: {
            immediate: true,
            handler() {
                this.fillData()
            }
        },
    },
    methods: {
        fillData() {

            this.valores.map(item => {
                item.datacollection = {
                    labels: [
                        'Numerador',
                    ],
                    datasets: [{
                            data: [item.numerador, item.denominador - item.numerador],
                            backgroundColor: [
                                '#F39F16',
                                '#E46651'
                            ],
                        }
                    ],
                    total: item.denominador
                }
            })
        }
    }
}
</script>