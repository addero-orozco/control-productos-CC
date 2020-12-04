<template>
    <div class="ui very padded segment" style="padding-top: 15px; padding-bottom: 0px;">
        <div v-for="(item, index) in valores" :key="index" style="padding-bottom: 15px;">
            {{item.nombre}}
            <a class="ui teal tag big label">
                <div class="detail" v-if="item.tipo == 1"><i>{{item.valor.toFixed(1)}}%</i> </div>
                <div class="detail" v-else=""><i>{{item.valor}}</i> </div>
            </a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Valores-indicador-tipo-entero',
    props: {
        valores: {
            type: Array,
            required: true
        }
    },
}

</script>