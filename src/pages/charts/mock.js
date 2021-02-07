import config from "./config";
export const colors = config.chartColors;

export let columnColors = [
  colors.blue,
  colors.green,
  colors.orange,
  colors.red,
  colors.default,
  colors.gray,
  colors.teal,
  colors.pink,
];
export let lineColors = [colors.blue, colors.green, colors.orange];

export const chartData = {
  apex: {
    columnD: {
      series: [
        {
          data: [],
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
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [],
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
          data: [],
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
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [],
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
          data: [],
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
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [],
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
        data: [],
        textStyle: {
          color: colors.textColor,
        },
      },
      grid: {
        top: 70,
        bottom: 50,
      },
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
          data: [],
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
          data: [],
        },
      ],
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
      series: [
        {
          name: "2015 Precipitation",
          type: "line",
          xAxisIndex: 1,
          smooth: true,
          data: [],
        },
        {
          name: "2016 Precipitation",
          type: "line",
          smooth: true,
          data: [],
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
          data: [],
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
          data: [
            { value: 0, name: "" },
          ],
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
          data: [
            { value: 0, name: "" },
          ],
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
  highcharts: {
    mixed: {
      chart: {
        type: "spline",
        height: 350,
        backgroundColor: "transparent",
      },
      exporting: {
        enabled: false,
      },
      title: {
        text: "",
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
        pointFormat: "{point.x:%e. %b}: {point.y:.2f} m",
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
      colors: [],
      series: [],
    },
  },
};

export const dataSource = {
  chart: {
    caption: "Nordstorm's Customer Satisfaction Score for 2017",
    lowerlimit: "0",
    upperlimit: "100",
    showvalue: "1",
    numbersuffix: "%",
    theme: "fusion",
    showtooltip: "0"
  },
  colorrange: {
    color: [
      {
        minvalue: "0",
        maxvalue: "50",
        code: "#F2726F"
      },
      {
        minvalue: "50",
        maxvalue: "75",
        code: "#FFC533"
      },
      {
        minvalue: "75",
        maxvalue: "100",
        code: "#62B58F"
      }
    ]
  },
  dials: {
    dial: [
      {
        value: "81"
      }
    ]
  }
};
