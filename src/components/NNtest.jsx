import React from "react";
import RawDataField from "./rawDataHandler";
import HiddenLayersField from "./hiddenLayersHandler";
import NetworkField from "./networkDataHandler";
import style from "./NNTest.module.css"


function Test() {
  return (
    <div style={{display:"flex"}}>
      <RawDataField />
      <div className={style.column}></div>
      <HiddenLayersField />
      <div className={style.column}></div>
      <NetworkField />
      <img src="https://i.imgur.com/y8MXvIK.png" alt="ceva" className={style.img1}></img>
      <img src="https://i.imgur.com/y8MXvIK.png" alt="2" className={style.img2}></img>
      <img src="https://i.imgur.com/y8MXvIK.png" alt="3" className={style.img3}></img>
      <button className={style.myButton}>GO!</button>

    </div>
  );
}

export default Test;
