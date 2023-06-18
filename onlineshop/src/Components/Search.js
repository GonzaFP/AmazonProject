/*
     !navigates to search results page.
*/
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
function Search() {
	const [searchWord, setSearchWord] = useState("");
	const navigate = useNavigate();

	const handleNavigate = (e) => {
		e.key === "Enter" && navigate(`/search?search=${searchWord}`);
	};
	return (
		<>
			<input
				className="searchinput"
				placeholder="Search Amazon"
				onChange={(e) => setSearchWord(e.target.value)}
				onKeyDown={handleNavigate}
			/>
			<SearchIcon
				className="searchicon"
				onClick={() => navigate(`/search?search=${searchWord}`)}
			/>
		</>
	);
}

export default Search;
