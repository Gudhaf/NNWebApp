import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import style from "./rawDataHandler.module.css"
import "./inputField.css";
function NetworkField() {
    let numberOfIteration=0;
    let learningRate=0;
  return (
    <div id="yellow" className={style.container} style={{marginLeft:75, width:450,height:250}}>
      <TextField
                      id="outlined-basic"
                      label="Number of iterations"
                      variant="outlined"
                      onChange={(event) => {
                        numberOfIteration = event.target.value;
                      }}
                      style={{ width: 300, marginTop:40,marginLeft:75}}
                    />
    <TextField
                      id="outlined-basic"
                      label="Learning Rate"
                      variant="outlined"
                      onChange={(event) => {
                        learningRate = event.target.value;
                      }}
                      style={{ width: 300, marginTop:40,marginLeft:75}}
                    />
    </div>
  );
}

export default NetworkField;
