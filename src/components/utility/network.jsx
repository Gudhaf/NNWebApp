import React, { Component } from "react";

let costData=[];

//as activation function we will use the sigmoid function
function sigmoid(value){
  return 1/(1+Math.exp(-value));
}

//sigmoid function'
function sigmoidD(value){
  return sigmoid(value) * (1-sigmoid(value));
}

//the weights use a value (w) and the neuron they connect to
class Weight {
  value = 0;
  endPoint;

  constructor() {
    this.value = Math.random() * 0.2 - 0.1;
    this.endPoint = new Neuron();
  }
}

/*
  A neuron has a type (input, hidden or output)
               a value 
               the list of weights that connect from this neuron to the neurons ahead (w)
               and a bias (b)
*/
class Neuron {
  type = "";
  value = 0;
  w = [];
  b;
  z=0;
  target=0;

  constructor() {
    this.value=0;
    this.b = Math.random() * 0.2 - 0.1;
  }

  //connect this neuron to another one
  setEndPoint(neuron) {
    let weight = new Weight();
    weight.endPoint = neuron;
    this.w.push(weight);
  }

  //update the value of the neuron, if the neuron is an input neuron then just take the value else do the sigmoid function on that value
  updateValue(){
    this.value=sigmoid(this.z);
  }
}


//A network need the number of layers and neurons on each layer and the list of lists that will be out structure for a network (layers)
class Network {
  numberOfInputs = 0;
  numberOfOutputs = 0;
  numberOfHiddenLayers = 0;
  numberOfHiddenNeurons = [];

  layers = [];

  constructor(i, o, h, hn) {
    this.numberOfInputs = i;
    this.numberOfOutputs = o;
    this.numberOfHiddenLayers = h;
    this.numberOfHiddenNeurons = hn;

    //input layer, output layer + the number of hidden layers
    const totalNumberOfLayers = 2 + this.numberOfHiddenLayers;

    //we will go thorough each layer
    for (let n = 0; n < totalNumberOfLayers; n++) {
      //a list that will store the layer until we pass it in the "layers"
      let aux = [];

      //let's check on what type of layer we are so we can take actions accordingly 
      //n=0 is the first layer (the input layer)
      if (n == 0) {
        //we will add the number of neurons spicified above  and set their type to input
        for (let it = 0; it < this.numberOfInputs; it++) {
          let neuron=new Neuron();
          neuron.type="input";
          aux.push(neuron);
        }
      }
      //now we wil check if we are on the last layer (the output layer)
      else if (n == totalNumberOfLayers-1) {
        //we will add the number of neurons spicified above  and set their type to output as we did with the input layer
        for (let it = 0; it < this.numberOfOutputs; it++) {
          let neuron = new Neuron();
          neuron.type="output";

          //we will add to each neuron on the previous layer a conection to this layer (now they are friends <3)
          this.layers[n - 1].forEach((existingNeuron) => {
            existingNeuron.setEndPoint(neuron);
          });

          aux.push(neuron);
        }
      } 
      //if we are not on the input layer nor the output layer then we sure are on one of the hidden layers 
      else {
        //we will add the number of neurons spicified in the list "numberOfHiddenNeurons" on the term n-1 because we dont have the input layer on this list
        //and we will set their type to hidden as we did before
        for (let it = 0; it < this.numberOfHiddenNeurons[n - 1]; it++) {
          let neuron = new Neuron();
          neuron.type="hidden";

          //we will add to each neuron on the previous layer a conection to this layer
          this.layers[n - 1].forEach((existingNeuron) => {
            existingNeuron.setEndPoint(neuron);
          });

          aux.push(neuron);
        }
      }
      this.layers.push(aux);
    }
  }
  //now that we have the structure of our neuronal network done we can move on to the training routine to keep it healty

