import React, { useEffect, useState } from "react";
import "./Styles/CheckoutStyles.css";
import { useSelector, useDispatch } from "react-redux";
import CartItems from "./CartItems";
import { Link, useNavigate } from "react-router-dom";
import {
	CardElement,
	AddressElement,
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { EmptyCart } from "../Contexts/dispatchContext";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function Checkout() {
	const stripe = useStripe();
	const elements = useElements();
	const [message, setMessage] = useState(null);
	const [ErrorMessage, setErrorMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { cartItems, user } = useSelector((state) => state.mainReducer);
	const [diabled, setdisabled] = useState(false);
	const [email, setEmail] = useState(user?.email);
	const [shippingaddress, setAddress] = useState("");

	const number = cartItems.reduce((Total, item) => {
		return Total + item.qty;
	}, 0);

	const Total = cartItems.reduce((Total, nextAmount) => {
		return Total + nextAmount.price * nextAmount.qty;
	}, 0);

	const handleError = (error) => {
		setIsLoading(false);
		setErrorMessage(error.message);
	};
	const handleChange = (event) => {
		if (event.complete) {
			setAddress(event.value);
		}
	};

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage(
						"Your payment was not successful, please try again."
					);
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		// !if stripe has not loaded.
		if (!stripe || !elements) {
			setdisabled(true);
			return;
		}

		setIsLoading(true);
		await addDoc(collection(db, "orders"), {
			cart: cartItems,
			amount: Total,
			userid: user?.id,
			email: email,
			name: shippingaddress.name,
			phone: shippingaddress.phone,
			city: shippingaddress.address.city,
			country: shippingaddress.address.country,
			address: shippingaddress.address.line1,
			created: Date.now(),
			timestamp: serverTimestamp(),
		});
		dispatch(EmptyCart());
		// navigate("/orders", { replace: true });
		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: "http://localhost:3000/orders",
			},
		});

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occurred.");
		}
	};

	return (
		<div className="checkout">
			<div className="container">
				<h1>
					Checkout (<Link to="/cart">{number} items</Link>)
				</h1>
				<div className="section">
					<div className="checkouttitle">
						<h3>Contact Information</h3>
					</div>

					<div className="address">
						<AddressElement
							options={{
								mode: "shipping",
								allowedCountries: ["UG", "KE", "TZ"],
								fields: {
									phone: "always",
								},
								validation: {
									phone: {
										required: "always",
									},
								},
							}}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="section">
					<div className="checkouttitle">
						<h3>Review items</h3>
					</div>
					<div className="item">
						{cartItems?.map((item, index) => {
							return <CartItems key={index} item={item} />;
						})}
					</div>
				</div>

				<div className="section">
					<div className="checkouttitle">
						<h3>Payment Method</h3>
					</div>
					<div className="paydetails">
						<form onSubmit={handleSubmit}>
							<PaymentElement />
							<div className="pay">
								<h4>Order Total: $ {Total}</h4>

								<button
									type="submit"
									diabled={
										isLoading ||
										!stripe ||
										!elements ||
										diabled
									}>
									Buy now
								</button>
							</div>
							{ErrorMessage && <div>{ErrorMessage}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
