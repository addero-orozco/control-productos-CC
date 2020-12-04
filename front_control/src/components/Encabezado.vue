<template>
    <div class="ui container form segment" v-if="implementado">

        <h3 v-if="is_porcentaje === true">
            {{indicador_nombre}}
        </h3>
        <h3 v-else-if="is_porcentaje === false">
            {{indicador_nombre}}
        </h3>
        <div class="ui divider"></div>


        <loading v-if="estadisticas.loading"/>

        <div v-if="entero_valores.length > 0 & !estadisticas.loading">
            <valores-indicador-entero :valores="entero_valores"/>
        </div>

        <div v-if="porcentaje_valores.length > 0 & !estadisticas.loading">
            <valores-indicador-porcentaje :valores="porcentaje_valores"/>
        </div>


        <div class="ui form segment">
            <div class="fields">
                <div class="five wide field">
                    <label>Datos tomados del</label>
                    <datetime
                        v-model="fecha_inicial"
                        input-id="fecha_inicial"
                        type="date"
                        :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}"
                        value-zone="America/Guatemala"
                        auto/>
                </div>
                <div class="five wide field">
                    <label>al</label>
                    <datetime
                        v-model="fecha_final"
                        input-id="fecha_fin"
                        type="date"
                        :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}"
                        value-zone="America/Guatemala"
                        auto/>
                </div>
                <div class="six wide field">
                    <label>proyecto</label>
                    <dropdown-search-single v-model="proyecto" :opciones="proyectos"/>
                </div>
            </div>
            <div class="ui right floated buttons">
                <button class="ui mini button" v-if="componente=='Filtros'" @click="componente='Graficos'">
                    <i class="chart pie blue icon"></i>Ver Gráficos
                </button>
                <button class="ui mini button" v-if="componente=='Graficos'" @click="componente='Filtros'">
                    <i class="filter orange icon"></i>Ver Filtros
                </button>
            </div>
            <br>
            <br>
        </div>

        <component :is="componente" v-if="componente"/>

        <!-- Fragmento para renderizar todos los gráficos y ocultarlos para exportarlos
            en el componente ContenedorPrincipalGraficos-->
        <div class="for_charts" v-for="item in graficos" :key="item.codigo">
            <descargar-todos-charts :grafico="item"/>
        </div>
        <!-- fin -->

    </div>
</template>

<script>

import { Datetime } from 'vue-datetime';
import { mapState } from 'vuex'
import store from '@/store/index'

import DropdownSearchSingle from '@/components/dropdowns/DropdownSearchSingle'
import Filtros from '@/components/Filtros'
import Graficos from '@/components/graficos/ContenedorPrincipalGraficos'
import ValoresIndicadorPorcentaje from '@/components/graficos/ContenedorIndicadorPorcentajeGrafico'
import ValoresIndicadorEntero from '@/components/ValoresIndicadorEntero'
import DescargarTodosCharts from '@/components/graficos/DescargarTodosCharts'

import Loading from '@/components/Loading'

import moment from 'moment'


export default {
    name: 'Encabezado',
    components: {
        DescargarTodosCharts,
        datetime: Datetime,
        DropdownSearchSingle,
        Filtros,
        Graficos,
        ValoresIndicadorPorcentaje,
        ValoresIndicadorEntero,
        Loading
    },
    data() {
        return {
            proyecto: 0,
            componente: 'Filtros',
            fecha_inicial: '',
            fecha_final: ''
        }
    },
    beforeMount() {

        var hoy = new Date()

        var inicio_f = new Date(hoy.getFullYear(), 0, 1);
        this.fecha_inicial = moment(inicio_f).format('YYYY-MM-DD')

        var final_f = new Date(hoy.getFullYear() + 1, 0, 1)
        var last_day = new Date(final_f - 1)
        this.fecha_final = moment(last_day).format('YYYY-MM-DD')

        store.commit('estadisticas/SET_FILTRO_ENCA_F_INICIAL', this.fecha_inicial)
        store.commit('estadisticas/SET_FILTRO_ENCA_F_FINAL', this.fecha_final)

        store.dispatch('estadisticas/obtenerEstadisticas')
        store.dispatch('estadisticas/obtenerProyectos')
    },
    computed: {
        ...mapState(['estadisticas']),
        graficos () {
            return store.getters['estadisticas/graficos']
        },
        implementado () {
            if (Object.keys(this.estadisticas.indicador).length) return true
            else return false
        },
        is_porcentaje() {
            try {
                if (this.estadisticas.indicador.indicador.valores[0].tipo == this.estadisticas.VALOR_INDICADOR.PORCENTAJE) return true
                else return false
            }
            catch(err) {
                return false
            }
        },
        porcentaje_valores() {
            var valores_mostrar = []
            try {
                this.estadisticas.indicador.indicador.valores.map( valor => {
                    if (valor.tipo == this.estadisticas.VALOR_INDICADOR.PORCENTAJE) {
                        valores_mostrar.push(valor)
                    }
                })
                return valores_mostrar
            }
            catch(err) {
                return valores_mostrar
            }
        },
        entero_valores() {
            var valores_mostrar = []
            try {
                return this.estadisticas.indicador.indicador.valores
            }
            catch(err) {
                return valores_mostrar
            }
        },
        indicador_nombre() {
            try {
                return this.estadisticas.indicador.indicador.nombre
            }
            catch(err) {
                return ''
            }
        },
        numerador() {
            try {
                return this.estadisticas.indicador.indicador.valores[0].numerador
            }
            catch {
                return null
            }
        },
        denominador() {
            try {
                return this.estadisticas.indicador.indicador.valores[0].denominador
            }
            catch {
                return null
            }
        },
        valor() {
            try {
                return this.estadisticas.indicador.indicador.valores[0].valor
            }
            catch {
                return null
            }
        },
        proyectos () {
            let pros = this.estadisticas.proyectos
            let primera_opcion = {
                id: 0,
                nombre: 'Todos'
            }
            pros.unshift(primera_opcion)
            return pros
        }
    },
    watch: {
        fecha_inicial: {
            immediate: true,
            handler() {
                store.commit('estadisticas/SET_FILTRO_ENCA_F_INICIAL', this.fecha_inicial)
            }
        },
        fecha_final: {
            immediate: true,
            handler() {
                store.commit('estadisticas/SET_FILTRO_ENCA_F_FINAL', this.fecha_final)
            }
        },
        proyecto: {
            immediate: true,
            handler() {
                store.commit('estadisticas/SET_PROYECTO', this.proyecto)
            }
        }
    },
    methods: {
    }
}
</script>

<style src="vue-datetime/dist/vue-datetime.css"></style>

<style lang="css">
/*  Atritubos necesarios para ocultar el div que contiene todos
    los charts individualmente */
.for_charts {overflow: hidden;height: 0;}

</style>

