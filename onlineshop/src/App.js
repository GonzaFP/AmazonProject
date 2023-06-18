import React, { useContext, useEffect } from "react";
import Layout from "./Layout";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Components/cart";
import CategoryProducts from "./Components/CategoryProducts";
import ProductDetails from "./Components/ProductDetails";
import SearchResults from "./Components/SearchResults";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./Contexts/dispatchContext";
import Checkout from "./Components/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Components/Orders";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { getStoredItems } from "./Contexts/dispatchContext";

const promise = loadStripe(
	"pk_test_51NHM1TKegTPnAwbFD6KwJGNfLKiom5az03Pj5UZOcbN9NuS5WOHUC0XwsKOf87oCjYttt1tQfbGRzx8ueAnlNSec00rhQ6ppw9"
);

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authuser) => {
			if (authuser) {
				dispatch(
					login({
						name: authuser.displayName,
						email: authuser.email,
						id: authuser.uid,
					})
				);
				const getCart = async () => {
					await getDoc(doc(db, "cart", authuser.uid)).then(
						(queryResponse) => {
							console.log(queryResponse.data());
							dispatch(getStoredItems(queryResponse.data()));
						}
					);
				};
				getCart();
			} else {
				dispatch(logout());
			}
		});

		return () => unsubscribe();
	}, []);
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="cart" element={<Cart />} />
				<Route path="search" element={<SearchResults />} />
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
