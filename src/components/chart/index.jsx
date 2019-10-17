import React from 'react';

import { makeStyles } from '@material-ui/core/styles'

import {
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

const Chart = props => {
  const {
    spectrumData,
    planckData,
    t,
  } = props;

  const classes = useStyles()

  return (
    <div className={classes.chart}>
    {
      spectrumData && (
        <ResponsiveContainer width="100%" height={480}>
          <LineChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="Wavelength"
              type="number"
              allowDecimals={false}
              domain={[0, 'auto']}
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
              hide={true}
              domain={[0, 'dataMax']}
              yAxisId="right" 
            />
            <Line 
              yAxisId="left" 
              type="monotone" 
              data={spectrumData.data} 
              dataKey="BestFit" 
              dot={false} 
              isAnimationActive={false}
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              data={planckData} 
              dataKey="energyDensity" 
              dot={false} 
              activeDot={false}
              isAnimationActive={false}
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      )
    }
    </div>
  )
}

export default Chart;