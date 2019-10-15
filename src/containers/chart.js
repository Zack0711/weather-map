import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import Chart from '../components/chart/index.jsx'

import {
  getChartData
} from '../actions/chart';

const getSelectedSpectrum = state => {
  const {
    selected,
    data,    
  } = state.chart.spectrum

  return selected ? data[selected] : null
}

const mapStateToProps = state => ({
  spectrumData: getSelectedSpectrum(state),
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Chart))
