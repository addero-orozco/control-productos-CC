<template>
    <div class="contenedor">
        <h2 class="ui lefth header">Mis productos</h2>

        <div class="ui cards">
            <div class="card" v-for="producto in productos" :key="producto.id">
                <div class="content">
                <!-- <img class="right floated mini ui image" src="/images/avatar/large/elliot.jpg"> -->
                <div class="header">
                    {{producto.nombre}}
                </div>
                <div class="meta">
                    Precio: {{producto.precio}}
                </div>
                <div class="description">
                    {{producto.description}}
                </div>
                </div>
                <div class="extra content">
                <div class="ui two buttons">
                    <div class="ui green button" v-if="producto.cantidad > 0" @click="agregar_carrito(producto)">Comprar</div>
                    <div class="ui basic red button" v-else>Sin existencias</div>
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
    name: 'Catalogos-vendedor',
    components: {
    },
    data() {
        return {
        }
    },
    beforeMount() {
        store.dispatch('sistema_control/obtenerCatalogoVendedor')
    },
    computed: {
        ...mapState(['sistema_control']),
        productos () {
            return this.sistema_control.catalogo_vendedor
        }
    },
    methods: {
        /*ver_accion(id_vendedor) {
            store.commit('sistema_control/SET_ID_VENDEDOR', id_vendedor)
            this.$emit('clic_boton', 'Productos', id_vendedor)
        }*/
    }
}
</script>