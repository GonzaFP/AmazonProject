import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function NextArrow(props) {
	const { className, style, onClick } = props;

	return (
		<div
			className={className}
			style={{
				...style,
				display: "block",
				background: "white",
				border: "1px solid white",
				color: "black",
			}}
			onClick={onClick}
		/>
	);
}

export function PrevArrow(props) {
	const { className, style, onClick } = props;

	return (
		<div
			className={className}
			style={{
				...style,
				display: "block",
				background: "red",
				border: "1px solid white",
				color: "black",
				fontSize: 500 + "px",
			}}
			onClick={onClick}
		/>
	);
}
