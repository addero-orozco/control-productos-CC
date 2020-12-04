<template>

    <div class="dashboard_contenedor">


        <div>
            <div class="pusher">
                <div id="desktop_bar" class="ui left fixed inverted vertical menu">
                    <a class="item">Catalogos</a>
                    <a class="item" @click="productos()">Productos</a>
                    <a class="item">Reportes</a>
                </div>
            </div>
        </div>


        <div class="ui icon menu">
            <a class="item" v-if="mostrarRegresar" @click="regresar()">
                <i class="arrow left icon"></i>Regresar
            </a>
        </div>

        <component :is="componente" v-if="componente" @clic_boton="cambiarComponente" :accion="accion" style="padding-bottom:20px;padding-top:20px;"/>

        <div class="ui icon menu" v-if="mostrarRegresar">
            <a class="item" @click="regresar()">
                <i class="arrow left icon"></i>Regresar
            </a>
        </div>
    </div>

</template>

<script>

import AccionesJson from '@/json/acciones.json'

import ItemLista from '@/components/ItemLista'
import DetalleAccion from '@/components/DetalleAccion'


export default {
    name: 'Dasboard',
    components: {
        ItemLista,
        DetalleAccion
    },
    data() {
        return {
            acciones: AccionesJson,
            componente: 'ItemLista',
            accion: AccionesJson,
            ultimos_lista: []
        }
    },
    computed: {
        mostrarRegresar() {
            if(this.ultimos_lista.length > 0) return true
            else return false
        }
    },
    methods: {
        cambiarComponente (componente, accion, ultima_lista) {
            this.componente = componente
            this.ultimos_lista.push(ultima_lista)

            if(accion.pasos == null) {
                this.accion = accion.acciones
            }
            else if(accion.acciones == null) {
                this.accion = accion
            }
        },
        productos() {
            
        }
    }
}
</script>