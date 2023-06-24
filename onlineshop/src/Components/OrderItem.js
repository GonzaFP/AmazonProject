import React from "react";
import CartItems from "./CartItems";
import moment from "moment";

function OrderItem({ order }) {
	const hideButton = true;
	return (
		<div className="orderitem">
			<h2>Order</h2>
			<p>
				Date created:{" "}
				<strong>
					{moment
						.unix(order.timestamp)
						.format("Do MMMM YYYY, hh:mm:ss a")}
				</strong>
			</p>
			<p className="orderid">
				Order Id:{" "}
				<strong>
					<small>{order.created}</small>
				</strong>
			</p>

			<div className="orderaddress">
				<h4>Shipping Address</h4>
				<p>Name: {order.name}</p>
				<p>Email: {order.email}</p>
				<p>Phone: {order.phone}</p>
				<p>Address: {order.address}</p>
				<p>City: {order.city}</p>
				<p>Country: {order.country}</p>
			</div>

			{order.cart.map((item, index) => {
				return (
					<CartItems
						key={index}
						item={item}
						hideButton={hideButton}
					/>
				);
			})}
			<h4 className="ordertotal">
				{" "}
				Order Total: <strong>$ {order.amount}</strong>
			</h4>
		</div>
	);
}

export default OrderItem;
