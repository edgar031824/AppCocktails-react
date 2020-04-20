import React, { useContext, useState } from 'react';
import { resultContext } from '../context/resultContext';
import { Row, Col, Button, Modal, Spin, Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Styles from './styles/result.module.scss'
import Cocktail from './cocktail';

const Results = () => {
	const { results, setDetail, setCocktailInfo, loading } = useContext(resultContext);
	const { Meta } = Card;
	const [modalVisibility, setModalVisibility] = useState(false);
	const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
	const handleClick = async (itemId) => {
		setDetail(itemId);
		setModalVisibility(true)
	}
	const onClose = () => {
		setCocktailInfo({});
		setDetail('');
		setModalVisibility(false)
	}

	const content = !loading ?
		<>
			<Row>
				{results.map(item => (
					<Col className={Styles.column} key={item.idDrink} xs={24} sm={12} md={8} lg={8} xl={6}>
						<Card
							hoverable
							cover={<img alt="example" src={item.strDrinkThumb} loading="lazy" />}
							className={Styles.card}
							loading={!results.length ? true : false}
						>
							<Meta title={item.strDrink} />
							<Button type="primary" onClick={() => handleClick(item.idDrink)}>
								Show detail
			</Button>
						</Card>
					</Col>
				))}
			</Row>
			<Modal
				visible={modalVisibility}
				onCancel={onClose}
				footer={null}
				className={Styles.modal}
			>
				<Cocktail></Cocktail>
			</Modal>
		</>
		:
		<div className={Styles.spinner}>
			<Spin indicator={antIcon} />
		</div>

	return (
		<div className={Styles.wrapper}>
			{content}
		</div >
	);
};

export default Results;