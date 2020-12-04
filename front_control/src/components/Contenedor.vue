<template>
    <div class="contenedor">
        <div>
            <div class="pusher">
                <div id="desktop_bar" class="ui left fixed inverted vertical menu">
                    <a class="item">Catalogos</a>
                    <a class="item" @click="productos()">Productos</a>
                    <a class="item">Reportes</a>
                </div>
            </div>
        </div>

        <catalogo/>

    </div>
</template>

<script>

import Catalogo from '@/components/productos/Catalogo'

export default {
    name: 'Contenedor-principal',
    components: {
        Catalogo,
    },
    props: {
        msg: String
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

