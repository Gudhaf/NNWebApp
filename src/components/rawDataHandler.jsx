import React, { useState } from "react";
import InputData from "./inputField";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "./inputField.css";
import style from "./rawDataHandler.module.css"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

let inputLayerData = {
  value: 3,
  updateValue(n) {
    this.value = n;
    console.log("-----");
    console.log(this.value);
    console.log(outputLayerData.value);
    console.log(numberOfData.value);
  },
  color: "blue",
  min: 1,
  max: 10,
  text: "Number of input neurons",
  default: 2,
  margin: "normal",
};
let outputLayerData = {
  value: 0,
  updateValue(n) {
    this.value = n;
  },
  color: "yellow",
  min: 1,
  max: 10,
  text: "Number of output neurons",
  default: 1,
  margin: "normal",
};
let numberOfData = {
  value: 0,
  updateValue(n) {
    this.value = n;
  },
  color: "yellow",
  min: 1,
  max: 30,
  text: "Number of data lines",
  default: 1,
  margin: "normal",
};

function RawDataField() {
  const [rawData, setRawData] = useState([]);
  let rawDataAux = [];
  const classes = useStyles();
  

  const createObject = (type) => {
    return {
      value: 0,
      label: type,
    };
  };

  const handleInputChange = (event) => {};

  const handleChanges = () => {
    rawDataAux = [];
    setRawData([]);
    for (let line = 0; line < numberOfData.value; line++) {
      let aux = [];
      for (
        let inputNeuron = 0;
        inputNeuron < inputLayerData.value;
        inputNeuron++
      ) {
        aux.push(createObject("Input Neuron"));
      }
      for (
        let outputNeuron = 0;
        outputNeuron < outputLayerData.value;
        outputNeuron++
      ) {
        aux.push(createObject("Output Neuron"));
      }
      rawDataAux.push(aux);
    }
    setRawData(rawDataAux);
  };

  return (
    <div>
      <InputData info={inputLayerData} />
      <InputData info={outputLayerData} />
      <InputData info={numberOfData} />
      <button onClick={handleChanges} className={style.myButton}>
        update
      </button>
      <div className={style.container} id="yellow" style={{height:338}}>
        <ol>
          {rawData.map((line) => (
            <li style={{marginTop:10}}>
              <div className={classes.root}>
                {line.map((element) => (
                  <div>
                    <TextField
                      id="outlined-basic"
                      label={element.label}
                      variant="outlined"
                      onChange={(event) => {
                        element.value = event.target.value;
                      }}
                      className={classes.textField}
                      style={{ width: 90,backgroundColor:"#98B1DC"}}
                      
                    />
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default RawDataField;
