export enum USER_ROLE {
    NORMAL = 'NORMAL',
    ADMIN = 'ADMIN'
}

export type user = {
    id: string,
    name: string,
    email: string,
    password: string
    role: USER_ROLE
}

export type authenticationData = {
    id: string
}

export type SignupInputDTO = {
    name: string,
    email: string,
    password: string
    role: USER_ROLE
}

export type LoginInputDTO = {
    email: string,
    password: string
}