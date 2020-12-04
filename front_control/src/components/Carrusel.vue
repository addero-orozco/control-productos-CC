<template>

	<section class="section section--demo-1">
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<h2 class="section__title">{{accion.titulo}} </h2>
					<agile :infinite="false" :fade="false" :mobileFirst="true">
						<div v-for="(item, index) in accion.pasos" :key="item.id">
							<div class="ui container center aligned" style="padding-bottom:10px;">
								<div class="ui compact info message">
									<ul class="list">
										<h2>{{index+1}}/{{accion.pasos.length}}</h2> {{item.texto}}
									</ul>
								</div>
							</div>
							<img class="ui centered big bordered image slide" :src="getImgUrl(item.imagen)" :alt="item.imagen">
						</div>
						<template slot="prevButton"><i class="chevron left grey icon"></i></template>
    					<template slot="nextButton"><i class="chevron right blue grey icon"></i></template>
					</agile>
				</div>
			</div>

		</div>
	</section>

</template>

<script>

import { VueAgile } from 'vue-agile'

export default {
	name: 'Carrusel',
	props: {
		accion: Object
	},
	components: {
		agile: VueAgile
	},
	beforeCreated() {
	},
	computed: {
		pasos () {
			var pasos = this.acciones.find(item => item.id === this.id_accion)
            return accion
        },
	},
	methods: {
		getImgUrl(imagen) {
			try {
				var images = require.context('../assets/manual/acciones/', false, /\.png$/)
				return images('./' + imagen + ".png")
			}
			catch {
				var images = require.context('../assets/', false, /\.png$/)
				return images("./sin_imagen.png")
			}
		}
	},
}
</script>

<style lang="sass">
// VueAgile styles
.agile
	&__nav-button
		background: transparent
		border: none
		color: #fff
		cursor: pointer
		font-size: 24px
		height: 100%
		position: absolute
		top: 0
		transition-duration: .3s
		width: 80px

		&:hover
			background-color: rgba(#000, .5)
			opacity: 1

		&--prev
			left: 0

		&--next
			right: 0

	&__dots
		bottom: 10px
		left: 50%
		position: absolute
		transform: translateX(-50%)

	&__dot
		margin: 0 10px

		button 
			background-color: transparent
			border: 1px solid #fff
			border-radius: 50%
			cursor: pointer
			display: block
			height: 10px
			font-size: 0
			line-height: 0
			margin: 0
			padding: 0
			transition-duration: .3s
			width: 10px

		&--current,
		&:hover
			button
				background-color: #fff

// Slides styles
.slide
	display: block
	height: 400px
	object-fit: cover
	width: 100%
</style>