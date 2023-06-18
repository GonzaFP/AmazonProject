import React from "react";
import "./Styles/SubTotal.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SubTotal() {
	const navigate = useNavigate();
	const { cartItems, user } = useSelector((state) => state.mainReducer);
	const Total = cartItems.reduce((Total, nextAmount) => {
		return Total + nextAmount.price * nextAmount.qty;
	}, 0);
	const number = cartItems.reduce((Total, nextAmount) => {
		return Total + nextAmount.qty;
	}, 0);
	return (
		<div className="subtotal">
			<p>
				SubTotal ({number} items):
				<strong>$ {Total}</strong>
			</p>
			<div className="check">
				<label>
					<input type="checkbox" /> This order contains a gift.
				</label>
			</div>

			<button
				className="button"
				onClick={() => {
					user && cartItems.length > 0
						? navigate("/checkout")
						: !user && navigate("/signin");
				}}>
				Proceed to check out
			</button>
		</div>
	);
}

export default SubTotal;
