<template>
    <div class="contenedor">
        <div class="ui secondary pointing menu">
            <a class="item">
                <i class="arrow left icon"></i>Regresar
            </a>
            <a class="active item" @click="componente='NuevoProducto'">
                Nuevo
            </a>
        </div>

        <component :is="componente" v-if="componente" @clic_boton="cambiarComponente" :accion="accion" style="padding-bottom:20px;padding-top:20px;"/>

    </div>
</template>

<script>

import { mapState } from 'vuex'

import ListaProductos from '@/components/productos/ListaProductos'
import NuevoProducto from '@/components/productos/Crear'

export default {
    name: 'Contenedor-productos',
    components: {
        ListaProductos,
        NuevoProducto
    },
    props: {
        msg: String
    },
    data() {
        return {
            componente: 'ListaProductos',
            accion: undefined,
        }
    },
    computed: {
        ...mapState(['sistema_control']),
        productosCarrito () {
            return this.sistema_control.carrito.length
        }
    },
    methods: {
        cambiarComponente (componente, accion) {
            this.componente = 'Productos'
            this.accion = accion
        },
    }
}
</script>