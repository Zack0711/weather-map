import React from 'react';

import SolarEclipseBlog from './solarEclipseBlog.jsx'
import {
  getAllPosts,
} from './actionCreators/posts'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container h-100">
        <SolarEclipseBlog />
      </div>
    )
  }  
}

export default App