import React, { useState, useEffect } from "react";
import "./Styles/OrderStyles.css";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { collection, orderBy, getDocs, query } from "firebase/firestore";
import OrderItem from "./OrderItem";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function Orders() {
	const { user } = useSelector((state) => state.mainReducer);
	const [orders, setOrders] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		<Spinner />;
		const getOrders = async () => {
			await getDocs(
				query(collection(db, "orders"), orderBy("timestamp", "desc"))
			).then((queryResponse) => {
				const newData = queryResponse.docs.map((doc) => {
					if (doc.data().userid === user?.id) return doc.data();
					else {
						return;
					}
				});
				const orderData = newData.filter((order) => {
					return order !== undefined;
				});
				setOrders(orderData);
				setLoading(false);
			});
		};
		getOrders();
	}, [user]);

	const handleDisplay = () => {
		if (isLoading) {
			return <Spinner />;
		} else {
			if (orders.length > 0) {
				return orders?.map((order, index) => {
					return <OrderItem key={index} order={order} />;
				});
			} else {
				return (
					<div className="noOrders">
						<h3>You have no orders.</h3>
						<button onClick={() => navigate("/")}>
							Shop hot deals
						</button>
					</div>
				);
			}
		}
	};

	console.log(handleDisplay());
	return (
		<div className="orders">
			<h2>Your Orders</h2>

			<div>{handleDisplay()}</div>
		</div>
	);
}

export default Orders;
