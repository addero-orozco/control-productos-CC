<template>
    <div class="contenedor">
        <div>
            <div class="pusher">
                <div id="desktop_bar" class="ui left fixed inverted vertical menu">
                    <a class="item" @click="componente='Catalogo'">Catalogos</a>
                    <a class="item">Productos</a>
                    <a class="item" @click="componente='ReportePorProducto'">Reportes</a>
                    <a class="item" @click="componente='Carrito'">Carrito ({{productosCarrito}})</a>
                </div>
            </div>
        </div>

        <!-- <catalogo/> -->

        <component :is="componente" v-if="componente" @clic_boton="cambiarComponente" :accion="accion" style="padding-bottom:20px;padding-top:20px;"/>

    </div>
</template>

<script>

import { mapState } from 'vuex'

import Catalogo from '@/components/productos/Catalogo'
import Productos from '@/components/productos/Productos'
import Carrito from '@/components/ventas/Carrito'
import ReporteTotal from '@/components/reportes/ReporteTotal'
import ReportePorProducto from '@/components/reportes/ReportePorProducto'

export default {
    name: 'Contenedor-principal',
    components: {
        Catalogo,
        Productos,
        Carrito,
        ReporteTotal,
        ReportePorProducto
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

