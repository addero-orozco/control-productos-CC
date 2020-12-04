export const namespaced = true

import { APIServiceNimd } from '@/services/SistemaApi.js';
const apiServiceNimd = new APIServiceNimd();


export const state = {
    // eslint-disable-next-line
    catalogos: [],
    productos: [],
    carrito: []
}

export const getters = {
}

export const mutations = {
    SET_CATALOGOS(state, catalogos) {
        state.catalogos = catalogos
    },
    SET_PRODUCTOS(state, productos) {
        state.productos = productos
    },
    SET_CARRITO(state, producto) {
        state.carrito.push(producto)
    },
    SET_QUITAR_CARRITO(state, index) {
        state.carrito.splice(state.carrito.indexOf(index), 1);
    },
    SET_LIMPIAR_CARRITO(state) {
        state.carrito = []
    }
}

export const actions = {
    // eslint-disable-next-line
    async obtenerCatalogo({ commit, dispatch, state }) {
        return await apiServiceNimd.getCatalogos()
            .then(response => {
                // eslint-disable-next-line
                //console.log(response)
                commit('SET_CATALOGOS', response.resultados)
            })
    },
    // eslint-disable-next-line
    async obtenerProductos({ commit, dispatch, state }, idVendedor) {
        return await apiServiceNimd.getProductosCatalogo(idVendedor)
            .then(response => {
                // eslint-disable-next-line
                console.log(response)
                commit('SET_PRODUCTOS', response.resultados)
            })
    },
    // eslint-disable-next-line
    agregarCarrito({ commit, dispatch, state }, producto) {
        commit('SET_CARRITO', producto)
    },
    // eslint-disable-next-line
    quitarCarrito({ commit, dispatch, state }, index) {
        commit('SET_QUITAR_CARRITO', index)
    },
    // eslint-disable-next-line
    limpiarCarrito({ commit, dispatch, state }) {
        commit('SET_CARRITO')
    },
}