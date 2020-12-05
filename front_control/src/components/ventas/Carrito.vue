<template>
    <div class="contenedor">
        <a class="item">
            <i class="arrow left icon"></i>Regresar
        </a>
        <h2 class="ui lefth header">Productos del carrito</h2>

        <MensajePositivo v-show="mensaje_confirmacion==true" :mensaje="mensaje" />
        <MensajeAdvertencia v-show="mensaje_cancelacion==true" :mensaje="mensaje" />

        <div class="ui cards">
            <div class="card" v-for="(producto, index) in productos" :key="index">
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
                    <div class="ui basic red button" @click="abrir_modal(index)">Quitar</div>
                </div>
                </div>
            </div>
        </div>

        <div class="ui message" v-if="productos.length > 0">
            <div class="ui center aligned header">
                Confirmar compra
            </div>
            <div class="ui green button" @click="abrir_modal_confirmar_compra()">Comprar</div>
            <div class="ui orange button" @click="abrir_modal_cancelar_compra()">Cancelar compra</div>
        </div>


<!-- MODAL -->
    <modal ref="modalName">
      <template v-slot:header>
        <h1>Quitar de carrito</h1>
      </template>

      <template v-slot:body>
        <p>Clic en confirmar.</p>
      </template>

      <template v-slot:footer>
        <div>
            <button class="ui orange button" @click="quitar_carrito()">Quitar</button>
            <button class="ui grey button" @click="$refs.modalName.closeModal()">Cancelar</button>
        </div>
      </template>
    </modal>



<!-- MODAL -->
    <modal ref="modalLimpiarCarrito">
      <template v-slot:header>
        <h1>Cancelar toda la compra</h1>
      </template>

      <template v-slot:body>
        <p>Clic en confirmar.</p>
      </template>

      <template v-slot:footer>
        <div>
            <button class="ui orange button" @click="cancelar_carrito()">Eliminar compra</button>
            <button class="ui grey button" @click="$refs.modalLimpiarCarrito.closeModal()">Cancelar</button>
        </div>
      </template>
    </modal>



<!-- MODAL -->
    <modal ref="modalConfirmarCompra">
      <template v-slot:header>
        <h1>Realizar la compra</h1>
      </template>

      <template v-slot:body>
        <p>Clic en confirmar.</p>
      </template>

      <template v-slot:footer>
        <div>
            <button class="ui green button" @click="confirmar_compra()">Confirmar</button>
            <button class="ui grey button" @click="$refs.modalConfirmarCompra.closeModal()">Cancelar</button>
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
import MensajeAdvertencia from '@/components/MensajeAdvertencia'

export default {
    name: 'Carrito',
    components: {
        Modal,
        MensajePositivo,
        MensajeAdvertencia
    },
    data() {
        return {
            index_producto: 0,
            mensaje_confirmacion: false,
            mensaje: '',
            mensaje_cancelacion: false
        }
    },
    beforeMount() {
        //store.dispatch('sistema_control/obtenerProductos',this.accion)
    },
    computed: {
        ...mapState(['sistema_control']),
        productos () {
            return this.sistema_control.carrito
        }
    },
    methods: {
        quitar_carrito(index) {
            store.dispatch('sistema_control/quitarCarrito', index)
            this.$refs.modalName.closeModal()
        },
        confirmar_compra() {
            store.dispatch('sistema_control/confirmarCompra')
            this.$refs.modalConfirmarCompra.closeModal()

            /* Mensaje de confirmación */
            this.mensaje_confirmacion = true
            this.mensaje = 'Compra realizada con éxito'
            setTimeout(() => this.mensaje_confirmacion = false, 5000)
        },
        cancelar_carrito() {
            store.commit('sistema_control/SET_LIMPIAR_CARRITO')
            this.$refs.modalLimpiarCarrito.closeModal()

            /* Mensaje de cancelación */
            this.mensaje_cancelacion = true
            this.mensaje = 'Compra cancelada'
            setTimeout(() => this.mensaje_cancelacion = false, 5000)
        },
        abrir_modal(index){
           this.index_producto = index
           this.$refs.modalName.openModal()
       },
       abrir_modal_cancelar_compra(){
           this.$refs.modalLimpiarCarrito.openModal()
       },
       abrir_modal_confirmar_compra(){
           this.$refs.modalConfirmarCompra.openModal()
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