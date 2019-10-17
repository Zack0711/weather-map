import "@babel/polyfill"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import '../styles/main.scss'

import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'

import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

import ChartWrapper from '../containers/chart-wrapper'
import Chart from '../containers/chart'

import store from '../store'
import i18n from '../i18n'

const DEFAULT_TEMPERATURE = 1200

const GalaxySpectrum = () => {

  const [temperature, setTemperature] = React.useState(DEFAULT_TEMPERATURE)

  const handleSliderChange = (e, val) => {
    setTemperature(val)
  }

  return(
    <Provider store={store}>
      <ChartWrapper>
        <Chart/>
        <Typography gutterBottom>{temperature}</Typography>
        <Slider
          defaultValue={DEFAULT_TEMPERATURE}
          max={5000}
          valueLabelDisplay ='on'
          onChange={handleSliderChange}
        />

      </ChartWrapper>
    </Provider>
  )
}

export default GalaxySpectrum