import React, { useState } from "react";
import "./Styles/CheckoutStyles.css";
import { useSelector, useDispatch } from "react-redux";
import CartItems from "./CartItems";
import { Link, useNavigate } from "react-router-dom";
import { CardElement } from "@stripe/react-stripe-js";
import { EmptyCart } from "../Contexts/dispatchContext";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function Checkout() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState(null);
	const { cartItems, user } = useSelector((state) => state.mainReducer);
	const [processing, setProcessing] = useState("");
	const [success, setSuccess] = useState(false);
	const [name, setName] = useState(user?.name);
	const [email, setEmail] = useState(user?.email);
	const [address, setAddress] = useState("");
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
			userid: user?.id,
			email: email,
			name: name,
			address: address,
			created: Date.now(),
			timestamp: serverTimestamp(),
		});
		dispatch(EmptyCart());
		navigate("/orders", { replace: true });
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
						<div className="addressItem">
							<h4>
								Name<span className="span">*</span>
							</h4>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="addressItem">
							<h4>
								Email<span className="span">*</span>
							</h4>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="addressItem">
							<h4>
								Address<span className="span">*</span>
							</h4>
							<input
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							/>
						</div>
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
