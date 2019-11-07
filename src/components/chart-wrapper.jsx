import React from 'react';

class ChartWrapper extends React.Component {
  constructor(props){
    super(props);
  }  

  componentDidMount() {
    this.props.getChartData();
  }

  render() {
    const {
	    children,
    } = this.props;

    const mainClass = 'chart-wrapper'

    return(
      <div className={mainClass}>
        {children}
      </div>
    )
  }
}

export default ChartWrapper;