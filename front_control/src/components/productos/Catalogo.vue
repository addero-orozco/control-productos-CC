<template>
    <div class="contenedor">



        <div class="ui link cards">
            <div v-for="catalogo in catalogos" :key="catalogo.id" class="card">
                <div class="image">
                <!--<img src="/images/avatar2/large/matthew.png"> -->
                </div>
                <div class="content">
                <div class="header">{{catalogo.first_name}}</div>
                <div class="meta">
                    <a>Catalogo de productos</a>
                </div>
                <div class="description">
                    Productos sobre -----
                </div>
                </div>
                <div class="extra content">
                <!-- <span class="right floated">
                    Joined in 2013
                </span> -->
                <span>
                    <i class="handshake outline icon"></i>
                    {{catalogo.productos.length}} productos en existencia
                </span>
                </div>
            </div>
        </div>




    </div>
</template>

<script>

import { mapState } from 'vuex'
import store from '@/store/index'

export default {
    name: 'Catalogos',
    components: {
    },
    data() {
        return {
            proyecto: 0,
        }
    },
    beforeMount() {
        store.dispatch('sistema_control/obtenerCatalogo')
    },
    computed: {
        ...mapState(['sistema_control']),
        catalogos () {
            return this.sistema_control.catalogos
        }
    },
    watch: {
        /*fecha_inicial: {
            immediate: true,
            handler() {
                store.commit('sistema_control/SET_FILTRO_ENCA_F_INICIAL', this.fecha_inicial)
            }
        }*/
    },
    methods: {
    }
}
</script>