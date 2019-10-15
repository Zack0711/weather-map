import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import ChartWrapper from '../components/chart-wrapper.jsx'

import {
  getChartData
} from '../actions/chart';

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  getChartData: () => dispatch(getChartData())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(ChartWrapper))
