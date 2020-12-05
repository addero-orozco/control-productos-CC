<template>
    <div class="contenedor">
        <div>
            <div class="pusher">
                <div id="desktop_bar" class="ui left fixed inverted vertical menu">
                    <a class="item" @click="componente='Catalogo'">Catalogos</a>
                    <a class="item" @click="componente='ContenedorProductos'" v-if="log==true">Mis Productos</a>
                    <a class="item" @click="componente='ReportePorProducto'" v-if="log==true">Reportes</a>
                    <a class="item" @click="componente='Carrito'">Carrito ({{productosCarrito}})</a>
                </div>
            </div>
        </div>

        <component :is="componente" v-if="componente" @clic_boton="cambiarComponente" :accion="accion" style="padding-bottom:20px;padding-top:20px;"/>

    </div>
</template>

<script>

import { mapState } from 'vuex'
import store from '@/store/index'

import Catalogo from '@/components/productos/Catalogo'
import Productos from '@/components/productos/Productos'
import Carrito from '@/components/ventas/Carrito'
import ReporteTotal from '@/components/reportes/ReporteTotal'
import ReportePorProducto from '@/components/reportes/ReportePorProducto'
import ContenedorProductos from '@/components/productos/Contenedor'

export default {
    name: 'Contenedor-principal',
    components: {
        Catalogo,
        Productos,
        Carrito,
        ReporteTotal,
        ReportePorProducto,
        ContenedorProductos
    },
    props: {
        msg: String
    },
    data() {
        return {
            componente: 'Catalogo',
            accion: undefined,
        }
    },
    beforeMount() {
        store.dispatch('sistema_control/obtenerLogueo')
    },
    computed: {
        ...mapState(['sistema_control']),
        productosCarrito () {
            return this.sistema_control.carrito.length
        },
        log () {
            return this.sistema_control.logueo
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

