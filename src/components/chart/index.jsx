import React from 'react';

import SpectrumChart from './spectrum-chart.js' 

class Chart extends React.Component {
  constructor(props){
    super(props);
    this.spectrumRef = React.createRef();
    this.spectrumChart = null
  }  

  componentDidMount() {
    console.log(this.spectrumRef.current)
    this.spectrumChart = new SpectrumChart(this.spectrumRef.current)
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.spectrumData !== prevProps.spectrumData) {

      const { spectrumData } = this.props

      const galaxyData =[];
      const dataKey = 'BestFit';
      // const dataKey = chartMode === 0 ? 'Flux' : 'BestFit';
      //const dataCorrection = needCorrect ? csvDataSet[dataSelector.value].correct || 1 : 1;

      spectrumData.data.forEach((d,i) => {
        if( i % 3 === 0){
          galaxyData.push({energyDensity: parseInt(d[dataKey]), waveLength: parseInt(d.Wavelength)*Math.pow(10, -10)});
        }
      })

      console.log(galaxyData, galaxyData.length)
      console.log(this.props.spectrumData)

      if(galaxyData.length > 0){
        this.spectrumChart.updateGalaxyChart(galaxyData)
        this.spectrumChart.setAxisReference('galaxy')
        this.spectrumChart.chartRender()        
      }
    }
  }

  render() {
    const {
      spectrumData,
      t,
    } = this.props;

    return(
      <div className="chart">
        <svg className="spectrum" ref={this.spectrumRef} width="1000px" height="640px"></svg>
      </div>
    )
  }
}

export default Chart;