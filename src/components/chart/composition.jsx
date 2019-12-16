import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

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
    const wavelength = Math.floor(d.Wavelength)
    const dataDensity = d[key] || 0

    if(!data[wavelength]) data[wavelength] = { ...DEFAULT_STATE, wavelength: wavelength }

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

  data['min'] = min
  data['max'] = max
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
  const [dataLimit, setDataLimit] = useState({min: 0, max: 20000})

  const [value, setValue] = useState([0, 20000])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    setDataLimit({ min: chartData.min, max: chartData.max})
    setValue([chartData.min, chartData.max])

    const list = Object.keys(chartData).filter( d => d !== 'max' && d !== 'min' )
    const dataList = []

    list.forEach( (d, i) => {
      if(d){
        const current = chartData[d]
        const next = chartData[list[i+1]]

        const waveInterval = next ? next.wavelength - current.wavelength : 1
        const spectrumDensityInterval = next ? next.spectrum.density - current.spectrum.density : 0

        dataList.push({
          wavelength: current.wavelength,
          spectrum: current.spectrum.density,
          element: 0,          
        })

        if(waveInterval > 1){
          for(let i = 1; i < waveInterval; i++){
            dataList.push({
              wavelength: current.wavelength + i,
              spectrum: current.spectrum.density + spectrumDensityInterval * i / waveInterval,
              element: 0,
            })
          }
        }
      }
    })

    //console.log(dataList)
    setDataList(dataList)

    /*
    setDataList(list.map( d => ({
      wavelength: chartData[d].wavelength,
      spectrum: chartData[d].spectrum.density,
      element: chartData[d].element.density,
    })))
    */
  }, [chartData])

  useEffect(() => {
    console.log(elementData)
    //setChartData({ ...arrangeData(chartData, elementData, 'element', 'energyDensity') })
  }, [elementData])

  useEffect(() => {
    if(spectrumData.data){
      setChartData({ ...arrangeData(chartData, spectrumData.data, 'spectrum', 'BestFit') })
    }
  }, [spectrumData])

  return (
    <>
      <div className={classes.chart}>
        <ResponsiveContainer width="100%" height={480} className={classes.elementChart}>
          <ComposedChart data={elementData} >
            <XAxis 
              dataKey="Wavelength"
              type="number"
              allowDecimals={false}
              allowDataOverflow={true}
              domain={[value[0], value[1]]}
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
              domain={[value[0], value[1]]}
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
      <Slider
        min={dataLimit.min}
        max={dataLimit.max}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    </>
  )
}

export default Chart;