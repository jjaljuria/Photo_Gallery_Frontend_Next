export interface User{
	id: string,
	username: string,
	password: string,
	avatar: string,
	email: string,
	cretedAt: string | Date,
	updatedAt?: string | Date
}