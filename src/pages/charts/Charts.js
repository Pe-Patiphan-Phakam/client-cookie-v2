import React from "react";
import axios from 'axios';
import { Row, Col, Button, ButtonGroup } from "reactstrap";

import Widget from "../../components/Widget";
import ApexChart from "react-apexcharts";

import s from "./Charts.module.scss";
import "./Charts.css"
import { chartData, colors, columnColors, lineColors } from "./mock";

import ReactEchartsCore from "echarts-for-react/lib/core";

import echarts from "echarts/lib/echarts";
import Select from 'react-select'
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/themeRiver";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

exporting(Highcharts);
exportData(Highcharts);
ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

// const SERVER_PATH = "http://127.0.0.1:5000/cookies"

class Charts extends React.Component {
  constructor(props) {
    super(props);
    var dateNow = new Date();
    this.state = {
      SERVER_PATH: localStorage.getItem('path'),
      cd: chartData,
      initEchartsOptions: {
        renderer: "canvas",
      },
      Mode: "day",
      selYear1: JSON.stringify(dateNow.getFullYear()-1),
      selYear2: JSON.stringify(dateNow.getFullYear()),
      keyArrYearPre: [],
      dn: new Date(),
      options: [
        { value: '/th/', label: '/th/' },
        { value: '/th/lm/', label: '/th/lm/' },
        { value: 'vanilla', label: 'Vanilla' }
      ],
      allPath: []
    }
    this.getAgree();
  };
  componentDidMount() {
    // this.timer = setInterval(() => 
    //   this.getAgree(),10000
    // )
    // this.findPage([this.state.allPath[0], this.state.allPath[1], this.state.allPath[2]]);
  }

