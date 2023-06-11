import React, { useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useDispatch } from "react-redux";
import { DeleteItem, AddSubQty } from "../Contexts/dispatchContext";

function CartItems(props) {
	const { id, title, price, qty, image } = props.item;
	const dispatch = useDispatch();
	return (
		<div className="detailsContainer">
			<img src={image} alt="" className="detailsImage" />
			<div>
				<h3>{title}</h3>
				<p className="price">
					{" "}
					<small>$</small>
					{price}
				</p>
				<div className="operations">
					<AddCircleIcon
						className="operator"
						onClick={() => {
							dispatch(
								AddSubQty({ productId: id, operator: "+" })
							);
						}}
					/>
					<p>{qty}</p>
					<RemoveCircleIcon
						className="operator remove"
						onClick={() => {
							dispatch(
								AddSubQty({ productId: id, operator: "-" })
							);
						}}
					/>
				</div>
				{!props.hideButton && (
					<button
						onClick={() => {
							dispatch(DeleteItem(id));
						}}>
						Remove from Basket
					</button>
				)}
			</div>
		</div>
	);
}

export default CartItems;
