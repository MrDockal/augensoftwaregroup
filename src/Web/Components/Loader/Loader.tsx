import * as React from 'react';
import styled, { keyframes } from "styled-components";


const rotate = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

const StyledLoader = styled.div`
	transform: scale(0.3);
	display: inline-block;
	position: absolute;
	top: -16px;
	right: -16px;
	width: 64px;
	height: 64px;
    div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 51px;
		height: 51px;
		margin: 6px;
		border: 6px solid #000;
		border-radius: 50%;
		animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #000 transparent transparent transparent;
	}
	div:nth-child(1) {
		animation-delay: -0.45s;
	}
	div:nth-child(2) {
		animation-delay: -0.3s;
	}
	div:nth-child(3) {
		animation-delay: -0.15s;
	}
}
`;

export const Loader = () => (
	<StyledLoader><div></div><div></div><div></div><div></div></StyledLoader>
)