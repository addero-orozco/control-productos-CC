import { Bar, mixins } from 'vue-chartjs'


export default {
    extends: Bar,
    mixins: [mixins.reactiveProp],
    props: {
        legendPosition: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            options: {},
            mostrar_legendas: '',
            mostrar_labels: false
        }
    },
    watch: {
        chartData() {
            this.renderChart(this.chartData, this.options)

            this.mostrar_legendas = this.generateLegend();
            this.$emit('generated', this.mostrar_legendas)
        },
        cantidad_labels () {
            if (this.chartData.labels.length > 100) this.mostrar_labels=false
        }
    },
    computed: {
        cantidad_labels () {
            return this.chartData.labels.length
        }
    },
    mounted() {

        this.options = {
            title: {
                display: false,
                text: 'Titulo'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: this.mostrar_labels
                    },
                    gridLines: {
                        display: false
                    }
                }]
                /*
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(250 / 5),
                        max: 250
                    }
                }]
                */
            },
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
            responsive: true,
            maintainAspectRatio: false
        }

        this.renderChart(this.chartData, this.options)

        this.mostrar_legendas = this.generateLegend();
        this.$emit('generated', this.mostrar_legendas)
    }
}