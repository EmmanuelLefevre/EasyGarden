export interface IUser {
    id: number,
    email: string,
    password: string,
    confirmPassword?: string,
    lastName: string,
    firstName: string,
    pseudo: string,
    phoneNumber: string,
    createdAt: string,
    updatedAt: string,
    isVerified: boolean
}

export interface IDataUser {
    data: IUser[]
}
