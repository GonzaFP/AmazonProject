import React, { useEffect } from "react";
import "./Styles/cartStyles.css";
import SubTotal from "./SubTotal";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "./CartItems";
import { Link, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function Cart() {
	const navigate = useNavigate();
	const { cartItems, user } = useSelector((state) => state.mainReducer);
	return (
		<div className="cart">
			<div className="leftside">
				<img
					src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB4223492668_.jpg"
					alt=""
					className="bannerads"
				/>

				<div>
					<h2 className="title">Your Amazon Cart</h2>
					{cartItems?.length > 0 ? (
						cartItems?.map((item, index) => {
							return <CartItems item={item} key={index} />;
						})
					) : (
						<div className="cartmessage">
							<div className="right">
								<AddShoppingCartIcon
									style={{ fontSize: "600%" }}
								/>
							</div>

							<div className="left">
								<h3>Empty cart</h3>
								<p>
									{" "}
									<Link to="/" className="link">
										{" "}
										shop great deals now.
									</Link>
								</p>
								{!user && (
									<>
										<button
											className="signinBtn"
											onClick={() => navigate("/signin")}>
											Sign in to your account
										</button>
										<button
											className="signupBtn"
											onClick={() => navigate("/signup")}>
											Sign up now
										</button>
									</>
								)}
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="rightside">
				<SubTotal />
			</div>
		</div>
	);
}

export default Cart;
