import React from "react";
import { SliderData } from "./SliderData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Styles/Slider.css";

function Sliders() {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	let SlideData = SliderData.map((slide, index) => {
		return <img src={slide.image} alt="" key={index} className="banner" />;
	});

	return (
		<section>
			<Slider {...settings}>{SlideData}</Slider>
		</section>
	);
}

export default Sliders;
