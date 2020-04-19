import React, { useState, useEffect, useContext } from 'react';
import { Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { resultContext } from '../context/resultContext';

const Wrapper = styled.div`
		margin: 2rem 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column wrap;
	`;

const TitleSearch = styled.h4`
		text-align: center;
		font-size: initial;
	`;

const StyleDiv = styled.div`
		display:flex;
		justify-content:space-around;
		flex-flow: row wrap;
		margin-top: 2rem;
		width:70%;

		.childElement {
			max-width: 60%;
			width: 16rem;
		}

		[type="button"] {
      border-color: transparent;
      background-color: #EC836D;
    }
	`;


const Search = () => {

	const { Option } = Select;
	const [categories, setCategories] = useState([]);
	const [ingredients, setIngredients] = useState([]);
	const [selectedIngredient, setSelectedIngredient] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [disabled, setDisabled] = useState(true);
	const { setSearch } = useContext(resultContext);
	const handleChange = (value, info) => {
		const { key } = info;
		if (key && key.includes('p')) {
			setSelectedIngredient(value);
		} else {
			setSelectedCategory(value);
		}
	}
	const handleClick = () => {
		setSearch({ selectedIngredient, selectedCategory });
	}

	useEffect(() => {
		const buttonStatus = () => {
			let status = true;
			if (selectedIngredient || selectedCategory) {
				status = false
			}
			setDisabled(status);
		}

		buttonStatus();
	}, [selectedIngredient, selectedCategory])

	useEffect(() => {
		const fetchLists = async () => {
			const categoryUrl = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
			const igredientUrl = `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`;
			const categoryResponse = await fetch(categoryUrl);
			const categories = await categoryResponse.json();
			const ingredientResponse = await fetch(igredientUrl);
			const ingredients = await ingredientResponse.json();

			setIngredients(ingredients.drinks);
			setCategories(categories.drinks);
		};
		fetchLists();
	}, []);

	return (
		<Wrapper>
			<TitleSearch>You can search by category, ingredient or both</TitleSearch>
			<StyleDiv>
				<Select
					className={'childElement'}
					defaultValue=""
					onChange={handleChange}
					value={selectedIngredient}
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					showSearch
				>
					<Option key={'p'} value="">Select an ingredient</Option>
					{ingredients.map((item, idx) => (
						<Option key={`p-${idx}`} value={item.strIngredient1}>{item.strIngredient1}</Option>
					))}
				</Select>
				<Select className={'childElement'} defaultValue="" onChange={handleChange} value={selectedCategory}>
					<Option value="">Select a category</Option>
					{categories.map((item, idx) => (
						<Option key={idx} value={item.strCategory}>{item.strCategory}</Option>
					))}
				</Select>
				<Button className={'childElement'} type="primary" icon={<SearchOutlined />} disabled={disabled} onClick={handleClick}>
					Search
    		</Button>
			</StyleDiv>
		</Wrapper >
	);
};

export default Search;