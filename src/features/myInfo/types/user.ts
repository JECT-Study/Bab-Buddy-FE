export interface User {
	name: string
	email: string
	profile: string
}

export interface ExtendedUser extends User {
	userId: string
}