  //to train the network we will need the number of iterations, the learning rate and some data.
  //data follows the structure: [ [input1, input2, ... , inputn, output1, ... , outputmD],  ... , [input1, input2, ... , inputn,  output1, ... , outputm] ]
  train(numberOfIterations,learningRate,data){
    //first of all we need to start an iteration using the value passed to us
    let step=1;
    for (let iteration = 0; iteration < numberOfIterations; iteration++) {
      data.forEach(line =>{

        for (let j = 0; j < this.numberOfInputs; j++) {
          this.layers[0][j].value=line[j];

        }
        let out=0;

        for (let j = line.length-this.numberOfOutputs; j < line.length ; j++) {
          this.layers[this.layers.length-1][out].target=line[j];
          out++;
        }
        
        //let's calculate this z using z=input1*w1+...+inputn*wn+b:
        //first get on one of the layers (the input layer is using the data so we dont need him)
        for (let i = 1; i < this.layers.length; i++) {
          
          //now we will look at each neuron
          this.layers[i].forEach(neuron => {
            //we will make z=b so that we dont add it at the end
            neuron.z=neuron.b;
            
            //every neuron on thee privious layer has a connection to this one so let's look at them
            this.layers[i-1].forEach(previousNeuron => {
              //and every neuron in this bunch has connections so lets find the one we need
              previousNeuron.w.forEach(weight => {
                //after we find it we will add the weight of the connection times the value of the node to our z
                if(weight.endPoint==neuron) neuron.z+=(weight.value)*previousNeuron.value;
              });
            });
            
            //after we go to all of them we should have z calculated and now we can finally change the value on this neuron using the "updateValue" method
            neuron.updateValue();
          });
        }


        let cost=0;
        //this.layers[this.layers.length-1].forEach(outout => { console.log((outout.value - outout.target)**2); });
        for (let k = 0; k < this.numberOfOutputs; k++) {
          cost+=(this.layers[this.layers.length-1][k].value- this.layers[this.layers.length-1][k].target)**2;
        }

        //console.log(cost);
        if(iteration%5==0){
          costData.push({x:iteration,y:cost});
        }

        //how much did we deviate from the target?

        //to update the network and make it better we will use backpropagation
        //we need to find how much a specific w changes the output and for that we need to calculate dCost / dw
        //now how do we do that, well (dCost / dw) = (dz / dw) * (da / dz) * (dCost / da)
        //would you look at that dz / dw is the value of the previous node that connects to the output
        //                       da / dz is sigmoid'
        //                       dCost / da is 2*(prediction-target)
        //and so we will dalculate them but we will not use the weird thing that no one can read, instead we will do this:
        //dCost / dw = howMuchDoesWChangeTheCost
        //dz / dw = zw
        //da / dz = az
        //dCost / da = ca
        //we have a lot of w in here so we need to this this to all of them

        let howMuchDoesWChangeTheCost=0;
        let zw=0;
        let az=0;
        let ca=0;
        let zb=1;

        for (let i = this.layers.length-2; i > -1; i--) {
          this.layers[i].forEach(neuron => {
              neuron.w.forEach(weight => {
                if(i==this.layers.length-2){
                  ca=2*(weight.endPoint.value-weight.endPoint.target);
                  az=sigmoidD(weight.endPoint.z);
                  zw=neuron.value;

                  howMuchDoesWChangeTheCost=ca*az*zw;

                  weight.value-=learningRate*howMuchDoesWChangeTheCost;
                  weight.endPoint.b-=learningRate*az*ca*zb;
                }
                else{
                  az=sigmoidD(weight.endPoint.z);
                  zw=weight.endPoint.value;

                  howMuchDoesWChangeTheCost=az*zw;

                  weight.value-=learningRate*howMuchDoesWChangeTheCost;
                  weight.endPoint.b-=learningRate*az*zb;
                }
            });
          });
        }
      });
      
    }
  }

  evaluate(data){
    let j=0;
    data.forEach(input => {this.layers[0][j].value=input; j++})
    
    for (let i = 1; i < this.layers.length; i++) {  
      this.layers[i].forEach(neuron => {
        neuron.z=neuron.b;
        this.layers[i-1].forEach(previousNeuron => {
          previousNeuron.w.forEach(weight => {
            if(weight.endPoint==neuron) neuron.z+=(weight.value)*previousNeuron.value;
          });
        });
        
        neuron.updateValue();
      });
    }

    return this.layers[this.layers.length-1];

  }

  getCostData(){
    return costData;
  }
}

export default Network;
