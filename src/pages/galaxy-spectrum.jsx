import "@babel/polyfill";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import '../styles/main.scss';

import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import ChartWrapper from '../containers/chart-wrapper';
import Chart from '../containers/chart'

import store from '../store';
import i18n from '../i18n';

const baseUrl = './csv_data/'
const csv = 'csvSpectrum_1237648720693690487.csv'

class GalaxySpectrum extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ChartWrapper>
            <Chart/>
          </ChartWrapper>
        </I18nextProvider>
      </Provider>
    )
  }  
}

export default GalaxySpectrum