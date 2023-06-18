import React, { useState, useEffect } from "react";
import "./Styles/OrderStyles.css";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { collection, doc, getDocs } from "firebase/firestore";
import OrderItem from "./OrderItem";
import { useNavigate } from "react-router-dom";
function Orders() {
	const { user } = useSelector((state) => state.mainReducer);
	const [orders, setOrders] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getOrders = async () => {
			await getDocs(collection(db, "orders")).then((queryResponse) => {
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
			});
			// docsnap.docs.map((doc) => {
			// 	doc.data().userid === user.id && setOrders(doc.data());
			// });
		};
		getOrders();
		// if (user) {
		// 	db.collection("users")
		// 		.doc(user?.uid)
		// 		.collection("orders")
		// 		.orderBy("created", "desc")
		// 		.onSnapshot((snapshot) => {
		// 			setOrders(
		// 				snapshot.docs.map((doc) => {
		// 					return {
		// 						id: doc.id,
		// 						data: doc.data(),
		// 					};
		// 				})
		// 			);
		// 		});
		// } else {
		// 	setOrders([]);
		// }
	}, [user]);

	return (
		<div className="orders">
			<h2>Your Orders</h2>
			<div className="sth">
				{user ? (
					orders?.map((order, index) => {
						return <OrderItem key={index} order={order} />;
					})
				) : (
					<>
						<h3>You have no orders</h3>
						<button onClick={() => navigate("/")}>Hot deals</button>
					</>
				)}
				{}
			</div>
		</div>
	);
}

export default Orders;
