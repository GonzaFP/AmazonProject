import React from "react";
import { ProductInfo } from "./Styles/styles";
import { Link } from "react-router-dom";
function DoubleProducts({ title, image1, image2, image3, image4, subtitle }) {
	return (
		<ProductInfo>
			<h3>{title}</h3>
			<div className="row1">
				<img className="image" src={image1} alt="" />
				<img className="image" src={image2} alt="" />
			</div>
			<div className="row2">
				<img className="image" src={image3} alt="" />
				<img className="image" src={image4} alt="" />
			</div>
			<Link to="/cart">
				<p>{subtitle}</p>
			</Link>
		</ProductInfo>
	);
}

export default DoubleProducts;
