import React, { useEffect, useState } from "react";
import "./Styles/CheckoutStyles.css";
import { useSelector, useDispatch } from "react-redux";
import CartItems from "./CartItems";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../axios";
import { EmptyCart } from "../Contexts/dispatchContext";
import { db } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function Checkout() {
	const navigate = useNavigate();
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const { cartItems, user } = useSelector((state) => state.mainReducer);
	const [processing, setProcessing] = useState("");
	const [success, setSuccess] = useState(false);
	const [clientSecret, setClientSecret] = useState(true);
	const number = cartItems.reduce((Total, item) => {
		return Total + item.qty;
	}, 0);

	const Total = cartItems.reduce((Total, nextAmount) => {
		return Total + nextAmount.price * nextAmount.qty;
	}, 0);

	const handleSubmit = async (event) => {
		event.preventDefault();

		await addDoc(collection(db, "orders"), {
			cart: cartItems,
			amount: Total,
			userid: user?.uid,
			created: Date.now(),
		});

		console.log("data successful");
	};

	// useEffect(() => {
	// 	const getClientSecret = async () => {
	// 		const response = await axios.post(
	// 			`/checkout/create?/total=${Total * 100}`
	// 		);
	// 		setClientSecret(response.data.clientSecret);
	// 	};
	// 	getClientSecret();
	// }, [cartItems]);

	// console.log("client secret", clientSecret);

	// const handleSubmit = async (event) => {
	// 	event.preventDefault();
	// 	setProcessing(true);
	// 	const payload = await stripe
	// 		.confirmCardPayment(clientSecret, {
	// 			payment_method: {
	// 				card: elements.getElement(CardElement),
	// 			},
	// 		})
	// 		.then(({ paymentIntent }) => {
	// 			setSuccess(true);
	// 			setProcessing(false);
	// 			setErrors(null);
	// 			db.collection("users")
	// 				.doc(user?.uid)
	// 				.collection("orders")
	// 				.doc(paymentIntent.id)
	// 				.set({
	// 					cart: cartItems,
	// 					amount: paymentIntent.amount,
	// 					created: paymentIntent.created,
	// 				});

	// 			dispatch(EmptyCart());
	// 			navigate("/orders", { replace: true });
	// 		});
	// };

	// const handleChange = (event) => {
	// 	setErrors(event.error ? event.error.message : "");
	// 	setDisabled(event.empty);
	// };

	return (
		<div className="checkout">
			<div className="container">
				<h1>
					Checkout (<Link to="/cart">{number} items</Link>)
				</h1>
				<div className="section">
					<div className="checkouttitle">
						<h3>Delivery Address</h3>
					</div>

					<div className="address">
						<p>
							<span>{user?.name},</span> {user?.email}
						</p>
					</div>
				</div>

				<div className="section">
					<div className="checkouttitle">
						<h3>Review items</h3>
					</div>
					<div className="item">
						<img />
						<div>
							{cartItems?.map((item, index) => {
								return <CartItems key={index} item={item} />;
							})}
						</div>
					</div>
				</div>

				<div className="section">
					<div className="checkouttitle">
						<h3>Payment Method</h3>
					</div>
					<div className="paydetails">
						<form onSubmit={handleSubmit}>
							<CardElement />
							<div className="pay">
								<h4>Order Total: $ {Total}</h4>
								<button>
									<span>
										{processing ? "Processing" : "Buy Now"}
									</span>
								</button>
							</div>
							{errors && <div>{errors}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
