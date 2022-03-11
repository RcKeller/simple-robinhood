// Options to use when rendering Apex Chart
export const chart_options = {
  chart: {
    type: "area",
    stacked: false,
    height: 350,
    zoom: {
      type: "x",
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: "zoom",
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  yaxis: {
    title: {
      text: "Price",
    },
    labels: {
      formatter: function (val) {
        return val.toFixed(0);
      },
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      datetimeUTC: false,
      format: "MM-dd h:mmtt",
    },
    tooltip: {
      enabled: false,
    },
  },
  tooltip: {
    shared: false,
    x: {
      format: "MMM dd h:mmtt",
    },
    y: {
      formatter: function (val) {
        return val.toFixed(2);
      },
    },
  },
};
