import React, { Component } from 'react';
import Network from "./network";

function ceva(){
    let n=new Network(2,1,0,[]);
    let data=[[1, 2, 0],
          [2, 4, 0],
          [2, 0.5, 0],
          [2.5, 1, 0],
          [3, 1.5, 1],
          [3.5, 0.5, 1],
          [4, 1.5, 1],
          [5.5, 1, 1],
          [1, 2, 0]];
    
    console.log(n);
    n.train(3000,0.2,data);
    let sol=n.evaluate([1,2]);
    console.log(sol[0].value);
    console.log(n);
}

function NN(){
       
    return (
    <div>
        <p>{ceva()}Ceva</p>
    </div>);
}

export default NN;