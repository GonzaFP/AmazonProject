import React, { useEffect } from "react";
import "./Styles/cartStyles.css";
import SubTotal from "./SubTotal";
import { useDispatch, useSelector } from "react-redux";
import { getStoredItems } from "../Contexts/dispatchContext";
import CartItems from "./CartItems";
function Cart() {
	const { cartItems } = useSelector((state) => state.mainReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getStoredItems());
	}, [dispatch]);
	return (
		<div className="cart">
			<div className="leftside">
				<img
					src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB4223492668_.jpg"
					alt=""
					className="bannerads"
				/>

				<div>
					<h2 className="title">Your Shopping Basket</h2>
					{cartItems.length > 0 ? (
						cartItems.map((item, index) => {
							return <CartItems item={item} key={index} />;
						})
					) : (
						<h2>No items in the basket</h2>
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
