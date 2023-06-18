import React from "react";
import "./Styles/HeaderStyles.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase";
import { EmptyCart, logout } from "../Contexts/dispatchContext";
import { signOut } from "firebase/auth";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

function Header() {
	const navigate = useNavigate();
	const { cartItems, user } = useSelector((state) => state.mainReducer);
	console.log(user);
	const dispatch = useDispatch();
	const number = cartItems?.reduce((Total, nextAmount) => {
		return Total + nextAmount.qty;
	}, 0);

	const handleAuth = async () => {
		if (user) {
			await setDoc(doc(db, "cart", user?.id), {
				cart: cartItems,
				user: user,
			});
			await signOut(auth);
			dispatch(logout());
			dispatch(EmptyCart());
		}
	};

	return (
		<div className="Header">
			<Link to="/">
				<img src="amazonlogo.png" alt="" className="logo" />
			</Link>

			<div className="search">
				<Search />
			</div>

			<div className="optionNav">
				<Link to={!user && "/signin"}>
					<div className="options" onClick={handleAuth}>
						<span className="option1">
							Hello, {user?.name ? user.name : "Guest"}
						</span>
						<span className="option2">
							{user ? "Sign Out" : "Sign In"}
						</span>
					</div>
				</Link>

				<Link to={!user ? "/signin" : "/orders"}>
					<div className="options">
						<span className="option1">Returns</span>
						<span className="option2">& Orders</span>
					</div>
				</Link>

				<Link to="/cart">
					<div className="basketcontainer">
						<ShoppingBasketIcon />
						<span className="option2 basketcount">{number}</span>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Header;
