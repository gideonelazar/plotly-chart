/////https://plot.ly/javascript/
import Plotly from 'plotly.js';
import approved from  './approved.json';
import declined from  './declined.json';
import chargeback from './chargeback.json';

let now = new Date();
let dates = [], points1 = [], points2 = [], points3 = [];

for (let d = new Date(2016, 6, 1); d <= now; d.setDate(d.getDate() + 1)) {
    points1.push(Math.random() * (12 - 1) + 1);
    points2.push(Math.random() * (12 - 1) + 1);
    points3.push(Math.random() * (12 - 1) + 1);
    dates.push(new Date(d));
}

approved.x = dates;
approved.y = points1;
declined.x = dates;
declined.y = points2;
chargeback.x = dates;
chargeback.y = points3;

let data = [approved, declined, chargeback];
let layout = {
    legend: {"orientation": "h"},
    yaxis2: {
        showline: false,
        showgrid: false,
        //fixedrange: true,
        titlefont: {color: '#1f77b4'},
        tickfont: {color: '#1f77b4'},
        overlaying: 'y',
        side: 'right'
    },
    xaxis: {
        fixedrange: true,
        showline: false,
        showgrid: false,                  // remove the x-axis grid lines
        tickformat: "%d %B"              // customize the date format to "month, day"
    }
};

function stackedArea(traces) {
    for (let i = 1; i < traces.length; i++) {
        for (var j = 0; j < (Math.min(traces[i]['y'].length, traces[i - 1]['y'].length)); j++) {
            traces[i]['y'][j] += traces[i - 1]['y'][j];
        }
    }
    return traces;
}

//https://github.com/plotly/plotly.js/blob/master/src/plot_api/plot_config.js#L22-L86
let settings = {
    displayModeBar: false,
    doubleClick: 'reset+autosize',
    showTips: false
};

Plotly.newPlot('myDiv', stackedArea(data), layout, settings);


