import React from "react";
import "./Styles/FooterStyles.css";
function Footer() {
	return (
		<footer className="footer">
			<div className="backTop">
				<a href="#">Back to top</a>
			</div>

			<div className="mainfooter">
				<div className="footerOptions">
					<div className="footerOption">
						<h4>Get to Know Us</h4>
						<p>Careers</p>
						<p>Blog</p>
						<p>About Amazon</p>
						<p>Investor Relations</p>
					</div>

					<div className="footerOption">
						<h4>Make Money with Us</h4>
						<p>Sell products on Amazon</p>
						<p>Sell on Amazon Business</p>
						<p>Sell apps on Amazon</p>
						<p>Become an Affiliate</p>
						<p>Advertise Your Products</p>
					</div>

					<div className="footerOption">
						<h4>Amazon Payment Products</h4>
						<p>Amazon Business Card</p>
						<p>Shop with Points</p>
						<p>Reload Your Balance</p>
						<p>Amazon Currency Converter</p>
					</div>

					<div className="footerOption">
						<h4>Let Us Help You</h4>
						<p>Amazon and COVID-19</p>
						<p>Your Account</p>
						<p>Your Orders</p>
						<p>Shipping Rates & Policies</p>
						<p>Returns & Replacements</p>
					</div>
				</div>
				<div className="footerOption2">
					<div>Conditions of Use</div>
					<div>Privacy Notice</div>
					<div>Your Ads Privacy Choices</div>
				</div>
				<p>&copy; 1996-2023, Amazon.com, Inc. or its affiliates</p>
			</div>
		</footer>
	);
}

export default Footer;
