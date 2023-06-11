import React, { useContext, useEffect } from "react";
import Layout from "./Layout";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Components/cart";
import CategoryProducts from "./Components/CategoryProducts";
import ProductDetails from "./Components/ProductDetails";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./Contexts/dispatchContext";
import Checkout from "./Components/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Components/Orders";

const promise = loadStripe(
	"pk_test_51NHM1TKegTPnAwbFD6KwJGNfLKiom5az03Pj5UZOcbN9NuS5WOHUC0XwsKOf87oCjYttt1tQfbGRzx8ueAnlNSec00rhQ6ppw9"
);

function App() {
	const oldState = JSON.parse(localStorage.getItem("State"));
	const { user } = oldState;
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authuser) => {
			if (authuser) {
				dispatch(
					login({
						name: user?.name,
						email: authuser.email,
						id: authuser.uid,
						photoUrl: authuser.photoURL || null,
					})
				);
			}
		});
		return () => unsubscribe();
	}, []);
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="cart" element={<Cart />} />
				<Route
					path="products/:productId"
					element={<ProductDetails />}
				/>
				<Route
					path="category/:categoryId"
					element={<CategoryProducts />}
				/>
				<Route
					path="checkout"
					element={
						<Elements stripe={promise}>
							<Checkout />
						</Elements>
					}
				/>

				<Route path="orders" element={<Orders />} />
			</Route>
			<Route path="signin" element={<SignIn />} />
			<Route path="signup" element={<SignUp />} />
		</Routes>
	);
}

export default App;
