import { Pie, mixins } from 'vue-chartjs'


export default {
    extends: Pie,
    mixins: [mixins.reactiveProp],
    props: {
        legendPosition: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            options: {}
        }
    },
    watch: {
        chartData() {
            this.renderChart(this.chartData, this.options)

            this.mostrar_legendas = this.generateLegend();
            this.$emit('generated', this.mostrar_legendas)
        }
    },
    mounted() {
        this.options = {
            legend: {
                display: false,
            },
            legendCallback: function(chart) {
                var legendHtml = [];
                legendHtml.push('<div style="display: flex;flex-flow: row wrap;justify-content: center;align-content: space-around;">')
                var item = chart.data.datasets[0];
                for (var i=0; i < item.data.length; i++) {
                    legendHtml.push(
                        '<div style="float: left; margin-right:10px;">' +
                            '<div style="float: left; margin-right:10px; background-color:' + item.backgroundColor[i] +'; width:15px; height:15px;"></div>' +
                            chart.data.labels[i]+': ' + item.data[i] +
                        '</div>');
                }
                legendHtml.push('</div>')
                return legendHtml.join("");
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }

        this.renderChart(this.chartData, this.options)

        this.mostrar_legendas = this.generateLegend();
        this.$emit('generated', this.mostrar_legendas)
    }
}