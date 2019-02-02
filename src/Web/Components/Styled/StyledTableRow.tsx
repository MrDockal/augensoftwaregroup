import styled from "styled-components";

export const StyledTableRow = styled.tr`
	border-top: 1px solid #C1C3D1;
	border-bottom-: 1px solid #C1C3D1;
	color:#666B85;
	font-size:16px;
	font-weight:normal;
	text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
	&:hover td {
		background:#4E5066;
		color:#FFFFFF;
		border-top: 1px solid #22262e;
	}
	&:nth-child(odd) td {
		background:#EBEBEB;
	}
	&:nth-child(odd):hover td {
		background:#4E5066;
	}
`;
