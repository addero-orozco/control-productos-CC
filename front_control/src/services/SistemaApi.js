/* eslint-disable */
import axios from 'axios';

const headers = { headers: { 'X-CSRFToken': csrftoken } }

const config = {
    headers: {
      'X-CSRFToken': csrftoken,
      'Content-Type': "application/json",
    }
}

const qs = require('qs');

export class APIServiceNimd {
    constructor() {

    }

    /* Obtener todos los catalogos de los vendedores*/
    getCatalogos() {
        const url = `/api/v1/catalogos/`
        return axios.get(url, headers).then(response => response.data);
    }

    getCatalogoVendedor() {
        const url = `/api/v1/catalogo-vendedor/`
        return axios.get(url, headers).then(response => response.data);
    }

    /* Obtener todos los productos del catalogo del vendedor*/
    getProductosCatalogo(idVendedor) {
        const url = `/api/v1/productos-catalogo/${idVendedor}/`
        return axios.get(url, headers).then(response => response.data);
    }

    /* Desactivar de productos*/
    confirmarEditarProducto(idProducto, datos) {
        const url = `/api/v1/productos/${idProducto}/`
        return axios.put(url, datos, headers).then(response => response.data);
    }
    postNuevoProducto(datos) {
        const url = `/api/v1/productos/`
        return axios.post(url, datos, config).then(response => response.data);
    }


    getDesactivarProducto(idProducto) {
        const url = `/api/v1/desactivar-producto/${idProducto}/`
        return axios.get(url, headers).then(response => response.data);
    }

    getLogueo() {
        const url = `/api/v1/usuario-log/`
        return axios.get(url, headers).then(response => response.status);
    }

    /* Descontar de productos*/
    descontarProductos(idProducto) {
        const url = `/api/v1/productos-descontar/${idProducto}/`
        return axios.get(url, headers).then(response => response.data);
    }

    /* Confirmar compra*/
    confirmarCompra(idVendedor, datos) {
        const url = `/api/v1/venta-confirmar/${idVendedor}/`
        return axios.post(url, datos, headers).then(response => response.data);
    }

     /* REPORTES */
     getReporteTotal() {
        const url = `/api/v1/reporte-total/`
        return axios.get(url, headers).then(response => response.data);
    }

    getReportePorProducto() {
        const url = `/api/v1/reporte-producto/`
        return axios.get(url, headers).then(response => response.data);
    }

}