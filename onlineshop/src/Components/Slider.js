import React from "react";
import { SliderData } from "./SliderData";
import Slider from "react-slick";
import "./Styles/Slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Sliders() {
	let SlideData = SliderData.map((slide, index) => {
		return <img src={slide.image} alt="" key={index} className="banner" />;
	});

	return (
		<section>
			<Carousel
				infiniteLoop
				autoPlay
				showThumbs={false}
				showStatus={false}>
				{SlideData}
			</Carousel>
		</section>
	);
}

export default Sliders;
