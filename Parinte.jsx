import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Copil from "./Copil";
import { useEffect } from "react";

const Parinte = () => {
	const [stateParinte, setStateParinte] = useState([]);
	let object = [];

	const createObject = () => {
		return {
			value: 0,
			color: "blue",
			min: 1,
			max: 10,
			text: "Number of neurons on layer ",
			default: 1,
			margin: "normal",
		};
	};

	const handleChange = (event, value) => {
		for (let i = 0; i < value; i++) {
			object.push(createObject(i));
		}
		setStateParinte([...object]);
		console.log(stateParinte);
	};

	return (
		<div>
			<Slider
				defaultValue={0}
				step={1}
				min={0}
				max={5}
				onChangeCommitted={handleChange}
			/>
			<div>---------------------------------------</div>
			<div>
				{stateParinte.map((elem) => (
					<Copil info={elem} />
				))}
			</div>
		</div>
	);
};

export default Parinte;
