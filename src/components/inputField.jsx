import React from "react";
import Slider from "@material-ui/core/Slider";
import TextField from '@material-ui/core/TextField';
import "./inputField.css";

let x = 0;

const style = {
  width: 400,
  marginLeft: 40,
  color: "#310A31",
};

function valuetext(value) {
  return value;
}

function InputData(props) {
        function handleChange(event,value) {
                x = value;
                props.info.updateValue(x);
              }

  return (
    <div id={props.info.color} className={props.info.margin} style={{width:500}}>
      <Slider
        defaultValue={props.info.default}
        step={1}
        min={props.info.min}
        max={props.info.max}
        style={style}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-small-steps"
        valueLabelDisplay="auto"
        onChangeCommitted={handleChange}
      />
      <p>{props.info.text}</p>
    </div>
  );
}

export default InputData;
