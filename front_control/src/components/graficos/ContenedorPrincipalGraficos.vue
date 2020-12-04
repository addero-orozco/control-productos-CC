<template>
    <div>
        <div class="ui pointing menu">
            <div class="header item">
                Gráficos
            </div>
            <div class="right menu">
                <a class="item" @click="decargarGraficos()">
                    <i class="download green icon"></i>Exportar todos los gráficos
                </a>
            </div>
        </div>


        <div style="display: flex;flex-flow: row wrap;justify-content: center;align-content: space-around;">
            <div v-for="item in graficos" :key="item.codigo" style="padding-bottom: 10px;" >
                <button v-if="item.grafico.type==='pie'" class="ui button" @click="graficoPie(item.grafico.data, item.total)">
                    <i class="chart pie violet icon"></i>{{item.titulo}}
                </button>
                <button v-if="item.grafico.type==='bar'" class="ui button" @click="graficoBar(item.grafico.data, item.total)">
                    <i class="chart bar violet icon"></i>{{item.titulo}}
                </button>
            </div>
        </div>

        <!-- Fragmento para descargar png de gráfico individual -->
        <div id="area_descarga_chart_individual" class="canvas-con" v-if="grafico" style="padding-top: 50px; padding-bottom: 50px;">
            <h2 class="ui center aligned icon header">
                <b>{{titulo_grafico}}</b>
            </h2>
            <h4 class="ui center aligned icon header">
                <b>Total: {{total}} (100%)</b>
            </h4>

            <component :is="grafico" :chart-data="datacollection" :legendPosition="posicion_legends" @generated="setLegend"/>
            <div style="padding-top: 35px;" class="legend-con" v-html="html_de_legends"/>
        </div>
        <!-- fin -->

        <div class="ui center aligned grid" style="padding-bottom: 30px;">
            <a class="ui button" v-if="grafico" @click="descargarChart()">
                <i class="download large icon"></i>Descargar gráfico
            </a>
        </div>

    </div>
</template>

<script>

import { mapState } from 'vuex'
import store from '@/store/index'

import ContenedorBar from "./Bar.js";
import ContenedorPie from "./Pie.js";

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';


export default {
    components: {
        ContenedorBar,
        ContenedorPie,
    },
    data() {
        return {
            grafico: null,
            datacollection: null,
            posicion_legends: 'bottom',
            total: 0,
            html_de_legends: '',
        };
    },
    computed: {
        ...mapState(['estadisticas']),
        graficos () {
            return store.getters['estadisticas/graficos']
        },
        titulo_grafico () {
            return this.datacollection.datasets[0].label
        },
        indicador_nombre() {
            try {
                return this.estadisticas.indicador.indicador.nombre
            }
            catch(err) {
                return ''
            }
        },
    },
    methods: {
        graficoBar (data, total) {
            this.datacollection = data
            this.total = total
            this.datacollection.total = total
            this.grafico = 'ContenedorBar'
        },
        graficoPie (data, total) {
            this.datacollection = data
            this.datacollection.total = total
            this.total = total
            this.grafico = 'ContenedorPie'
        },
        setLegend (html) {
            this.html_de_legends = html
        },
        async decargarGraficos () {
            var pdf = new jsPDF('p','mm','letter');
            var contenedores_charts = document.querySelectorAll('div[name="area_descarga_chart"]')

            // eslint-disable-next-line no-unused-vars
            for (const [index, grafico] of contenedores_charts.entries()) {
                /*  funcion asíncrona para html2canvas que termina hasta agregar todos los gráficos
                    y al terminar guardar el pdf. */
                await html2canvas(grafico).then(async canvas => {
                    var imgData = canvas.toDataURL("image/PNG", 1.0);

                    if (index!=0) pdf.addPage();

                    let width = pdf.internal.pageSize.getWidth()
                    let height = pdf.internal.pageSize.getHeight()
                    let widthRatio = width / (canvas.width + 200)
                    let heightRatio = height / (canvas.height + 200)
                    let ratio = widthRatio > heightRatio ? heightRatio : widthRatio


                    var chartWitdh = canvas.width * ratio
                    var chartHeight = canvas.height * ratio

                    pdf.addImage(imgData, 'PNG', 25, 0, chartWitdh, chartHeight);
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                });
            }
            pdf.save("graficos_" + this.indicador_nombre + ".pdf");
        },
        descargarChart () {
            html2canvas(document.querySelector('#area_descarga_chart_individual')).then(canvas => {
                var dataUrl = canvas.toDataURL('image/JPG');
                let link = document.createElement('a')
                link.download = this.titulo_grafico + '_' + this.indicador_nombre + '.png'
                link.href = dataUrl
                link.click()
            });
        }
    }
}
</script>

<style lang="css">


</style>