import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LongProduct(props) {
	const baseUrl = "..//assets/";

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 3,
	};

	return (
		<>
			<div className="main">
				<h3>Best Sellers in Books</h3>
				<div>
					<Slider {...settings}>
						{props.image.map((item) => {
							return (
								<img
									className="img"
									src={baseUrl + item + ".jpg"}
									alt=""
								/>
							);
						})}
					</Slider>
				</div>
			</div>
		</>
	);
}

export default LongProduct;
