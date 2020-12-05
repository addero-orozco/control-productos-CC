<template>
    <div class="contenedor">
        <h2 class="ui lefth header">Nuevo Producto</h2>
        <div class="ui segment">



            <div class="ui form">
                <div class="field">
                    <label>Nombre</label>
                    <input v-model="nombre" type="text" name="first-name" placeholder="Nombre del producto">
                </div>
                <div class="field">
                    <label>Precio</label>
                    <input v-model="precio" type="text" name="first-name" placeholder="Precio del producto">
                </div>
                <div class="field">
                    <label>Cantidad</label>
                    <input v-model="cantidad" type="text" name="first-name" placeholder="Cantidad del producto">
                </div>
                <div class="field">
                    <label>Descripción</label>
                    <textarea v-model="descripcion" rows="4"></textarea>
                </div>
                <button class="ui button primary" @click="crear_producto()">Guardar</button>
            </div>




        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import store from '@/store/index'

export default {
    name: 'Producto-crear',
    components: {
    },
    data() {
        return {
            nombre: '',
            precio: 0,
            cantidad: 0,
            descripcion: '',
        }
    },
    beforeMount() {
    },
    computed: {
        ...mapState(['sistema_control']),
    },
    methods: {
       crear_producto() {
           var datos = {nombre:this.nombre,precio: this.precio,cantidad: this.cantidad,descripcion:this.descripcion, usuario:1}
            store.dispatch('sistema_control/crearProducto', datos)
            this.$emit('clic_boton', 'ListaProductos')
       },
    }
}
</script>