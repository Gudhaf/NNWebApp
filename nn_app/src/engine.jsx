import React, { Component } from 'react';
import Network from "./network";
import Arhitecture from "./networkArhitecture";
import DataGraph from "./dataVisualization";
import CostGraph from "./costVisualization";
import InputData from "./inputField";
import "./engine.css";

let testData;
let ceva="ASASASA";

let arhitecture={
    numberOfInputNeurons:0,
    numberOfOutputNeurons:0,
    numberOfHiddenLayers:0,
    hiddenLayersNeurons:[],
    maxNeurons:0
}

let cost=[];

let rawData={
    numberOfInputs:0,
    numberOfOutputs:0,
    points:[],
    curvePoints:[]
}

let max;
function findMax(){
    max=0;
    for (let i = 0; i < arhitecture.hiddenLayersNeurons.length; i++) {
        if(arhitecture.hiddenLayersNeurons[i]>max) max=arhitecture.hiddenLayersNeurons[i];
    }
}

function findCurve(data,n){
    let curve=[];
    let xMin=data[0][0];
    let yMin=data[0][1];
    let xMax=data[0][0];
    let yMax=data[0][1];
    for (let i = 0; i < data.length; i++) {   
            if(data[i][0]<xMin) xMin=data[i][0];
            if(data[i][1]<yMin) yMin=data[i][1];
            if(data[i][0]>xMax) xMax=data[i][0];
            if(data[i][1]>yMax) yMax=data[i][1];
    }
    for (let i = xMin; i < xMax; i+=0.01) {
       for (let j = yMin; j < yMax; j+=0.01) {
           if((n.evaluate([i,j])[0].value>0.499)&&(n.evaluate([i,j])[0].value<0.511)) curve.push({x:i,y:j});
       }
    }
    return curve;
}

function activateNetwork(){

    arhitecture.numberOfInputNeurons=2;
    arhitecture.numberOfOutputNeurons=1;
    arhitecture.numberOfHiddenLayers=0;
    arhitecture.hiddenLayersNeurons=[];

    findMax();

    arhitecture.maxNeurons=max;
    let neuralNetwork=new Network(arhitecture.numberOfInputNeurons,arhitecture.numberOfOutputNeurons,arhitecture.numberOfHiddenLayers,arhitecture.hiddenLayersNeurons);
    let data=[[1, 2, 0],
          [2, 4, 0],
          [2, 0.5, 0],
          [2.5, 1, 0],
          [3, 1.5, 1],
          [3.5, 0.5, 1],
          [4, 1.5, 1],
          [5.5, 1, 1],
          [1, 2, 0]];
    
    testData = [1,2];
    
    neuralNetwork.train(5000,0.2,data);
    cost=neuralNetwork.getCostData();
    
    rawData.numberOfInputs=arhitecture.numberOfInputNeurons;
    rawData.numberOfOutputs=arhitecture.numberOfOutputNeurons;
    rawData.points=data;

    let sol=neuralNetwork.evaluate(testData);
    rawData.curvePoints=findCurve(data,neuralNetwork);

}

function AppEngine(){
       
    return (
    <div>
        <p>{activateNetwork()}ceva</p>
        <Arhitecture arhitectureData={arhitecture} style={{float:"right"}}/>
        <DataGraph data={rawData}/>
        <CostGraph costData={cost}/>
        <InputData />
    </div>);
}

export default AppEngine;