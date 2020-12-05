<template>
    <div class="contenedor">

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
                    <div class="ui green button" v-if="producto.cantidad > 0" @click="abrir_modal(producto)">Comprar</div>
                    <div class="ui basic red button" v-else>Sin existencias</div>
                </div>
                </div>
            </div>
        </div>







<!-- MODAL -->
    <modal ref="modalName">
      <template v-slot:header>
        <h1>Agregar producto al carrito</h1>
      </template>

      <template v-slot:body>
        <p>Clic en confirmar.</p>
      </template>

      <template v-slot:footer>
        <div>
            <button class="ui green button" @click="agregar_carrito()">Agregar</button>
            <button class="ui grey button" @click="$refs.modalName.closeModal()">Cancelar</button>
        </div>
      </template>
    </modal>











    </div>
</template>

<script>

import { mapState } from 'vuex'
import store from '@/store/index'
import Modal from "@/components/Modal";

export default {
    name: 'Productos',
    components: {
        Modal
    },
    props: {
        accion: Number
	},
    data() {
        return {
            producto: {}
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
        agregar_carrito() {
            store.dispatch('sistema_control/agregarCarrito', this.producto)
            this.$refs.modalName.closeModal()
        },
        abrir_modal(producto){
           this.producto = producto
           this.$refs.modalName.openModal()
       }
    }
}
</script>

/* MODAL */
<style lang="scss">
.overflow-hidden {
  overflow: hidden;
}
</style>