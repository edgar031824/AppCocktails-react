import React, { useContext } from 'react';
import { resultContext } from '../context/resultContext';
import Styles from './styles/cocktail.module.scss';
import { Card } from 'antd';

const Cocktail = () => {
	const { cocktailInfo } = useContext(resultContext);
	const buildInformation = () => {
		const ingredients = [];
		for (const key in cocktailInfo) {
			if (key.indexOf('strIngredient') !== -1) {
				const ingredient = cocktailInfo[key];
				const id = key.match(/\d/g);
				const measure = cocktailInfo[`strMeasure${id[0]}`];

				if (cocktailInfo[key]) {
					ingredients.push(<li key={id[0]}>{measure ? `${measure} - ${ingredient}` : ` ${ingredient}`}</li>);
				}
			}
		};
		return ingredients
	}

	return (
		<Card
			className={Styles.cocktail}
			title={cocktailInfo.strDrink}
			bordered={false}
			loading={!Object.keys(cocktailInfo).length ? true : false}
			cover={<img alt="example" src={cocktailInfo.strDrinkThumb} />}
		>
			<h4>Ingredients</h4>
			<ul>
				{buildInformation()}
			</ul>
			<h4>Description</h4>
			<p>{cocktailInfo.strInstructions}</p>
		</Card>
	);
};

export default Cocktail;