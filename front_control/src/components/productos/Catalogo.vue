<template>
    <div class="contenedor">

        <h2 class="ui lefth header">Catálogos de productos</h2>

        <div class="ui link cards">
            <div v-for="catalogo in catalogos" :key="catalogo.id" class="card" @click="ver_accion(catalogo.id)">
                <div class="image">
                <!--<img src="/images/avatar2/large/matthew.png"> -->
                </div>
                <div class="content">
                <div class="header">{{catalogo.first_name}}</div>
                <div class="meta">
                    <a>Catalogo de productos</a>
                </div>
                <div class="description">
                    
                </div>
                </div>
                <div class="extra content">
                <!-- <span class="right floated">
                    Joined in 2013
                </span> -->
                <span>
                    <i class="handshake outline icon"></i>
                    {{catalogo.productos.length}} productos
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
    methods: {
        ver_accion(id_vendedor) {
            store.commit('sistema_control/SET_ID_VENDEDOR', id_vendedor)
            this.$emit('clic_boton', 'Productos', id_vendedor)
        }
    }
}
</script>