import "@babel/polyfill"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import './styles/main.scss'

import React from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import CssBaseline from '@material-ui/core/CssBaseline';

import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"

import Landing from './pages/landing.jsx'
import SpectrumTemperature from './pages/spectrum-temperature.jsx'
import SpectrumComposition from './pages/spectrum-composition.jsx'
import SpectrumRedshift from './pages/spectrum-redshift.jsx'
import SpectrumList from './pages/spectrum-list.jsx'

import httpService from './services/httpService'

import store from './store';
import i18n from './i18n';

const App = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <Router>
        <CssBaseline/>
        <Switch>
          <Route exact path="/" children={<Landing />} />
          <Route exact path="/spectrum-temperature" children={<SpectrumTemperature />} />
          <Route exact path="/spectrum-composition" children={<SpectrumComposition />} />
          <Route exact path="/spectrum-redshift" children={<SpectrumRedshift />} />
          <Route path="/list" children={<SpectrumList />} />
        </Switch>
      </Router>
    </I18nextProvider>
  </Provider>
)

export default App