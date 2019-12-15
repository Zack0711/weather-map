import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles'

import {
  ComposedChart,
  Bar,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from 'recharts'

const useStyles = makeStyles(theme => ({
  chart: {
    height: '480px',
    position: 'relative',
    '& .recharts-responsive-container': {
      position: 'absolute',      
    }
  },
  elementChart: {
    '& .recharts-cartesian-axis': {
      opacity: 0,
    }
  }
}))

const light = [
 { Wavelength: 3800, energyDensity: 100 },
 { Wavelength: 7400, energyDensity: 100 },
]

const dataLimitCheck = (type, data=[]) => {
  const dataLength = data.length
  return (
    type === 'temperature'
    ? { min: 0, max:  20000}
    : {
      min: (data && dataLength > 0) ? data[0].Wavelength : 'dataMin',
      max: (data && dataLength > 0) ? data[dataLength - 2].Wavelength : 'dataMax',
    })
}

const DEFAULT_STATE = {
  spectrum: {
    count: 0,
    density: 0,
  },
  element: {
    count: 0,
    density: 0,
  },  
}

const arrangeData = (data, list, type, key) => {
  let {
    min = Infinity,
    max = 0,
  } = data

  list.forEach( d => {
    const wavelength = Math.floor(d.Wavelength * 10)
    const dataDensity = d[key]

    if(!data[wavelength]) data[wavelength] = { ...DEFAULT_STATE, wavelength: wavelength / 10 }

    let {
      count,
      density,
    } = data[wavelength][type]

    data[wavelength]['spectrum'] = {
      count: count + 1,
      density: (density * count + dataDensity) / (count + 1)
    }

    if(min > wavelength) min = wavelength
    if(max < wavelength) max = wavelength

  })

  data['min'] = min / 10
  data['max'] = max / 10

  return data
}

const Chart = props => {
  const {
    type,
    spectrumData,
    elementData = [],
    t,
  } = props;

  const classes = useStyles()
  const [chartData, setChartData] = useState({})
  const [dataList, setDataList] = useState([])
  const [dataLimit, setDataLimit] = useState(dataLimitCheck(type))

  useEffect(() => {
    setDataLimit({ min: chartData.min, max: chartData.max})
    const list = Object.keys(chartData).filter( d => d !== 'max' && d !== 'min' )
    setDataList(list.map( d => ({
      wavelength: chartData[d].wavelength,
      spectrum: chartData[d].spectrum.density,
      element: chartData[d].element.density,
    })))
    //console.log(list)
  }, [chartData])

  useEffect(() => {
    console.log(elementData)
    //setChartData({ ...arrangeData(chartData, elementData, 'element', 'energyDensity') })
  }, [elementData])

  useEffect(() => {
    if(spectrumData.data){
      setChartData({ ...arrangeData(chartData, spectrumData.data, 'spectrum', 'BestFit') })
      //console.log(chartData)
      //console.log(spectrumData)      
    }
  }, [spectrumData])

  return (
    <div className={classes.chart}>
      <ResponsiveContainer width="100%" height={480} className={classes.elementChart}>
        <ComposedChart data={elementData} >
          <XAxis 
            dataKey="Wavelength"
            type="number"
            allowDecimals={false}
            allowDataOverflow={true}
            domain={[dataLimit.min, dataLimit.max]}
          />
          <YAxis 
            yAxisId="left"
            type="number"
            tick={false}
            domain={[0, 'dataMax']}
            label={{ value: 'Energy Density', angle: -90}}
            allowDataOverflow={true}
          />
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="energyDensity" 
            dot={false} 
            isAnimationActive={false}
            stroke="#f00"
          />
        </ComposedChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={480}>
        <ComposedChart data={dataList} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="wavelength"
            type="number"
            allowDecimals={false}
            allowDataOverflow={true}
            domain={[dataLimit.min, dataLimit.max]}
          />
          <YAxis 
            yAxisId="left"
            type="number"
            tick={false}
            domain={[0, 'dataMax']}
            label={{ value: 'Energy Density', angle: -90}}
            allowDataOverflow={true}
          />
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="spectrum" 
            dot={false} 
            isAnimationActive={false}
          />
          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart;