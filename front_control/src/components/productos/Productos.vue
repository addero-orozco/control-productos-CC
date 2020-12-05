<template>
    <div class="contenedor">

        <a class="item">
            <i class="arrow left icon"></i>Regresar
        </a>
        <h2 class="ui lefth header">Productos</h2>

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
        <MensajePositivo v-show="mostrando_mensaje == true"/>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import store from '@/store/index'

import MensajePositivo from '@/components/MensajePositivo'

export default {
    name: 'Productos',
    components: {
        MensajePositivo
    },
    props: {
        accion: Number
	},
    data() {
        return {
            mostrando_mensaje: false
        }
    },
    beforeMount() {
        store.dispatch('sistema_control/obtenerProductos',this.accion)
    },
    computed: {
        ...mapState(['sistema_control']),
        productos () {
            return this.sistema_control.productos
        }
    },
    methods: {
        ver_accion(id_vendedor) {
            this.$emit('clic_boton', 'Productos', id_vendedor)
        },
        agregar_carrito(producto) {
            store.dispatch('sistema_control/agregarCarrito', producto)
            this.mostrando_mensaje = true
            setTimeout(() => this.mostrando_mensaje = false, 2000)
        },
    }
}
</script>