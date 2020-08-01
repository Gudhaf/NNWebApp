import React, { useState } from "react";
import InputData from "./inputField";
import Slider from "@material-ui/core/Slider";
import "./inputField.css";

let style = {
  height: 600,
  width: 530,
  overflowX: "hidden",
  overflowY: "auto",
  marginTop: 20,
  borderTop: "5px solid #310A31",
};

const style2 = {
  width: 400,
  marginLeft: 40,
  color: "#310A31",
};

let hiddenLayersData = {
  value: 5,
  updateValue(n) {
    this.value = n;
  },
  color: "blue",
  min: 0,
  max: 10,
  text: "Number of hidden layers",
  default: 1,
  margin: "normal",
};

const marks = [];

function getMarks(data) {
  for (let i = data.min; i < data.max + 1; i++) {
    marks.push({ value: i, label: i });
  }
}

function HiddenLayersField() {
  const [HiddenLayers, setHiddenLayers] = useState([]);
  let hiddenNeuronsData = [];

  const createObject = (number) => {
    return {
      value: 0,
      updateValue(newValue) {
        this.value = newValue;
        console.log(this.value);
      },
      color: "blue",
      min: 1,
      max: 10,
      text: "Number of neurons on layer " + number,
      default: 1,
      margin: "hidden",
    };
  };

  const handleChange = (event, value) => {
    hiddenLayersData.value = value;
    hiddenNeuronsData = [];
    for (let i = 0; i < value; i++) {
      hiddenNeuronsData.push(createObject(i + 1));
    }
    setHiddenLayers([...hiddenNeuronsData]);
  };

  getMarks(hiddenLayersData);
  return (
    <div
      id={hiddenLayersData.color}
      style={{ width: 530, height:750, marginLeft:50,marginRight:50,backgroundColor:"#98B1DC"}}
    >
      <Slider
        defaultValue={hiddenLayersData.default}
        step={1}
        min={hiddenLayersData.min}
        max={hiddenLayersData.max}
        marks={marks}
        style={style2}
        onChangeCommitted={handleChange}
      />
      <p>{hiddenLayersData.text}</p>
      <div style={style}>
        {HiddenLayers.map((elem) => (
          <InputData info={elem} />
        ))}
      </div>
    </div>
  );
}

export default HiddenLayersField;
