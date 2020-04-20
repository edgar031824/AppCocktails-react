import React, { useState, createContext, useEffect } from 'react';

export let resultContext = createContext();

const ResultProvider = ({ children }) => {
	const [search, setSearch] = useState({});
	const [results, setResults] = useState([]);
	const [detail, setDetail] = useState('');
	const [cocktailInfo, setCocktailInfo] = useState({});
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchDetail = async () => {
			if (detail) {
				try {
					const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${detail}`;
					const response = await fetch(url);
					const cocktail = await response.json();

					setLoading(false);
					setCocktailInfo(cocktail.drinks[0]);

				} catch (error) {
					console.warn(error);
				}
			}
		}
		fetchDetail();
	}, [detail])

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

					setLoading(false)
					setResults(cocktails.drinks);

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
				setDetail,
				results,
				setCocktailInfo,
				cocktailInfo,
				setLoading,
				loading
			}}
		>
			{children}
		</resultContext.Provider>
	);
};

export default ResultProvider;