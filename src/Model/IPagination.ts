export interface IPagination<T> {
	page: number;
	pageCount: number;
	data: T[];
}
