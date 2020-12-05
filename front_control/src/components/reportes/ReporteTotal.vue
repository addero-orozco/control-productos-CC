<template>
    <div class="ui message">
        <div class="ui center aligned header">
            Reporte total de ventas
        </div>
        Total: Q{{ reporte_total }}
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
        store.dispatch('sistema_control/obtenerReporteTotal')
    },
    computed: {
        ...mapState(['sistema_control']),
        reporte_total () {
            return this.sistema_control.reporte_total
        }
    },
    methods: {
    }
}
</script>
