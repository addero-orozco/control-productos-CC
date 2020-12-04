/* eslint-disable */
import axios from 'axios';

const headers = { headers: { 'X-CSRFToken': csrftoken } }

const qs = require('qs');

export class APIServiceNimd {
    constructor() {

    }

    // 1. OBTENER PROYECTOS
    getCatalogos() {
        const url = `/api/v1/catalogos/`
        return axios.get(url, headers).then(response => response.data);
    }

}