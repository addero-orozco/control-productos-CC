<template>
    <div class="ui positive message">
        <div class="header">
            Confirmado
        </div>
        <p>{{mensaje}}.</p>
    </div>
</template>

<script>
export default {
    name: 'MensajePositivo',
    props: {
        mensaje: String
	},
}
</script>