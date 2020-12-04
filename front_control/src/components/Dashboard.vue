<template>

    <div class="dashboard_contenedor">

        <div class="ui icon menu">
            <a class="item" v-if="mostrarRegresar" @click="regresar()">
                <i class="arrow left icon"></i>Regresar
            </a>

            <div class="ui right menu">
                <div class="header item">
                    Manual NIMDSYS
                </div>
            </div>
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
        regresar(ultima_lista) {
            this.componente = "ItemLista"
            this.accion = this.ultimos_lista[this.ultimos_lista.length - 1]
            this.ultimos_lista.pop()
        },
        busqueda(texto) {
            console.log(this.findNestedObj(this.acciones, 'titulo', texto));
            var act = this.findNestedObj(this.acciones, 'titulo', texto)

            //this.accion = act
            if(act.pasos == null) {
                this.accion = act.acciones
                this.componente = "ItemLista"
            }
            else if(act.acciones == null) {
                this.accion = act
                this.componente = "DetalleAccion"
            }
        },
        findNestedObj(entireObj, keyToFind, valToFind) {
            let foundObj;
            JSON.stringify(this.acciones, (_, nestedValue) => {
                if (nestedValue && nestedValue[keyToFind] === valToFind) {
                foundObj = nestedValue
                }
                return nestedValue;
            });
            return foundObj;
        }
    }
}
</script>