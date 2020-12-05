<template>
    <div class="contenedor">
        <h2 class="ui lefth header">Mis productos</h2>
        <MensajePositivo v-show="mensaje_confirmacion==true" :mensaje="mensaje" />
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

<!-- MODAL -->
    <modal ref="modalName">
      <template v-slot:header>
        <h1>Eliminar producto</h1>
      </template>

      <template v-slot:body>
        <p>Clic en confirmar.</p>
      </template>

      <template v-slot:footer>
        <div>
            <button class="ui orange button" @click="eliminar_producto()">Eliminar</button>
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
import MensajePositivo from '@/components/MensajePositivo'

export default {
    name: 'Catalogos-vendedor',
    components: {
        Modal,
        MensajePositivo
    },
    data() {
        return {
            id_model_eliminar: 0,
            mensaje_confirmacion: false,
            texto: ''
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

           /* Mensaje de confirmación */
            this.mensaje_confirmacion = true
            this.mensaje = 'Producto eliminado con éxito'
            setTimeout(() => this.mensaje_confirmacion = false, 3000)
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