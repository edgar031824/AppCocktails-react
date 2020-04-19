import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;
	flex-direction: column;
	background-color: #EC836D;
	width:100vw;
	height:30vh;
	`;

const Title = styled.h1`
	 color: white;
	 margin-top: 0;
	 font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	`;

const Img = styled.img`
	height: 60px;
	width: 60px;
	`;

const Header = () => {
	return (
		<Wrapper>
			<Img src="https://images.vexels.com/media/users/3/157026/isolated/preview/3c375311fc725d757df321cd4506c349-icono-de-c--ctel-de-martini-de-verano-by-vexels.png" alt="" />
			<Title>Cocktails searcher</Title>
		</Wrapper>
	);
};

export default Header;