import React from "react";
import InputData from "./inputField";

let inputData = {
  value: 0,
  updateValue(n) {
	this.value = n;
  },
  color: "blue",
  min: 1,
  max: 10,
  text: "Number of input neurons",
  default: 2,
  margin:"normal"
};
let outpuData = {
  value: 0,
  updateValue(n) {
    this.value = n;
  },
  color: "yellow",
  min: 1,
  max: 10,
  text: "Number of output neurons",
  default: 1,
  margin:"normal"
};
let hiddenLayersData = {
  value: 2,
  updateValue(n) {
	this.value = n;
  },
  color: "blue",
  min: 0,
  max: 10,
  text: "Number of hidden layers",
  default: 1,
  margin:"normal"
};

let hiddenNeuronsData = [];

let style={marginLeft:90,height:400, width:530, overflowX: "hidden", overflowY:"auto",marginTop:20,borderTop: "5px solid #310A31" };

function getHiddenNeurons() {
  for (let i = 0; i < hiddenLayersData.value; i++) {
    hiddenNeuronsData.push({
      value: 0,
      updateValue(n) {
        this.value = n;
      },
      color: "blue",
      min: 1,
      max: 10,
      text: "Number of neurons on layer "+(i+1),
	  default: 1,
	  margin:"hidden"
    });
  }

  return(<div style={style}>{hiddenNeuronsData.map(data=><InputData info={data}/>)}</div>);
}

function Test() {
  return (
    <div>
      <InputData info={inputData} />
      <InputData info={outpuData} />
      <InputData info={hiddenLayersData} />
	  {getHiddenNeurons()}
    </div>
  );
}

export default Test;
