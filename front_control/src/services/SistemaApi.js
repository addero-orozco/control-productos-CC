/* eslint-disable */
import axios from 'axios';

const headers = { headers: { 'X-CSRFToken': csrftoken } }

console.log(headers)

const qs = require('qs');

export class APIServiceNimd {
    constructor() {

    }

    /* Obtener todos los catalogos de los vendedores*/
    getCatalogos() {
        const url = `/api/v1/catalogos/`
        return axios.get(url, headers).then(response => response.data);
    }

    /* Obtener todos los productos del catalogo del vendedor*/
    getProductosCatalogo(idVendedor) {
        const url = `/api/v1/productos-catalogo/${idVendedor}/`
        return axios.get(url, headers).then(response => response.data);
    }

    /* Descontar de productos*/
    descontarProductos(idProducto) {
        const url = `/api/v1/productos-descontar/${idProducto}/`
        return axios.get(url, headers).then(response => response.data);
    }

    /* Descontar de productos*/
    descontarProductos(idProducto) {
        const url = `/api/v1/productos-descontar/${idProducto}/`
        return axios.get(url, headers).then(response => response.data);
    }

    /* Confirmar compra*/
    confirmarCompra(datos) {
        const url = `/api/v1/venta-confirmar/`
        return axios.post(url, datos, headers).then(response => response.data);
    }


}