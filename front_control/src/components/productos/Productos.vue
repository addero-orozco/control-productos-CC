<template>
    <div class="contenedor">

        <a class="item">
            <i class="arrow left icon"></i>Regresar
        </a>
        <h2 class="ui lefth header">Productos</h2>

        <div class="ui cards">
            <div class="card" v-for="producto in productos" :key="producto.id">
                <div class="content">
                <img class="right floated mini ui image" src="/images/avatar/large/elliot.jpg">
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
                    <div class="ui green button" v-if="producto.cantidad > 0" @click="agregar_carrito(producto.id)">Comprar</div>
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
    name: 'Productos',
    components: {
    },
    props: {
        accion: Number
	},
    data() {
        return {
        }
    },
    beforeMount() {
        store.commit('sistema_control/SET_ID_VENDEDOR', this.accion)
        store.dispatch('sistema_control/obtenerProductos',)
    },
    computed: {
        ...mapState(['sistema_control']),
        productos () {
            return this.sistema_control.productos
        }
    },
    methods: {
        ver_accion(id_vendedor) {
            alert(id_vendedor)
            this.$emit('clic_boton', 'Productos', id_vendedor)
        },
        agregar_carrito(idProducto) {
            store.dispatch('sistema_control/agregarCarrito', idProducto)
        }
    }
}
</script>