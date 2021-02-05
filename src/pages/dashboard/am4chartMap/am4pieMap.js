import React, { Component } from 'react';
import axios from 'axios';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import AnimateNumber from 'react-animated-number';
  
class Am4chartMap extends Component {
  state={
    cntUser: ''
  }
  componentDidMount() {
    this.getMap();
  }

  getMap() {
    axios.get('http://127.0.0.1:5000/cookies/api/data/map')
    .then((response) => {
    //   console.log(response.data)
      var chart = am4core.create("chartdiv", am4charts.PieChart);

// Add data
    chart.data = [{
    "country": "Lithuania",
    "litres": 501.9
    }, {
    "country": "Czech Republic",
    "litres": 301.9
    }, {
    "country": "Ireland",
    "litres": 201.1
    }, {
    "country": "Germany",
    "litres": 165.8
    }, {
    "country": "Australia",
    "litres": 139.9
    }, {
    "country": "Austria",
    "litres": 128.3
    }, {
    "country": "UK",
    "litres": 99
    }, {
    "country": "Belgium",
    "litres": 60
    }, {
    "country": "The Netherlands",
    "litres": 50
    }];

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";

    pieSeries.tooltip.getFillFromObject = false;
    pieSeries.tooltip.background.fill = am4core.color("#CEB1BE");
      this.map = pieSeries;
    })
  }

  componentWillUnmount() {
    if(this.map) {
      this.map.dispose();
    }
  }

  render() {
    return (
      <div 
      // className={s.mapChart}
      >
        <div 
        // className={s.stats}
        >
          <p className="h3 m-0">
            <span className="mr-xs fw-normal">
              <AnimateNumber
                value={this.state.cntUser}
                initialValue={0}
                duration={1000} 
                stepPrecision={0}
                formatValue={n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              /></span>
          </p>
        </div>
        <div 
        // className={s.map}
         id="chartdiv"/>
      </div>
    );
  }
}

export default Am4chartMap;
