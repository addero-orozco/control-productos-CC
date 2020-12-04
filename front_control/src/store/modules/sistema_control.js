export const namespaced = true

import { APIServiceNimd } from '@/services/SistemaApi.js';
const apiServiceNimd = new APIServiceNimd();


export const state = {
    // eslint-disable-next-line
    catalogos: [],
    productos: [],
    idVendedor: 0,
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
    SET_ID_VENDEDOR(state, idVendedor) {
        state.idVendedor = idVendedor
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
    async obtenerProductos({ commit, dispatch, state }) {
        return await apiServiceNimd.getProductosCatalogo(state.idVendedor)
            .then(response => {
                // eslint-disable-next-line
                console.log(response)
                commit('SET_PRODUCTOS', response.resultados)
            })
    },
}