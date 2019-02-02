import { IPagination } from "../../Model/IPagination";

const LIMIT = 20;
export const paginationFilter = <T extends any>(data: T[], page: number = 1): IPagination<T> => {
	const slicedData = data.slice(page * LIMIT - LIMIT, page * LIMIT);
	return {
		data: slicedData,
		pageCount: Math.ceil(data.length / LIMIT),
		page
	};
};
