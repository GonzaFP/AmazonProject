/*
  !sends an API call to fetch the user's search query.
  !passes the data to Products component.
*/
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import fetcher from "../fetcher";
import Products from "./Products";
import "./Styles/SearchStyles.css";
import Spinner from "./Spinner";

function SearchResults() {
	const [searchParams] = useSearchParams();
	const [isLoading, setLoading] = useState(true);
	const [searchProducts, setSearchProducts] = useState({
		errorMessage: "",
		data: [],
	});
	const query = searchParams.get("search");

	useEffect(() => {
		const fetchProduct = async () => {
			const productData = await fetcher(`products?q=${query}`);
			setSearchProducts(productData);
			setLoading(false);
		};
		fetchProduct();
	}, [query]);

	let productdata = searchProducts.errorMessage
		? `Error: ${searchProducts.errorMessage}`
		: searchProducts.data.length > 0 &&
		  searchProducts.data.map((product) => {
				return <Products key={product.id} item={product} />;
		  });

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : searchProducts.data.length > 0 ? (
				<>
					<h3 className="heading">
						{searchProducts.data.length} results for{" "}
						<span className="query">{`"${query}"`}</span>
					</h3>
					<div className="productdata">{productdata}</div>
				</>
			) : (
				<>
					<h3 className="heading">
						No results for{" "}
						<span className="query">{`"${query}"`}</span>
					</h3>
					<p>Try checking your spelling or use general terms.</p>
				</>
			)}
		</>
	);
}

export default SearchResults;
