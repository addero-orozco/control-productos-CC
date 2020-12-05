<template>
    <div class="contenedor">
        <a class="item">
            <i class="arrow left icon"></i>Regresar
        </a>
        <h2 class="ui lefth header">Productos del carrito</h2>

        <div class="ui cards">
            <div class="card" v-for="(producto, index) in productos" :key="index">
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
                    <div class="ui basic red button" @click="quitar_carrito(index)">Quitar</div>
                </div>
                </div>
            </div>
        </div>

        <MensajeAdvertencia v-show="mostrando_mensaje == true"/>
        <MensajePositivo v-show="mensaje_confirmacion == true"/>

        <div class="ui message" v-if="productos.length > 0">
            <div class="ui center aligned header">
                Confirmar compra
            </div>
            <div class="ui green button" @click="confirmar_compra()">Comprar</div>
        </div>

    </div>
</template>

<script>

import { mapState } from 'vuex'
import store from '@/store/index'

import MensajeAdvertencia from '@/components/MensajeAdvertencia'
import MensajePositivo from '@/components/MensajePositivo'

export default {
    name: 'Carrito',
    components: {
        MensajeAdvertencia,
        MensajePositivo
    },
    data() {
        return {
            mostrando_mensaje: false,
            mensaje_confirmacion: false
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
        quitar_carrito(index) {
            store.dispatch('sistema_control/quitarCarrito', index)
            this.mostrando_mensaje = true
            setTimeout(() => this.mostrando_mensaje = false, 2000)
        },
        confirmar_compra() {
            store.dispatch('sistema_control/confirmarCompra')
            this.mensaje_confirmacion = true
            setTimeout(() => this.mensaje_confirmacion = false, 5000)
        },
    }
}
</script>
