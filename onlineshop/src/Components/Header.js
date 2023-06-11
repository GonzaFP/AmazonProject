import React from "react";
import "./Styles/HeaderStyles.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase";
import { logout } from "../Contexts/dispatchContext";
import { signOut } from "firebase/auth";

function Header() {
	const navigate = useNavigate();
	const { cartItems, user } = useSelector((state) => state.mainReducer);
	const dispatch = useDispatch();
	const number = cartItems?.reduce((Total, nextAmount) => {
		return Total + nextAmount.qty;
	}, 0);

	const handleAuth = async () => {
		await signOut(auth);
		dispatch(logout());
	};

	return (
		<div className="Header">
			<Link to="/">
				<img src="amazonlogo.png" alt="" className="logo" />
			</Link>

			<div className="search">
				<input className="searchinput" placeholder="Search Amazon" />
				<SearchIcon className="searchicon" />
			</div>

			<div className="optionNav">
				<Link to={!user && "/signin"}>
					<div className="options" onClick={handleAuth}>
						<span className="option1">
							Hello {user?.name ? user.name : "Guest"}
						</span>
						<span className="option2">
							{user ? "Sign Out" : "Sign In"}
						</span>
					</div>
				</Link>

				<Link to="/orders">
					<div className="options">
						<span className="option1">Returns</span>
						<span className="option2">& Orders</span>
					</div>
				</Link>

				<div className="options">
					<span className="option1">Your</span>
					<span className="option2">Prime</span>
				</div>

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
