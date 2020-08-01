import React from "react";
import Slider from "@material-ui/core/Slider";

const Copil = (props) => {
	const { info } = props;
	return (
		<Slider
			defaultValue={info.default}
			step={1}
			min={info.min}
			max={info.max}
		/>
	);
};

export default Copil;
