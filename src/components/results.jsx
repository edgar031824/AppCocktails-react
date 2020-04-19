import React, { useContext } from 'react';
import { resultContext } from '../context/resultContext';
import { Card } from 'antd';
import { Row, Col, Button } from 'antd';
import Styles from './styles/result.module.scss'

const Results = () => {
	var { results } = useContext(resultContext);
	const { Meta } = Card;
	const handleClick = () => {

	}

	return (
		<div className={Styles.wrapper}>
			<Row>
				{results.map(item => (
					<Col className={Styles.column} key={item.idDrink} xs={24} sm={12} md={8} lg={8} xl={6}>
						<Card
							hoverable
							cover={<img alt="example" src={item.strDrinkThumb} />}
							className={Styles.card}
						>
							<Meta title={item.strDrink} />
							<Button type="primary" onClick={handleClick}>
								Show detail
    				</Button>
						</Card>,
					</Col>
				))}
			</Row>
		</div>

	);
};

export default Results;