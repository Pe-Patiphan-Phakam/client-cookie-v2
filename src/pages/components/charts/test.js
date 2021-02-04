// STEP 1 - Include Dependencies

// Include react
import React from 'react';
import ReactDOM from 'react-dom';

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Include the fusioncharts library
import FusionCharts from 'fusioncharts';

//Import the Widgets
import Widgets from 'fusioncharts/fusioncharts.widgets';

// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

//STEP 2 - Defining the dataset for the angular gauge along with the color configuration
const colorRange = {
  "color": [{
    "minValue": "0",
    "maxValue": "50",
    "code": "#F2726F"
  }, {
    "minValue": "50",
    "maxValue": "75",
    "code": "#FFC533"
  }, {
    "minValue": "75",
    "maxValue": "100",
    "code": "#62B58F"
  }]
};

const dials = {
  "dial": [{
    "value": "81"
  }]
};

// STEP 3 - Creating the JSON object to store the chart configurations
const chartConfigs = {
    type: 'angulargauge',// The chart type
    width: '700', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
        "chart": {
          "caption": "Nordstorm's Customer Satisfaction Score for 2017",
          "lowerlimit": "0",
          "upperlimit": "100",
          "showvalue": "1",
          "numbersuffix": "%",
          "theme": "fusion",
          "showtooltip": "0"
        },
        "colorRange": colorRange,
        "dials": dials
    }
}


// STEP 3 - Creating the DOM element to pass the react-fusioncharts component
class App extends React.Component {
  render() {
     return (
     <ReactFC
        {...chartConfigs}/>
     );
  }
}

export default App;