<template>
    <div>

        <div class="ui message">
            <div class="ui center aligned header">
                Reporte total de ventas
            </div>
            <div class="ui middle aligned divided list">
                <div class="item">
                    <div class="right floated content">
                        Q{{reporte_total.toFixed(2)}}
                    </div>
                    <div class="content">
                        Total
                    </div>
                </div>
            </div>
        </div>


        <div class="ui message">
            <div class="ui center aligned header">
                Reporte de ventas por producto
            </div>
            <div class="ui middle aligned divided list">
                <div class="item" v-for="(producto, index) in reporte_por_producto" :key="index">
                    <div class="right floated content">
                        Q{{producto.total.toFixed(2)}}
                    </div>
                    <div class="content">
                        {{producto.producto__nombre}}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import { mapState } from 'vuex'
import store from '@/store/index'

export default {
    name: 'ReporteTotal',
    components: {
    },
    data() {
        return {
        }
    },
    beforeMount() {
        store.dispatch('sistema_control/obtenerReportePorProducto')
        store.dispatch('sistema_control/obtenerReporteTotal')
    },
    computed: {
        ...mapState(['sistema_control']),
        reporte_por_producto () {
            return this.sistema_control.reporte_por_producto
        },
        reporte_total () {
            return this.sistema_control.reporte_total
        }
    },
    methods: {
    }
}
</script>