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

import DotMarkDialog from '../dot-mark-dialog/index.jsx'

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

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
  },
  sliderRoot:{
    width: 'calc(100% - 70px)',
    marginLeft: 70,
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -9,
    marginLeft: -9,
    '&:focus,&:hover,&$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },  
}))

let activePayload = null

const Chart = props => {
  const {
    type,
    spectrumData,
    elementData = [],
    t,
  } = props;

  const classes = useStyles()
  const [dataList, setDataList] = useState([])
  const [marks, setMarks] = useState([])
  const [dataLimit, setDataLimit] = useState({min: 0, max: 20000})

  const [value, setValue] = useState([0, 20000])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [open, setOpen] = useState(false)
  const handleChartClick = () => {
    //const newDotMarks = union(dotMarks, [activePayload])
    setOpen(true);
    //setDotMarks(newDotMarks)
    console.log('handleChartClick', activePayload)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormatter = (value, name, props) => {
    activePayload = props.payload
    return [value, name]
  }

  useEffect(() => {
    if(spectrumData.data){
      const min = spectrumData.data[0].Wavelength
      const max = spectrumData.data[spectrumData.data.length - 2].Wavelength

      const interval = (max - min)/5
      const marks = []

      for(let i = 0; i <= 5; i++){
        const value = i < 5 ? min + interval * i : max
        marks.push({
          value,
          label: value.toFixed(3),          
        })          
      }

      setDataLimit({ min, max})
      setValue([min, max])
      setDataList(spectrumData.data)
      setMarks(marks)
    }
  }, [spectrumData])

  return (
    <>
      <div className={classes.chart}>
        <ResponsiveContainer width="100%" height={480} className={classes.elementChart}>
          <ComposedChart data={elementData}>
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
          <ComposedChart data={dataList} onClick={handleChartClick}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="Wavelength"
              type="number"
              allowDecimals={false}
              allowDataOverflow={true}
              tick={false}
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
              dataKey="BestFit" 
              dot={false} 
              isAnimationActive={false}
            />
            <Tooltip formatter={handleFormatter} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <Slider
        min={dataLimit.min}
        max={dataLimit.max}
        value={value}
        onChange={handleChange}
        classes={{
          root: classes.sliderRoot,
          thumb: classes.thumb, // class name, e.g. `classes-nesting-root-x`
          valueLabel: classes.valueLabel, // class name, e.g. `classes-nesting-label-x`
        }}
        marks={marks}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
      />
      <DotMarkDialog
        open={open}
        onClose={handleClose}
      />
    </>
  )
}

export default Chart;