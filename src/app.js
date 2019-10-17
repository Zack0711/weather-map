import "@babel/polyfill"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import './styles/main.scss'

import React from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"

import Landing from './pages/landing.jsx'
import GalaxySpectrum from './pages/galaxy-spectrum.jsx'

import store from './store';
import i18n from './i18n';

const App = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <Router>
        <Switch>
          <Route exact path="/" children={<Landing />} />
          <Route exact path="/spectrum" children={<GalaxySpectrum />} />
        </Switch>
      </Router>
    </I18nextProvider>
  </Provider>
)

export default App