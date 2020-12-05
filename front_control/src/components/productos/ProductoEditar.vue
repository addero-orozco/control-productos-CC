<template>
    <div class="contenedor">
        <h2 class="ui lefth header">Editar Producto</h2>
        <div class="ui segment">



            <div class="ui form">
                <div class="field">
                    <label>Nombre</label>
                    <input v-model="accion.nombre" type="text" name="first-name" placeholder="Nombre del producto">
                </div>
                <div class="field">
                    <label>Precio</label>
                    <input v-model="accion.precio" type="text" name="first-name" placeholder="Precio del producto">
                </div>
                <div class="field">
                    <label>Descripción</label>
                    <textarea v-model="accion.descripcion" rows="4"></textarea>
                </div>
                <button class="ui button primary" @click="put_producto()">Guardar</button>
            </div>




        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import store from '@/store/index'

export default {
    name: 'Producto-editar',
    props: {
        accion: Object
    },
    components: {
    },
    data() {
        return {
        }
    },
    beforeMount() {
    },
    computed: {
        ...mapState(['sistema_control']),
    },
    methods: {

       put_producto() {
           var datos = {nombre:this.accion.nombre,precio: this.accion.precio,descripcion:this.accion.descripcion, usuario:1}
           store.dispatch('sistema_control/edicionProductos', {idProducto: this.accion.id, datos})
           this.$emit('clic_boton', 'ListaProductos')
       }
    }
}
</script>