<template>
    <div class="ui form segment">

        <div class="fields">
            <div class="three wide field" v-for="item in filtros" :key="item.codigo">
                <label>{{item.nombre}}</label>
                <div v-if="item.filtro.tipo == estadisticas.TIPO_FILTROS.INPUT">
                    <input type="text" v-model="item.v_model" placeholder="Ingresar">
                </div>
                <div v-else-if="item.filtro.tipo == estadisticas.TIPO_FILTROS.COMBOBOX">
                    <dropdown-search-single v-model="item.v_model" :opciones="item.filtro.opciones" :reiniciar="reiniciar_selects" @reseteo="reseteo_select"/>
                </div>
                <div v-else-if="item.filtro.tipo == estadisticas.TIPO_FILTROS.FECHAS">
                    <datetime v-model="item.v_model_f_i" :input-id="`fecha_inicial_${item.codigo}`" type="date"
                        placeholder="Fecha de inicio" :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}"
                        style="border-bottom: 10px solid white;" auto />
                    <datetime v-model="item.v_model_f_f" :input-id="`fecha_fin_${item.codigo}`" type="date"
                        placeholder="Fecha de fin" :phrases="{ok: 'Seleccionar', cancel: 'Cancelar'}" auto />
                </div>
                <div v-else-if="item.filtro.tipo == estadisticas.TIPO_FILTROS.MULTIPLE">
                    <dropdown-search-multiple v-model="item.v_model_multiple" :opciones="item.filtro.opciones" :reiniciar="reiniciar_selects" @reseteo="reseteo_select"/>
                </div>
            </div>
        </div>


        <div style="margin-bottom: 80px;">
            <button class="ui lefth floated orange button" v-if="conteo_filas > 0 & !estadisticas.loading_filtros" @click="descargar_hoja_calculo()">
                <i class="download icon"></i>Descargar hoja de cálculo
            </button>
            <a class="ui left floated blue image large label">
                <i class="filter white icon"></i>Resultados encontrados
                <div class="detail">{{conteo_filas}}</div>
            </a>

            <button class="ui right floated teal button" @click="filtrar_datos">
                <i class="search icon"></i>Buscar
            </button>

            <button class="ui right floated grey button" @click="limpiar_filtros">
                <i class="undo alternate icon"></i>Limpiar filtros
            </button>
        </div>

        <loading v-if="estadisticas.loading_filtros" />
        <div class="scrollbar" id="style-5" style="height:450px; overflow:auto; overflow-x: auto;"
            v-if="conteo_filas > 0 & !estadisticas.loading_filtros">
            <table class="ui green table">
                <thead>
                    <tr>
                        <th v-for="item in columnas" :key="item.codigo">
                            {{item.nombre}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in registros_filtrados" :key="item.codigo">
                        <td v-for="(registro, key, index) in item" :key="index">
                            {{registro}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <paginate
            style="margin-top: 20px"
            :page-count="paginas"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickPagina"
            :prev-text="'Anterior'"
            :next-text="'Siguiente'"
            :container-class="'ui stackable pagination menu'"
            :page-class="'item'"
            :prev-class="'item'"
            :next-class="'item'"
            :disabled-class="'disabled item'">
        </paginate>



    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import store from '@/store/index'

    import {
        Datetime
    } from 'vue-datetime';
    import DropdownSearchSingle from '@/components/dropdowns/DropdownSearchSingle'
    import DropdownSearchMultiple from '@/components/dropdowns/DropdownSearchMultiple'

    import Loading from '@/components/Loading'
    import Paginate from 'vuejs-paginate'

    export default {
        name: 'filtros',
        components: {
            DropdownSearchSingle,
            DropdownSearchMultiple,
            datetime: Datetime,
            Loading,
            Paginate,
        },
        data() {
            return {
                reiniciar_selects: false
            }
        },
        mounted() {
            store.dispatch('estadisticas/obtenerColumnas')
            store.dispatch('estadisticas/obtenerDatosTabulados')
        },
        computed: {
            ...mapState(['estadisticas']),
            columnas() {
                return store.getters['estadisticas/columnas']
            },
            registros_filtrados() {
                return store.getters['estadisticas/registros']
            },
            filtros() {
                return store.getters['estadisticas/columnas_filtros']
            },
            conteo_filas() {
                try {
                    return this.estadisticas.indicador.datos.total
                } catch (err) {
                    return 0
                }
            },
            paginas() {
                try {
                    return this.estadisticas.indicador.datos.paginas
                } catch (err) {
                    return 0
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
        },
        methods: {
            filtrar_datos() {

                store.dispatch('estadisticas/obtenerEstadisticas')
                store.dispatch('estadisticas/obtenerDatosTabulados')
                this.componente = 'Filtros'
            },
            clickPagina (numeroPagina) {
                store.commit('estadisticas/SET_PAGINA', numeroPagina - 1)
                store.dispatch('estadisticas/obtenerEstadisticas')
                store.dispatch('estadisticas/obtenerDatosTabulados')
            },
            limpiar_filtros() {
                this.filtros.map(columna => {
                    if (columna.filtrable === true) {
                        try {
                            columna.v_model = null
                            this.reiniciar_selects = true
                        }
                        catch(e) {
                            // eslint-disable-next-line no-console
                            console.log(e)
                        }

                        try {
                            columna.v_model_f_i = null
                            columna.v_model_f_f = null
                            this.reiniciar_selects = true
                        }
                        catch(e) {
                            // eslint-disable-next-line no-console
                            console.log(e)
                        }
                    }
                })
            },
            reseteo_select () {
                this.reiniciar_selects = false
            },
            descargar_hoja_calculo () {
                store.dispatch('estadisticas/obtenerHojaCalculo').then((response) => {
                    const url = URL.createObjectURL(new Blob([response], {
                        type: 'application/vnd.ms-excel'
                    }))
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', "hoja_calculo_" + this.indicador_nombre + ".xlsx")
                    document.body.appendChild(link)
                    link.click()
                }).catch(error => {
                    // eslint-disable-next-line
                    console.log(error.response.data.error + " " + error.response.status)
                });
            }
        }
    }
</script>

<style lang="css">
    /*
    SCROLL BAR
    */

    .scrollbar {
        background: #F5F5F5;
    }

    #style-5::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #F5F5F5;
    }

    #style-5::-webkit-scrollbar {
        width: 10px;
        background-color: #F5F5F5;
    }

    #style-5::-webkit-scrollbar-thumb {
        background-color: #0ae;

        background-image: -webkit-gradient(linear, 0 0, 0 100%,
                color-stop(.5, rgba(255, 255, 255, .2)),
                color-stop(.5, transparent), to(transparent));
    }

    /*  --------------  */
    /* .ui.pagination.menu {
        max-width: 100%;
        height: auto;
    } */

</style>