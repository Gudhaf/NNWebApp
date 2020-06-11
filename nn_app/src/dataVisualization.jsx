import React from "react";
import CanvasJSReact from "./canvasjs.react";
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function getOptions(data){
        const options = {
                width: 400,
                height: 400,
                colorSet: "purpleColorSet",
                backgroundColor: "#EAEAEA",
                animationEnabled: true,
                animationDuration: 500,
                axisY: {
                        gridThickness: 0,
                },
                title: {
                  text: "Data",
                  dockInsidePlotArea: true,
                    horizontalAlign: "center",
                    verticalAlign: "bottom",
                    fontWeight: "lighter",
                    fontColor: "#310A31",
                    fontSize: 15
                },
                data: data,
              };
        return options;
}


function getData(data) {
  let aux1 = [];
  let aux2 = [];
        let aux=[];
  if (data.numberOfInputs != 2 || data.numberOfOutputs != 1) {
    return (
      <p>
        Try a NN with 2 inputs and one output to get a visualization of the data
      </p>
    );
  } else {
        for (let i = 0; i < data.points.length; i++) {
                if(data.points[i][2]==0){
                        aux1.push({x:data.points[i][0],y:data.points[i][1]});
                }
                else{
                        aux2.push({x:data.points[i][0],y:data.points[i][1]});
                };
                
        }
      
        aux.push({type:"scatter",markerType: "triangle",markerColor:"#48ACF0",showInLegend: true,
        legendText: "output is 0",markerSize:10,dataPoints:aux1});
        aux.push({type:"scatter",markerType: "square",markerColor:"#F5CB5C",showInLegend: true,
        legendText: "output is 1",markerSize:10,dataPoints:aux2});
        aux.push({type:"spline",markerColor:"#310A31",lineColor:"#310A31",showInLegend: true,
        legendText: "prediction line",markerSize:1,dataPoints:data.curvePoints})

    return <CanvasJSChart options={getOptions(aux)} />;
  }
}

function DataGraph(props) {
  return <div>{getData(props.data)}</div>;
}

export default DataGraph;
