import React, { useState, useEffect } from "react";
import "./Styles/OrderStyles.css";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";

function Orders() {
	const { user } = useSelector((state) => state.mainReducer);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (user) {
			db.collection("users")
				.doc(user?.uid)
				.collection("orders")
				.orderBy("created", "desc")
				.onSnapshot((snapshot) => {
					setOrders(
						snapshot.docs.map((doc) => {
							return {
								id: doc.id,
								data: doc.data(),
							};
						})
					);
				});
		} else {
			setOrders([]);
		}
	}, [user]);
	return (
		<div className="orders">
			<h2>Your Orders</h2>
			<div className="sth">
				{orders?.map((order, index) => {
					<OrderItem key={index} order={order} />;
				})}

				<h4 className="ordertotal">
					{" "}
					Order Total: {orders.data.amount / 100}
				</h4>
			</div>
		</div>
	);
}

export default Orders;
