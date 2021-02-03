class Charts {
    init = async () => {
        const chart = require('chart');
        const api = require('./api');
        this.barChart(chart);
        this.roundChart(chart);
        this.lineChart(chart);
    }

    barChart = async (chart) => {

    }

    roundChart = async (chart) => {

    }

    lineChart = async (chart) => {

    }
}

const charts = new Charts();
charts.init();