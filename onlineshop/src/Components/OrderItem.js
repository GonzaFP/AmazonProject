import React from "react";
import moment from "moment";
import CartItems from "./CartItems";

function OrderItem({ order }) {
	const hideButton = true;
	return (
		<div className="orderitem">
			<h2>Order</h2>
			<p>
				{moment.unix(order.data.created).format("MMMMM Do YYYY h:mma")}
			</p>
			<p className="orderid">
				<small>{order.id}</small>
			</p>

			{order.data.cartItems.map((item, index) => {
				<CartItems key={index} item={item} hideButton={hideButton} />;
			})}
		</div>
	);
}

export default OrderItem;
