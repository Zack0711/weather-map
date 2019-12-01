import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles'

import {
  ComposedChart,
  Bar,
  Area,
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
  },
}))

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

const Chart = props => {
  const {
    type,
    spectrumData,
    elementData = [],
    planckData,
    t,
  } = props;

  const classes = useStyles()
  const [dataLimit, setDataLimit] = useState(dataLimitCheck(type))
  const [elementLimit, setElementLimit] = useState([0, 'dataMax'])

  useEffect(() => {
    if(spectrumData){
      setDataLimit(dataLimitCheck(type, spectrumData.data))      
    }
  }, [spectrumData])

  useEffect(() => {
    if(elementData[0]){
      let max = 0
      let wave = 0
      elementData[0].forEach(d => {
        if(d.Wavelength && d.energyDensity > max){
          max = d.energyDensity
          wave = d
        }
      })
      console.log(max, wave)
    }
  }, [elementData[0]])

  return (
    <div className={classes.chart}>
    {
      spectrumData && (
        <ResponsiveContainer width="100%" height={480}>
          <ComposedChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="Wavelength"
              type="number"
              allowDecimals={false}
              allowDataOverflow={true}
              //domain={[0, 20000]}
              domain={['dataMin', 'dataMax']}
              //domain={[dataLimit.min, dataLimit.max]}
            />
            <YAxis 
              yAxisId="left"
              type="number"
              tick={false}
              domain={[0, 'dataMax']}
              label={{ value: 'Energy Density', angle: -90}}
              allowDataOverflow={true}
            />
            <YAxis 
              yAxisId="element"
              type="number"
              domain={[0, 'dataMax']}
            />
            <Line 
              yAxisId="element" 
              type="step" 
              data={elementData[0]} 
              dataKey="energyDensity" 
              dot={false} 
              isAnimationActive={false}
            />
            <Line 
              yAxisId="left" 
              type="monotone" 
              data={spectrumData.data} 
              dataKey="BestFit" 
              dot={false} 
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      )
    }
    </div>
  )
}

export default Chart;