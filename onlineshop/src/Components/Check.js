import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import Spinner from "./Spinner";

const promise = loadStripe(
	"pk_test_51NHM1TKegTPnAwbFD6KwJGNfLKiom5az03Pj5UZOcbN9NuS5WOHUC0XwsKOf87oCjYttt1tQfbGRzx8ueAnlNSec00rhQ6ppw9"
);

function Check() {
	const { cartItems, user } = useSelector((state) => state.mainReducer);
	const [clientSecret, setClientSecret] = useState("");
	const [isLoading, setLoading] = useState(true);

	const Total = cartItems.reduce((Total, nextAmount) => {
		return Total + nextAmount.price * nextAmount.qty;
	}, 0);
	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("http://localhost:4242/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ Total: Total }),
		})
			.then((res) => res.json())
			.then((data) => {
				setClientSecret(data.clientSecret);
				setLoading(false);
			});
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				clientSecret && (
					<Elements stripe={promise} options={options}>
						<Checkout />
					</Elements>
				)
			)}
		</div>
	);
}

export default Check;
