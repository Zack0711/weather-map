import React from 'react'
import GalaxySpectrum from './pages/galaxy-spectrum.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container h-100">
        <GalaxySpectrum />
      </div>
    )
  }
}

export default App