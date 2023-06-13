import React from "react";
import { ProductImg } from "./Styles/styles";
function LongProduct(props) {
	const baseUrl = "..//assets/";
	console.log(props.image);

	return (
		<>
			<div className="main">
				<h3>Best Sellers in Books</h3>
				<div className="theimage">
					{props.image.map((item) => {
						return (
							<img
								className="img"
								src={baseUrl + item + ".jpg"}
								alt=""
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default LongProduct;
