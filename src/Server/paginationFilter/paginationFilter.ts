import { IPagination } from "../../Model/IPagination";

const OFFSET = 15;
export const paginationFilter = <T extends any>(data: T[], page: number = 1): IPagination<T> => {
	const slicedData = data.slice(page * OFFSET - OFFSET, page * OFFSET);
	return {
		data: slicedData,
		pageCount: Math.ceil(data.length / OFFSET),
		page
	};
};
