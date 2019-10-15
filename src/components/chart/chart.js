import * as d3 from "d3";
import 'd3-selection-multi';

class Chart {
  constructor(instance, data, reference, xAxis, yAxis, setting) {
    this.instance = instance;
    this.data = data;
    this.reference = reference;
    this.xAxis = xAxis;
    this.yAxis = yAxis;

    this.setting = setting;

    this.chart = this.setting.type === 'line' ? this.instance.append('path') : this.instance.append('g');
    this.chart.attr('class', this.setting.class);

    this.xRange =  d3.scaleLinear().rangeRound([0, this.setting.width]);
    this.yRange =  d3.scaleLinear().rangeRound([this.setting.height, 0]);

    this.line = d3.line().x(d => this.xRange(d.waveLength)).y(d => this.yRange(d.energyDensity));

  }

  arrangeData(data) {
    if(this.reference.length > 0){
      const minWave = this.reference[0].waveLength;
      const maxWave = this.reference[this.reference.length - 1].waveLength;
      return data.filter(d => d.waveLength >= minWave && d.waveLength <= maxWave);        
    }
    return data;    
  }  

  update() {
    this.xRange.domain(d3.extent(this.reference, d => d.waveLength ));
    this.yRange.domain(d3.extent(this.data, d => d.energyDensity ));

    this.yAxis.call(d3.axisLeft(this.yRange).ticks(0));
    this.xAxis.call(d3.axisBottom(this.xRange));

    const chartData = (stroke, line) => ({
      fill: 'none',
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round',
      'stroke-width': 1,
      d: line,
      stroke,
    })

  }
}