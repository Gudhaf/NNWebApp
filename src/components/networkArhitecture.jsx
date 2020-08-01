import CanvasJSReact from "./canvas/canvasjs.react";
var React = require("react");
var Component = React.Component;
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let lineData = [];
let lastLayer;

function createData(arhitecture) {
  lastLayer = arhitecture.numberOfHiddenLayers + 1;
  let data = [];
  let offset;

  for (let i = 0; i < lastLayer + 1; i++) {
    if (i == 0) {
      if (arhitecture.numberOfInputNeurons == arhitecture.maxNeurons)
        offset = 1;
      else {
        if (arhitecture.numberOfInputNeurons % 2 == 0) {
          offset =
            parseInt(
              arhitecture.maxNeurons / arhitecture.numberOfInputNeurons
            ) + 0.5;
        } else {
          offset =
            parseInt(
              arhitecture.maxNeurons / arhitecture.numberOfInputNeurons
            ) + 1;
        }
      }

      for (let it = 0; it < arhitecture.numberOfInputNeurons; it++) {
        data.push({ x: i + 1, y: it + offset });
      }
    } else if (i == lastLayer) {
      if (arhitecture.numberOfOutputNeurons == arhitecture.maxNeurons)
        offset = 1;
      else {
        if (arhitecture.numberOfOutputNeurons % 2 == 0) {
          offset =
            parseInt(
              arhitecture.maxNeurons / arhitecture.numberOfOutputNeurons
            ) + 0.5;
        } else {
          if (arhitecture.numberOfOutputNeurons == 1) {
            offset = parseInt(arhitecture.maxNeurons / 2) + 1;
          } else {
            offset =
              parseInt(
                arhitecture.maxNeurons / arhitecture.numberOfOutputNeurons
              ) + 1;
          }
        }
      }

      for (let it = 0; it < arhitecture.numberOfOutputNeurons; it++) {
        data.push({ x: i + 1, y: it + offset });
      }
    } else {
      if (arhitecture.hiddenLayersNeurons[i - 1] == arhitecture.maxNeurons)
        offset = 1;
      else {
        if (arhitecture.hiddenLayersNeurons[i - 1] % 2 == 0) {
          offset =
            parseInt(
              arhitecture.maxNeurons / arhitecture.hiddenLayersNeurons[i - 1]
            ) + 0.5;
        } else {
          offset =
            parseInt(
              arhitecture.maxNeurons / arhitecture.hiddenLayersNeurons[i - 1]
            ) + 1;
        }
      }

      for (let it = 0; it < arhitecture.hiddenLayersNeurons[i - 1]; it++) {
        data.push({ x: i + 1, y: it + offset });
      }
    }
  }

  for (let i = 0; i < lastLayer; i++) {
    if (i == 0) {
      for (let j = 0; j < arhitecture.numberOfInputNeurons; j++) {
        if (i + 1 == lastLayer) {
          for (
            let k = arhitecture.numberOfInputNeurons;
            k <
            arhitecture.numberOfOutputNeurons +
              arhitecture.numberOfInputNeurons;
            k++
          ) {
            let aux = [];
            aux.push(data[j]);
            aux.push(data[k]);
            lineData.push({ type: "line", dataPoints: aux });
          }
        } else {
          for (
            let k = arhitecture.numberOfInputNeurons;
            k <
            arhitecture.hiddenLayersNeurons[i] +
              arhitecture.numberOfInputNeurons;
            k++
          ) {
            let aux = [];
            aux.push(data[j]);
            aux.push(data[k]);
            lineData.push({ type: "line", dataPoints: aux });
          }
        }
      }
    } else {
      let start = arhitecture.numberOfInputNeurons;
      for (let j = i - 2; j > -1; j--) {
        start += arhitecture.hiddenLayersNeurons[j];
      }
      for (
        let j = start;
        j < start + arhitecture.hiddenLayersNeurons[i - 1];
        j++
      ) {
        if (i + 1 == lastLayer) {
          for (
            let k = start + arhitecture.hiddenLayersNeurons[i - 1];
            k <
            start +
              arhitecture.hiddenLayersNeurons[i - 1] +
              arhitecture.numberOfOutputNeurons;
            k++
          ) {
            let aux = [];
            aux.push(data[j]);
            aux.push(data[k]);
            lineData.push({ type: "line", dataPoints: aux });
          }
        } else {
          for (
            let k = start + arhitecture.hiddenLayersNeurons[i - 1];
            k <
            start +
              arhitecture.hiddenLayersNeurons[i - 1] +
              arhitecture.hiddenLayersNeurons[i];
            k++
          ) {
            let aux = [];
            aux.push(data[j]);
            aux.push(data[k]);
            lineData.push({ type: "line", dataPoints: aux });
          }
        }
      }
    }
  }

  return data;
}

function setOptions(arhitecture) {
  CanvasJS.addColorSet("purpleColorSet", ["#48ACF0", "#F5CB5C"]);

  let pointData = createData(arhitecture);
  lineData.push({
    type: "scatter",
    markerSize: 15,
    markerColor: "#310A31",
    toolTipContent: "<b>Layer: </b>{x}<br/>",
    dataPoints: pointData,
  });
  const options = {
    width: 400,
    height: 400,
    colorSet: "purpleColorSet",
    backgroundColor: "#EAEAEA",
    animationEnabled: true,
    animationDuration: 2000,
    zoomEnabled: true,
    toolTip: {
      enabled: false,
    },
    title: {
      text: "Neural Network arhitecture",
      dockInsidePlotArea: true,
      horizontalAlign: "center",
      verticalAlign: "bottom",
      fontWeight: "lighter",
      fontColor: "#310A31",
      fontSize: 15,
    },
    axisX: {
      title: "",
      suffix: "",
      labelFontColor: "#EAEAEA",
      interval: 1,
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      gridThickness: 0,
      labelFontColor: "#EAEAEA",
      title: "",
      includeZero: false,
    },
    data: lineData,
  };

  return options;
}

function Arhitecture(props) {
  return (
    <div style={{ position: "absolute", left: "500px", top: "30px" }}>
      <CanvasJSChart options={setOptions(props.arhitectureData)} />
    </div>
  );
}

export default Arhitecture;
