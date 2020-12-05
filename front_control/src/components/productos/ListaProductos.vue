<template>
    <div class="contenedor">
        <h2 class="ui lefth header">Mis productos</h2>

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
                    <div class="ui editar button" @click="editar_producto(producto)">Editar</div>
                    <div class="ui orange button" @click="abrir_modal(producto.id)">Eliminar</div>
                </div>
                </div>
            </div>
        </div>













    <modal ref="modalName">
      <template v-slot:header>
        <h1>Eliminar producto</h1>
      </template>

      <template v-slot:body>
        <p>Clic en confirmar.</p>
      </template>

      <template v-slot:footer>
        <div>
          <button class="ui grey button" @click="$refs.modalName.closeModal()">Cancelar</button>
          <button class="ui orange button" @click="eliminar_producto()">Eliminar</button>
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
    name: 'Catalogos-vendedor',
    components: {
        Modal
    },
    data() {
        return {
            id_model_eliminar: 0
        }
    },
    beforeMount() {
        store.dispatch('sistema_control/obtenerCatalogoVendedor')
    },
    computed: {
        ...mapState(['sistema_control']),
        productos () {
            return this.sistema_control.catalogo_vendedor
        }
    },
    methods: {
       eliminar_producto() {
           store.dispatch('sistema_control/desactivarProducto', this.id_model_eliminar)
           this.$refs.modalName.closeModal()
       },
       editar_producto(producto) {
           this.$emit('clic_boton', 'ProductoEditar', producto)
       },
       abrir_modal(id_producto){
           this.id_model_eliminar = id_producto
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