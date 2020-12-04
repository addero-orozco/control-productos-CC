<template>
    <div class="contenedor">
        <div>
            <div class="pusher">
                <div id="desktop_bar" class="ui left fixed inverted vertical menu">
                    <a class="item" @click="componente='Catalogo'">Catalogos</a>
                    <a class="item">Productos</a>
                    <a class="item">Reportes</a>
                    <a class="item" @click="componente='Carrito'">Carrito</a>
                </div>
            </div>
        </div>

        <!-- <catalogo/> -->

        <component :is="componente" v-if="componente" @clic_boton="cambiarComponente" :accion="accion" style="padding-bottom:20px;padding-top:20px;"/>

    </div>
</template>

<script>

import Catalogo from '@/components/productos/Catalogo'
import Productos from '@/components/productos/Productos'
import Carrito from '@/components/ventas/Carrito'

export default {
    name: 'Contenedor-principal',
    components: {
        Catalogo,
        Productos,
        Carrito
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
    methods: {
        cambiarComponente (componente, accion) {
            this.componente = 'Productos'
            this.accion = accion
        },
    }
}
</script>

