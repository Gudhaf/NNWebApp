import React from "react";
import CanvasJSReact from "./canvas/canvasjs.react";
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function CostGraph(props) {
  const options = {
    width: 400,
    height: 400,
    colorSet: "purpleColorSet",
    backgroundColor: "#EAEAEA",
    animationEnabled: true,
    animationDuration: 2000,
    title: {
      text: "Cost Evolution",
      dockInsidePlotArea: true,
      horizontalAlign: "center",
      verticalAlign: "bottom",
      fontWeight: "lighter",
      fontColor: "#310A31",
      fontSize: 15
    },
    toolTip: {
      enabled: false,
    },
    
    data: [
      {
        type: "spline",
        lineColor:"#310A31",
        dataPoints: props.costData,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default CostGraph;
