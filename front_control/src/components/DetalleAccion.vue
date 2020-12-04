<template>

	<div class="contenedor_detalleaccion">
		<Carrusel :accion="accion"/>
	</div>

</template>

<script>

import Carrusel from '@/components/Carrusel'

import acciones from '@/json/acciones.json'

export default {
	name: 'Detalle',
	props: {
		accion: Object
	},
	components: {
		Carrusel
	}
}
</script>
