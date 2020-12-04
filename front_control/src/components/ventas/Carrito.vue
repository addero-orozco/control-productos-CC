<template>
    <div class="contenedor">
        <a class="item">
            <i class="arrow left icon"></i>Regresar
        </a>
        <h2 class="ui lefth header">Productos del carrito</h2>

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
                    <div class="ui basic red button" @click="quitar_carrito(producto.id)">Quitar</div>
                </div>
                </div>
            </div>
        </div>
        <MensajeAdvertencia v-show="mostrando_mensaje == true"/>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import store from '@/store/index'

import MensajeAdvertencia from '@/components/MensajeAdvertencia'

export default {
    name: 'Carrito',
    components: {
        MensajeAdvertencia
    },
    data() {
        return {
            mostrando_mensaje: false
        }
    },
    beforeMount() {
        //store.dispatch('sistema_control/obtenerProductos',this.accion)
    },
    computed: {
        ...mapState(['sistema_control']),
        productos () {
            return this.sistema_control.carrito
        }
    },
    methods: {
        quitar_carrito(idProducto) {
            store.dispatch('sistema_control/quitarCarrito', idProducto)
            this.mostrando_mensaje = true
            setTimeout(() => this.mostrando_mensaje = false, 2000)
        },
    }
}
</script>
