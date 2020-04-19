import React, { useState, createContext, useEffect } from 'react';

export let resultContext = createContext();

const ResultProvider = ({ children }) => {
	const [search, setSearch] = useState({});
	const [results, setResults] = useState([]);

	useEffect(() => {
		const fetchResults = async () => {
			const { selectedIngredient, selectedCategory } = search;
			if (selectedIngredient || selectedCategory) {
				try {
					const url = selectedCategory ?
						`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}&i=${selectedIngredient}`
						: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`
					const response = await fetch(url);
					const cocktails = await response.json();

					setResults(cocktails.drinks);
					console.log(cocktails.drinks);

				} catch (error) {
					console.warn(error);
				}
			}
		}

		fetchResults();
	}, [search]);


	return (
		<resultContext.Provider
			value={{
				setSearch,
				results
			}}
		>
			{children}
		</resultContext.Provider>
	);
};

export default ResultProvider;