  getAgree() {
    const _ = require("lodash");
    var dPath = [];
    var mPath = [];
    var wPath = [];
    var dPeople = [];
    var wPeople = [];
    var mPeople = [];
    var dDonut = [];
    var wDonut = [];
    var mDonut = [];
    var yearPre1 = [];
    var yearPre2 = [];
    var monthPre1 = [];
    var monthPre2 = [];
    var arrYearPre = [];
    var allPath = [];
    var valPath = [];
    var labPath = [];
    axios.get(""+this.state.SERVER_PATH+"/api/agree")
    .then((response) => {
      var dateNow = new Date();
      var localDateNow = (dateNow.toLocaleDateString()).split(",")[0];
      var first = dateNow.getDate() - dateNow.getDay();
      var last = first + 6;
      var firstday = new Date(new Date().setDate(first)).toLocaleDateString();
      var lastday = new Date(new Date().setDate(last)).toLocaleDateString();

      for (var i=0; i<response.data.length; i++) {
        var localDateDB = (new Date(response.data[i].createdAt).toLocaleDateString()).split(",")[0];
        // console.log(localDateDB)
        var strPath = response.data[i].data[5].pathname
        var strPeople = response.data[i].cookieId
        var DateDB = new Date(response.data[i].createdAt);
        var dbMonth = DateDB.getMonth();
        var getMonth = dateNow.getMonth();

        if (strPath!=undefined) {
          valPath.push(strPath)
          labPath.push(strPath.slice(0,20))
          if (localDateNow===localDateDB) {
            if (strPath==='/') { dPath.push("index") }
            else { dPath.push(strPath.slice(0,10)) }
            dPeople.push(strPeople)
          }
          if (getMonth===dbMonth) {
            if (strPath==='/') { mPath.push("index") }
            else { mPath.push(strPath.slice(0,10)) }
            mPeople.push(strPeople)
          }
          if (localDateDB>=firstday) {
            if (strPath==='/') { wPath.push("index") }
            else { wPath.push(strPath.slice(0,10)) }
            wPeople.push(strPeople)
          }
        }
        
        var yearPre = response.data[i].createdAt.slice(0, 4)
        arrYearPre.push(yearPre)
        if (this.state.selYear1===yearPre) {
          yearPre1.push(response.data[i].createdAt.slice(0, 7))
          monthPre1.push(new Date(response.data[i].createdAt).getMonth())
        }
        if (this.state.selYear2===yearPre) {
          yearPre2.push(response.data[i].createdAt.slice(0, 7))
          monthPre2.push(new Date(response.data[i].createdAt).getMonth())
        }
      }
      
      var dayCnt = _.countBy(dPath); 
      var valDay = Object.values(dayCnt);

      var monthCnt = _.countBy(mPath); 
      var valMonth = Object.values(monthCnt);

      var weekCnt = _.countBy(wPath); 
      var valWeek = Object.values(weekCnt);

      var cntPD = _.countBy(dPeople);
      var cntPW = _.countBy(wPeople);
      var cntPM= _.countBy(mPeople);
      var cntPDD = Object.values(cntPD);
      var cntPWW = Object.values(cntPW);
      var cntPMM = Object.values(cntPM);

      var cntVP = _.countBy(valPath);
      var cntLP = _.countBy(labPath);
      var keyVP = Object.keys(cntVP);
      var keyLP = Object.keys(cntLP);
      keyVP.forEach((element, index) => {
        allPath.push({ value: element, label: keyLP[index] })
      });

      var cntMonth1 = _.countBy(monthPre1);
      var keyMonth1 = Object.keys(cntMonth1);
      var cntMonth2 = _.countBy(monthPre2);
      var keyMonth2 = Object.keys(cntMonth2);
      var valYear1 =[]
      var valYear2 =[]
      for (var i=0; i<keyMonth1.length; i++) {
        valYear1.push(0)
      }
      for (var i=0; i<keyMonth2.length; i++) {
        valYear2.push(0)
      }
      var cntYear1 = _.countBy(yearPre1);
      var valYear1 = Object.values(cntYear1);

      var cntYear2 = _.countBy(yearPre2);
      valYear2.push(Object.values(cntYear2)[0]);

      var cntArrYearPre = _.countBy(arrYearPre);
      var keyArrYearPre = Object.keys(cntArrYearPre)
      for (var i=0; i<valDay.length; i++) {
        dDonut.push({ value: valDay[i], name: Array.from(new Set(dPath))[i] })
      }
      for (var i=0; i<valWeek.length; i++) {
        wDonut.push({ value: valWeek[i], name: Array.from(new Set(wPath))[i] })
      }
      for (var i=0; i<valMonth.length; i++) {
        mDonut.push({ value: valMonth[i], name: Array.from(new Set(mPath))[i] })
      }
      this.setState({
        lenDay: dPath.length,
        lenWeek: wPath.length,
        lenMonth: mPath.length,
        labDay: Array.from(new Set(dPath)),
        labWeek: Array.from(new Set(wPath)),
        labMonth: Array.from(new Set(mPath)),
        valDay: valDay,
        valWeek: valWeek,
        valMonth: valMonth,
        cntPDD: cntPDD.length,
        cntPWW: cntPWW.length,
        cntPMM: cntPMM.length,
        keyArrYearPre: keyArrYearPre,
        year1: valYear1,
        year2: valYear2,
        allPath: allPath,
      })
      this.setState(prevState => ({
        ...prevState,
        cd: {
          ...prevState.cd,
          apex: {
            columnD: {
              series: [
                {
                  data: valDay,
                },
              ],
              options: {
                chart: {
                  height: 350,
                  type: "bar",
                },
                colors: columnColors,
                plotOptions: {
                  bar: {
                    columnWidth: "45%",
                    distributed: true,
                    horizontal: true,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: Array.from(new Set(dPath)),
                  labels: {
                    style: {
                      colors: columnColors,
                      fontSize: "14px",
                    },
                  },
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                },
                yaxis: {
                  labels: {
                    style: {
                      color: colors.textColor,
                    },
                  },
                },
                tooltip: {
                  theme: "dark",
                },
                grid: {
                  borderColor: colors.gridLineColor,
                },
              },
            },
            columnW: {
              series: [
                {
                  data: valWeek,
                },
              ],
              options: {
                chart: {
                  height: 350,
                  type: "bar",
                },
                colors: columnColors,
                plotOptions: {
                  bar: {
                    columnWidth: "45%",
                    distributed: true,
                    horizontal: true,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: Array.from(new Set(wPath)),
                  labels: {
                    style: {
                      colors: columnColors,
                      fontSize: "14px",
                    },
                  },
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                },
                yaxis: {
                  labels: {
                    style: {
                      color: colors.textColor,
                    },
                  },
                },
                tooltip: {
                  theme: "dark",
                },
                grid: {
                  borderColor: colors.gridLineColor,
                },
              },
            },
            columnM: {
              series: [
                {
                  data: valMonth
                },
              ],
              options: {
                chart: {
                  height: 350,
                  type: "bar",
                },
                colors: columnColors,
                plotOptions: {
                  bar: {
                    columnWidth: "45%",
                    distributed: true,
                    horizontal: true,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: Array.from(new Set(mPath)),
                  labels: {
                    style: {
                      colors: columnColors,
                      fontSize: "14px",
                    },
                  },
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                },
                yaxis: {
                  labels: {
                    style: {
                      color: colors.textColor,
                    },
                  },
                },
                tooltip: {
                  theme: "dark",
                },
                grid: {
                  borderColor: colors.gridLineColor,
                },
              },
            },
            pie: {
              series: [25, 15, 44, 55, 41, 17],
              options: {
                labels: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                theme: {
                  monochrome: {
                    enabled: true,
                    color: colors.blue,
                  },
                },
                stroke: {
                  show: false,
                  width: 0,
                },
                legend: false,
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              },
            },
          },
          echarts: {
            line: {
              color: lineColors,
              tooltip: {
                trigger: "none",
                axisPointer: {
                  type: "cross",
                },
              },
              legend: {
                data: [""+this.state.selYear1+" Precipitation", ""+this.state.selYear2+" Precipitation"],
                textStyle: {
                  color: colors.textColor,
                },
              },
              grid: {
                top: 70,
                bottom: 50,
              },
              yAxis: [
                {
                  type: "value",
                  axisLabel: {
                    color: colors.textColor,
                  },
                  axisLine: {
                    lineStyle: {
                      color: colors.textColor,
                    },
                  },
                  splitLine: {
                    lineStyle: {
                      color: colors.gridLineColor,
                    },
                  },
                  axisPointer: {
                    label: {
                      color: colors.dark,
                    },
                  },
                },
              ],
              xAxis: [
              {
                type: "category",
                axisTick: {
                  alignWithLabel: true,
                },
                axisLine: {
                  onZero: false,
                  lineStyle: {
                    color: lineColors[1],
                  },
                },
                axisPointer: {
                  label: {
                    formatter: function (params) {
                      return (
                        "Precipitation  " +
                        params.value +
                        (params.seriesData.length
                          ? "：" + params.seriesData[0].data
                          : "")
                      );
                    },
                  },
                },
                data: [
                  ""+this.state.selYear1+"-1",
                  ""+this.state.selYear1+"-2",
                  ""+this.state.selYear1+"-3",
                  ""+this.state.selYear1+"-4",
                  ""+this.state.selYear1+"-5",
                  ""+this.state.selYear1+"-6",
                  ""+this.state.selYear1+"-7",
                  ""+this.state.selYear1+"-8",
                  ""+this.state.selYear1+"-9",
                  ""+this.state.selYear1+"-10",
                  ""+this.state.selYear1+"-11",
                  ""+this.state.selYear1+"-12",
                ],
              },
              {
                type: "category",
                axisTick: {
                  alignWithLabel: true,
                },
                axisLine: {
                  onZero: false,
                  lineStyle: {
                    color: lineColors[0],
                  },
                },
                axisPointer: {
                  label: {
                    formatter: function (params) {
                      return (
                        "Precipitation  " +
                        params.value +
                        (params.seriesData.length
                          ? "：" + params.seriesData[0].data
                          : "")
                      );
                    },
                  },
                },
                data: [
                  ""+this.state.selYear2+"-1",
                  ""+this.state.selYear2+"-2",
                  ""+this.state.selYear2+"-3",
                  ""+this.state.selYear2+"-4",
                  ""+this.state.selYear2+"-5",
                  ""+this.state.selYear2+"-6",
                  ""+this.state.selYear2+"-7",
                  ""+this.state.selYear2+"-8",
                  ""+this.state.selYear2+"-9",
                  ""+this.state.selYear2+"-10",
                  ""+this.state.selYear2+"-11",
                  ""+this.state.selYear2+"-12",
                ],
              },
              ],
              series: [
                {
                  name: ""+this.state.selYear2+" Precipitation",
                  type: "line",
                  xAxisIndex: 1,
                  smooth: true,
                  data: valYear2,
                },
                {
                  name: ""+this.state.selYear1+" Precipitation",
                  type: "line",
                  smooth: true,
                  data: valYear1,
                },
              ], 
            },
            donutD: {
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)",
              },
              legend: {
                show: false,
              },
              color: columnColors,
              series: [
                {
                  name: "Access source",
                  type: "pie",
                  radius: ["50%", "70%"],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: "center",
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: "30",
                        fontWeight: "bold",
                      },
                    },
                  },
                  labelLine: {
                    normal: {
                      show: false,
                    },
                  },
                  data: dDonut,
                },
              ],
            },
            donutW: {
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)",
              },
              legend: {
                show: false,
              },
              color: columnColors,
              series: [
                {
                  name: "Access source",
                  type: "pie",
                  radius: ["50%", "70%"],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: "center",
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: "30",
                        fontWeight: "bold",
                      },
                    },
                  },
                  labelLine: {
                    normal: {
                      show: false,
                    },
                  },
                  data: wDonut,
                },
              ],
            },
            donutM: {
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)",
              },
              legend: {
                show: false,
              },
              color: columnColors,
              series: [
                {
                  name: "Access source",
                  type: "pie",
                  radius: ["50%", "70%"],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: "center",
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: "30",
                        fontWeight: "bold",
                      },
                    },
                  },
                  labelLine: {
                    normal: {
                      show: false,
                    },
                  },
                  data: mDonut,
                },
              ],
            },
            river: {
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "line",
                  lineStyle: {
                    color: "rgba(0,0,0,0.2)",
                    width: 1,
                    type: "solid",
                  },
                },
              },
        
              legend: {
                data: ["DQ", "TY", "SS", "QG", "SY", "DD"],
                textStyle: {
                  color: colors.textColor,
                },
              },
              color: [
                colors.blue,
                colors.green,
                colors.orange,
                colors.red,
                colors.purple,
                colors.gray,
              ],
              singleAxis: {
                top: 50,
                bottom: 50,
                axisTick: {},
                axisLabel: {
                  color: colors.textColor,
                },
                type: "time",
                axisPointer: {
                  animation: true,
                  label: {
                    show: true,
                    color: colors.dark,
                  },
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: [colors.gridLineColor],
                    type: "dashed",
                    opacity: 0.2,
                  },
                },
                axisLine: {
                  lineStyle: {
                    color: colors.textColor,
                  },
                },
              },
        
              series: [
                {
                  type: "themeRiver",
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 20,
                      shadowColor: "rgba(0, 0, 0, 0.8)",
                    },
                  },
                  label: {
                    show: false,
                  },
                  data: [
                    ["2015/11/08", 10, "DQ"],
                    ["2015/11/09", 15, "DQ"],
                    ["2015/11/10", 35, "DQ"],
                    ["2015/11/11", 38, "DQ"],
                    ["2015/11/12", 22, "DQ"],
                    ["2015/11/13", 16, "DQ"],
                    ["2015/11/14", 7, "DQ"],
                    ["2015/11/15", 2, "DQ"],
                    ["2015/11/16", 17, "DQ"],
                    ["2015/11/17", 33, "DQ"],
                    ["2015/11/18", 40, "DQ"],
                    ["2015/11/19", 32, "DQ"],
                    ["2015/11/20", 26, "DQ"],
                    ["2015/11/21", 35, "DQ"],
                    ["2015/11/22", 40, "DQ"],
                    ["2015/11/23", 32, "DQ"],
                    ["2015/11/24", 26, "DQ"],
                    ["2015/11/25", 22, "DQ"],
                    ["2015/11/26", 16, "DQ"],
                    ["2015/11/27", 22, "DQ"],
                    ["2015/11/28", 10, "DQ"],
                    ["2015/11/08", 35, "TY"],
                    ["2015/11/09", 36, "TY"],
                    ["2015/11/10", 37, "TY"],
                    ["2015/11/11", 22, "TY"],
                    ["2015/11/12", 24, "TY"],
                    ["2015/11/13", 26, "TY"],
                    ["2015/11/14", 34, "TY"],
                    ["2015/11/15", 21, "TY"],
                    ["2015/11/16", 18, "TY"],
                    ["2015/11/17", 45, "TY"],
                    ["2015/11/18", 32, "TY"],
                    ["2015/11/19", 35, "TY"],
                    ["2015/11/20", 30, "TY"],
                    ["2015/11/21", 28, "TY"],
                    ["2015/11/22", 27, "TY"],
                    ["2015/11/23", 26, "TY"],
                    ["2015/11/24", 15, "TY"],
                    ["2015/11/25", 30, "TY"],
                    ["2015/11/26", 35, "TY"],
                    ["2015/11/27", 42, "TY"],
                    ["2015/11/28", 42, "TY"],
                    ["2015/11/08", 21, "SS"],
                    ["2015/11/09", 25, "SS"],
                    ["2015/11/10", 27, "SS"],
                    ["2015/11/11", 23, "SS"],
                    ["2015/11/12", 24, "SS"],
                    ["2015/11/13", 21, "SS"],
                    ["2015/11/14", 35, "SS"],
                    ["2015/11/15", 39, "SS"],
                    ["2015/11/16", 40, "SS"],
                    ["2015/11/17", 36, "SS"],
                    ["2015/11/18", 33, "SS"],
                    ["2015/11/19", 43, "SS"],
                    ["2015/11/20", 40, "SS"],
                    ["2015/11/21", 34, "SS"],
                    ["2015/11/22", 28, "SS"],
                    ["2015/11/23", 26, "SS"],
                    ["2015/11/24", 37, "SS"],
                    ["2015/11/25", 41, "SS"],
                    ["2015/11/26", 46, "SS"],
                    ["2015/11/27", 47, "SS"],
                    ["2015/11/28", 41, "SS"],
                    ["2015/11/08", 10, "QG"],
                    ["2015/11/09", 15, "QG"],
                    ["2015/11/10", 35, "QG"],
                    ["2015/11/11", 38, "QG"],
                    ["2015/11/12", 22, "QG"],
                    ["2015/11/13", 16, "QG"],
                    ["2015/11/14", 7, "QG"],
                    ["2015/11/15", 2, "QG"],
                    ["2015/11/16", 17, "QG"],
                    ["2015/11/17", 33, "QG"],
                    ["2015/11/18", 40, "QG"],
                    ["2015/11/19", 32, "QG"],
                    ["2015/11/20", 26, "QG"],
                    ["2015/11/21", 35, "QG"],
                    ["2015/11/22", 40, "QG"],
                    ["2015/11/23", 32, "QG"],
                    ["2015/11/24", 26, "QG"],
                    ["2015/11/25", 22, "QG"],
                    ["2015/11/26", 16, "QG"],
                    ["2015/11/27", 22, "QG"],
                    ["2015/11/28", 10, "QG"],
                    ["2015/11/08", 10, "SY"],
                    ["2015/11/09", 15, "SY"],
                    ["2015/11/10", 35, "SY"],
                    ["2015/11/11", 38, "SY"],
                    ["2015/11/12", 22, "SY"],
                    ["2015/11/13", 16, "SY"],
                    ["2015/11/14", 7, "SY"],
                    ["2015/11/15", 2, "SY"],
                    ["2015/11/16", 17, "SY"],
                    ["2015/11/17", 33, "SY"],
                    ["2015/11/18", 40, "SY"],
                    ["2015/11/19", 32, "SY"],
                    ["2015/11/20", 26, "SY"],
                    ["2015/11/21", 35, "SY"],
                    ["2015/11/22", 4, "SY"],
                    ["2015/11/23", 32, "SY"],
                    ["2015/11/24", 26, "SY"],
                    ["2015/11/25", 22, "SY"],
                    ["2015/11/26", 16, "SY"],
                    ["2015/11/27", 22, "SY"],
                    ["2015/11/28", 10, "SY"],
                    ["2015/11/08", 10, "DD"],
                    ["2015/11/09", 15, "DD"],
                    ["2015/11/10", 35, "DD"],
                    ["2015/11/11", 38, "DD"],
                    ["2015/11/12", 22, "DD"],
                    ["2015/11/13", 16, "DD"],
                    ["2015/11/14", 7, "DD"],
                    ["2015/11/15", 2, "DD"],
                    ["2015/11/16", 17, "DD"],
                    ["2015/11/17", 33, "DD"],
                    ["2015/11/18", 4, "DD"],
                    ["2015/11/19", 32, "DD"],
                    ["2015/11/20", 26, "DD"],
                    ["2015/11/21", 35, "DD"],
                    ["2015/11/22", 40, "DD"],
                    ["2015/11/23", 32, "DD"],
                    ["2015/11/24", 26, "DD"],
                    ["2015/11/25", 22, "DD"],
                    ["2015/11/26", 16, "DD"],
                    ["2015/11/27", 22, "DD"],
                    ["2015/11/28", 10, "DD"],
                  ],
                },
              ],
            },
          },
        }
      }))
    })
  }

  findYear = (e) => {
    var value = {
      year: e.target.value
    }
    var id = e.target.id
    axios.post(""+this.state.SERVER_PATH+"/api/agree/findyear", value)
    .then((response) => {
      if (id === "1") {
        this.setState({ 
          year1: response.data.val,
          selYear1: value.year
        })
      } else {
        this.setState({ 
          year2: response.data.val,
          selYear2: value.year
        })
      }
      this.setState(prevState => ({
        ...prevState,
        cd: {
            ...prevState.cd,
            echarts: {
              ...prevState.cd.echarts,
              line: {
                ...prevState.cd.echarts.line,
                color: lineColors,
                tooltip: {
                  trigger: "none",
                  axisPointer: {
                    type: "cross",
                  },
                },
                legend: {
                  data: [""+this.state.selYear1+" Precipitation", ""+this.state.selYear2+" Precipitation"],
                  textStyle: {
                    color: colors.textColor,
                  },
                },
                grid: {
                  top: 70,
                  bottom: 50,
                },
                yAxis: [
                  {
                    type: "value",
                    axisLabel: {
                      color: colors.textColor,
                    },
                    axisLine: {
                      lineStyle: {
                        color: colors.textColor,
                      },
                    },
                    splitLine: {
                      lineStyle: {
                        color: colors.gridLineColor,
                      },
                    },
                    axisPointer: {
                      label: {
                        color: colors.dark,
                      },
                    },
                  },
                ],
                xAxis: [
                {
                  type: "category",
                  axisTick: {
                    alignWithLabel: true,
                  },
                  axisLine: {
                    onZero: false,
                    lineStyle: {
                      color: lineColors[1],
                    },
                  },
                  axisPointer: {
                    label: {
                      formatter: function (params) {
                        return (
                          "Precipitation  " +
                          params.value +
                          (params.seriesData.length
                            ? "：" + params.seriesData[0].data
                            : "")
                        );
                      },
                    },
                  },
                  data: [
                    ""+this.state.selYear1+"-1",
                    ""+this.state.selYear1+"-2",
                    ""+this.state.selYear1+"-3",
                    ""+this.state.selYear1+"-4",
                    ""+this.state.selYear1+"-5",
                    ""+this.state.selYear1+"-6",
                    ""+this.state.selYear1+"-7",
                    ""+this.state.selYear1+"-8",
                    ""+this.state.selYear1+"-9",
                    ""+this.state.selYear1+"-10",
                    ""+this.state.selYear1+"-11",
                    ""+this.state.selYear1+"-12",
                  ],
                },
                {
                  type: "category",
                  axisTick: {
                    alignWithLabel: true,
                  },
                  axisLine: {
                    onZero: false,
                    lineStyle: {
                      color: lineColors[0],
                    },
                  },
                  axisPointer: {
                    label: {
                      formatter: function (params) {
                        return (
                          "Precipitation  " +
                          params.value +
                          (params.seriesData.length
                            ? "：" + params.seriesData[0].data
                            : "")
                        );
                      },
                    },
                  },
                  data: [
                    ""+this.state.selYear2+"-1",
                    ""+this.state.selYear2+"-2",
                    ""+this.state.selYear2+"-3",
                    ""+this.state.selYear2+"-4",
                    ""+this.state.selYear2+"-5",
                    ""+this.state.selYear2+"-6",
                    ""+this.state.selYear2+"-7",
                    ""+this.state.selYear2+"-8",
                    ""+this.state.selYear2+"-9",
                    ""+this.state.selYear2+"-10",
                    ""+this.state.selYear2+"-11",
                    ""+this.state.selYear2+"-12",
                  ],
                },
                ],
                series: [
                  {
                    name: ""+this.state.selYear2+" Precipitation",
                    type: "line",
                    xAxisIndex: 1,
                    smooth: true,
                    data: this.state.year2,
                  },
                  {
                    name: ""+this.state.selYear1+" Precipitation",
                    type: "line",
                    smooth: true,
                    data: this.state.year1,
                  },
                ], 
              }
            }
        }
      })) 
    })
  }

  findPage = (value) => {
    axios.post(""+this.state.SERVER_PATH+"/api/agree/findpage", value)
    .then((response) => {
      console.log(response.data)
      this.setState(prevState => ({
        ...prevState,
        cd: {
            ...prevState.cd,
            highcharts: {
              ...prevState.cd.highcharts,
              mixed: {
                ...prevState.cd.echarts.mixed,
                chart: {
                  type: "spline",
                  height: 350,
                  backgroundColor: "transparent",
                },
                exporting: {
                  enabled: false,
                },
                title: {
                  text: "Pages",
                  style: {
                    color: colors.textColor,
                  },
                },
                credits: {
                  enabled: false,
                },
                xAxis: {
                  type: "datetime",
                  dateTimeLabelFormats: {
                    // don't display the dummy year
                    month: "%e. %b",
                    year: "%b",
                  },
                  labels: {
                    style: {
                      color: colors.textColor,
                    },
                  },
                },
                yAxis: {
                  min: 0,
                  title: {
                    enabled: false,
                  },
                  labels: {
                    style: {
                      color: colors.textColor,
                    },
                  },
                  gridLineColor: colors.gridLineColor,
                },
                tooltip: {
                  headerFormat: "<b>{series.name}</b><br>",
                  pointFormat: "{point.x:%e. %b}: {point.y}",
                },
                legend: {
                  enabled: false,
                },
                plotOptions: {
                  series: {
                    marker: {
                      enabled: false,
                      symbol: "circle",
                    },
                  },
                },
                colors: columnColors,
                series: response.data,
              }
            }
        }
      })) 
    })
  }

  render() {
    const { cd, initEchartsOptions, Mode, keyArrYearPre, dn } = this.state;
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Visual - <span className="fw-semi-bold">Charts</span>
        </h1>
        <div>
          <Row>
            <Col lg={12} xs={12}>
              <Row>
                <Col lg={3} xs={12}>
                  <Widget
                    title={
                      <h5>
                        <span className="fw-semi-bold">Day</span>
                      </h5>
                    }
                  >
                    <h2><i class="far fa-bell"></i> {this.state.lenDay} view</h2>
                    <h2><i class="far fa-user"></i> {this.state.cntPDD} people</h2>
                  </Widget>
                </Col>
                <Col lg={3} xs={12}>
                  <Widget
                    title={
                      <h5>
                        <span className="fw-semi-bold">Week</span>
                      </h5>
                    }
                  >
                    <h2><i class="far fa-bell"></i> {this.state.lenWeek} view</h2>
                    <h2><i class="far fa-user"></i> {this.state.cntPWW} people</h2>
                  </Widget>
                </Col>
                <Col lg={3} xs={12}>
                  <Widget
                    title={
                      <h5>
                        <span className="fw-semi-bold">Month</span>
                      </h5>
                    }
                  >
                    <h2><i class="far fa-bell"></i> {this.state.lenMonth} view</h2>
                    <h2><i class="far fa-user"></i> {this.state.cntPMM} people</h2>
                  </Widget>
                </Col>
              </Row>
            </Col>

            <Col lg={7} xs={12}>
              <Widget
                title={
                  <h5>
                    {/* Apex <span className="fw-semi-bold">Day</span> */}
                    <ButtonGroup>
                      <Button color="primary" onClick={() => this.setState({Mode: "day"})} active={Mode === "day"}>Day</Button>
                      <Button color="primary" onClick={() => this.setState({Mode: "week"})} active={Mode === "week"}>Week</Button>
                      <Button color="primary" onClick={() => this.setState({Mode: "month"})} active={Mode === "month"}>Month</Button>
                    </ButtonGroup>
                  </h5>
                }
              >
                {this.state.Mode==="day"
                  ?<ApexChart
                    className="sparkline-chart"
                    height={320}
                    series={cd.apex.columnD.series}
                    options={cd.apex.columnD.options}
                    type={"bar"}
                  />
                  :""
                }
                {this.state.Mode==="week"
                  ?<ApexChart
                    className="sparkline-chart"
                    height={320}
                    series={cd.apex.columnW.series}
                    options={cd.apex.columnW.options}
                    type={"bar"}
                  />
                  :""
                }
                {this.state.Mode==="month"
                  ?<ApexChart
                    className="sparkline-chart"
                    style={{ height: "auto" }}
                    series={cd.apex.columnM.series}
                    options={cd.apex.columnM.options}
                    type={"bar"}
                  />
                  :""
                }
              </Widget>
            </Col>
            <Col lg={5} xs={12}>
              <Row>
                <Col lg={12} xs={12}>
                  <Widget
                    title={
                      <h5>
                        <span className="fw-semi-bold">{this.state.Mode}</span>
                      </h5>
                    }
                  >
                  {/* <ReactFusioncharts
                    type="angulargauge"
                    width={453}
                    height={250}
                    dataFormat="JSON"
                    dataSource={dataSource}
                  /> */}
                  {this.state.Mode==="day"
                    ?<ReactEchartsCore
                      echarts={echarts}
                      option={cd.echarts.donutD}
                      opts={initEchartsOptions}
                      style={{ height: "350px" }}
                    />
                    :""}
                  {this.state.Mode==="week"
                  ?<ReactEchartsCore
                    echarts={echarts}
                    option={cd.echarts.donutW}
                    opts={initEchartsOptions}
                    style={{ height: "350px" }}
                  />
                  :""}
                  {this.state.Mode==="month"
                  ?<ReactEchartsCore
                    echarts={echarts}
                    option={cd.echarts.donutM}
                    opts={initEchartsOptions}
                    style={{ height: "350px" }}
                  />
                  :""}
                  </Widget>
                </Col>
              </Row>  
            </Col>

            <Col lg={12} xs={12}>
              <Widget
                title={
                  <h5>
                    <span className="fw-semi-bold">
                      <select id="1" onChange={this.findYear} style={{backgroundColor: "#2477ff", borderRadius: "4px", fontSize: "16px", marginRight: "5px"}}>
                        {keyArrYearPre.map((item, index) => (
                          <option value={item} selected={this.state.selYear1===item?true:false} hidden={this.state.selYear2===item?true:false}>{item}</option>
                        ))}
                      </select>
                      <select id="2" onChange={this.findYear} style={{backgroundColor: "#2477ff", borderRadius: "4px", fontSize: "16px"}}>
                        {keyArrYearPre.map((item, index) => (
                          <option value={item} selected={this.state.selYear2===item?true:false} hidden={this.state.selYear1===item?true:false}>{item}</option>
                        ))}
                      </select>
                      </span>
                  </h5>
                }
              >
                <ReactEchartsCore
                  echarts={echarts}
                  option={cd.echarts.line}
                  opts={initEchartsOptions}
                  style={{ height: "350px" }}
                />
              </Widget>
            </Col>
            <Col lg={12} xs={12}>
              <Widget
                title={
                  <Select options={this.state.allPath} 
                  // defaultValue={[this.state.allPath[1]]} 
                  isMulti
                  onChange={this.findPage}/>
                }
              >
                <HighchartsReact options={cd.highcharts.mixed} />
              </Widget>
            </Col>
            
            {/* <Col lg={7} xs={12}>
              <Row>
                <Col lg={6} xs={12}>
                  <Widget
                    title={
                      <h5>
                        Apex{" "}
                        <span className="fw-semi-bold">Monochrome Pie</span>
                      </h5>
                    }
                    close
                    collapse
                  >
                    <ApexChart
                      className="sparkline-chart"
                      type={"pie"}
                      height={200}
                      series={cd.apex.pie.series}
                      options={cd.apex.pie.options}
                    />
                  </Widget>
                </Col>
                
                <Col lg={12} xs={12}>
                  <Widget
                    title={
                      <h5>
                        Highcharts{" "}
                        <span className="fw-semi-bold">Live Chart</span>
                      </h5>
                    }
                    close
                    collapse
                  >
                    <HighchartsReact options={ld} />
                  </Widget>
                </Col>
              </Row>
            </Col>
            <Col lg={12} xs={12}> 
              <Widget
                title={
                  <h5>
                    Echarts <span className="fw-semi-bold">River Chart</span>
                  </h5>
                }
                close
                collapse
              >
                <ReactEchartsCore
                  echarts={echarts}
                  option={cd.echarts.river}
                  opts={initEchartsOptions}
                  style={{ height: "350px" }}
                />
              </Widget>
            </Col>*/}
          
          </Row>
        </div>
      </div>
    );
  }
}

export default Charts;
