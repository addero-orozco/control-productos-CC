<template>
    <div class="ui container">
        <div class="ui relaxed divided items">

            <div class="item" v-for="item in accion" :key="item.id">
                <div class="ui small image">
                    <img :src="getImgUrl(item.imagen)">
                </div>
                <div class="content">
                    <div class="header">{{item.titulo}}</div>
                    <div class="description">
                        {{item.descripcion}}
                    </div>
                    <div class="extra">
                        <div class="ui right floated primary button" @click="ver_accion(item)" v-if="!item.acciones && item.pasos.length > 0">
                            Ver
                            <i class="right chevron icon"></i>
                        </div>
                        <div class="ui right floated primary button" @click="ver_lista(item)" v-else-if="item.acciones && !item.pasos">
                            Ver
                            <i class="right chevron icon"></i>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: 'Item-Lista',
	props: {
        accion: Array
	},
    methods: {
        ver_accion(accion) {
            this.$emit('clic_boton', 'DetalleAccion', accion, this.accion)
        },
        ver_lista(accion) {
            this.$emit('clic_boton', 'ItemLista', accion, this.accion)
        },
        getImgUrl(imagen) {
			try {
                var images = require.context('../assets/manual/lista/', false, /\.png$/)
				return images('./' + imagen + ".png")
			}
			catch {
                var images = require.context('../assets/', false, /\.png$/)
				return images("./sin_imagen.png")
			}
        }
    }
}
</script>