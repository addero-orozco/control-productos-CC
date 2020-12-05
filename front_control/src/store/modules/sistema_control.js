export const namespaced = true

import { APIServiceNimd } from '@/services/SistemaApi.js';
const apiServiceNimd = new APIServiceNimd();


export const state = {
    // eslint-disable-next-line
    catalogos: [],
    productos: [],
    carrito: [],
    reporte_total: 0,
    reporte_por_producto: []
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
    },
    SET_REPORTE_TOTAL(state, reporte_total) {
        state.reporte_total = reporte_total
    },
    SET_REPORTE_POR_PRODUCTO(state, reporte_por_producto) {
        state.reporte_por_producto = reporte_por_producto
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

    /* Comportamientos para el carrito de compras */

    // eslint-disable-next-line
    agregarCarrito({ commit, dispatch, state }, producto) {
        commit('SET_CARRITO', producto)
    },
    // eslint-disable-next-line
    quitarCarrito({ commit, dispatch, state }, index) {
        commit('SET_QUITAR_CARRITO', index)
    },

    /* Comportamiento para las compras*/

    // eslint-disable-next-line
    async confirmarCompra({ commit, dispatch, state }) {
        return await apiServiceNimd.confirmarCompra(state.carrito)
            .then(response => {
                // eslint-disable-next-line
                console.log(response)
                commit('SET_LIMPIAR_CARRITO')
            })
    },

    /* Comportamientos para reporte */

    // eslint-disable-next-line
    async obtenerReporteTotal({ commit, dispatch, state }) {
        return await apiServiceNimd.getReporteTotal()
            .then(response => {
                // eslint-disable-next-line
                console.log(response)
                commit('SET_REPORTE_TOTAL', response.resultados)
            })
    },
    // eslint-disable-next-line
    async obtenerReportePorProducto({ commit, dispatch, state }) {
        return await apiServiceNimd.getReportePorProducto()
            .then(response => {
                // eslint-disable-next-line
                console.log(response)
                commit('SET_REPORTE_POR_PRODUCTO', response.resultados)
            })
    },
}