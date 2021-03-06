export const namespaced = true

import { APIServiceNimd } from '@/services/SistemaApi.js';
const apiServiceNimd = new APIServiceNimd();


export const state = {
    // eslint-disable-next-line
    catalogos: [],
    productos: [],
    carrito: [],
    reporte_total: 0,
    reporte_por_producto: [],
    idVendedor: 0,
    catalogo_vendedor: [],
    logueo: false
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
    },
    SET_ID_VENDEDOR(state, idVendedor) {
        state.idVendedor = idVendedor
    },
    SET_CATALOGO_VENDEDOR(state, catalogo_vendedor) {
        state.catalogo_vendedor = catalogo_vendedor
    },
    SET_LOGUEO(state, logueo) {
        if (logueo == 203) state.logueo = false
        else if (logueo == 200) state.logueo = true
    }
}

export const actions = {
    /* Comportamientos para los catalogos */

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
    async obtenerCatalogoVendedor({ commit, dispatch, state }) {
        return await apiServiceNimd.getCatalogoVendedor()
            .then(response => {
                // eslint-disable-next-line
                //console.log(response)
                commit('SET_CATALOGO_VENDEDOR', response.resultados)
            })
    },

    /* Comportamientos para los productos */
    // eslint-disable-next-line
    async edicionProductos({ commit, dispatch, state }, data) {
        return await apiServiceNimd.confirmarEditarProducto(data.idProducto, data.datos)
            .then(response => {
                // eslint-disable-next-line
                console.log(response)
                //commit('SET_LIMPIAR_CARRITO')
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
    async desactivarProducto({ commit, dispatch, state }, idProducto) {
        return await apiServiceNimd.getDesactivarProducto(idProducto)
            .then(response => {
                // eslint-disable-next-line
                console.log(response)
                commit('SET_CATALOGO_VENDEDOR', response.resultados)
            })
    },
    // eslint-disable-next-line
    async crearProducto({ commit, dispatch, state }, datos) {
        return await apiServiceNimd.postNuevoProducto(datos)
            .then(response => {
                // eslint-disable-next-line
                console.log(response)
                //commit('SET_CATALOGO_VENDEDOR', response.resultados)
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
        return await apiServiceNimd.confirmarCompra(state.idVendedor, state.carrito)
            .then(response => {
                // eslint-disable-next-line
                console.log(response)
                commit('SET_LIMPIAR_CARRITO')
            })
    },

    // eslint-disable-next-line
    async obtenerLogueo({ commit, dispatch, state }) {
        return await apiServiceNimd.getLogueo()
            .then(response => {
                // eslint-disable-next-line
                console.log(response)
                commit('SET_LOGUEO', response)
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