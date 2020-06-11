import React from "react";
import Slider from "@material-ui/core/Slider";
import "./input.css";

let x = 0;

const style = {
  width: 400,
  marginLeft: 40,
  color: "#310A31",
};

const marks = [];

function getMarks(data) {
  for (let i = data.min; i < data.max + 1; i++) {
    marks.push({ value: i, label: i });
  }
}

function InputData(props) {
        function handleChange(event,value) {
                x = value;
                props.info.updateValue(x);
              }
  getMarks(props.info);
  return (
    <div id={props.info.color} className={props.info.margin} style={{width:500}}>
      <Slider
        defaultValue={props.info.default}
        step={1}
        min={props.info.min}
        max={props.info.max}

        marks={marks}
        style={style}
        onChangeCommitted={handleChange}
      />
      <p>{props.info.text}</p>
    </div>
  );
}

export default InputData;
