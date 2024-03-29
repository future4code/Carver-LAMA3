import { LoginInputDTO, SignupInputDTO, user } from "../../model/User";
import Authenticator from "../../services/Authenticator";
import HashManager from "../../services/HashManager";
import IdGenerator from "../../services/IdGenerator";
import ValidateEmail from "../../services/ValidateEmail";
import { UserRepository } from "./UserRepository";

export class UserBusiness {
    private userData: UserRepository
    constructor(userDataImplementation: UserRepository) {
        this.userData = userDataImplementation
    }

    signup = async (input: SignupInputDTO) => {
        const { name, email, password, role } = input
        if (!email || !name || !password) {
            throw new Error('Ausência de parâmetros. Preencha os devidos campos.')
        }

        const emailCorrect = ValidateEmail.validateEmail(email)
        if (emailCorrect === false) {
            throw new Error('Email inválido, preencha com um válido.')
        }

        if (password.length < 6) {
            throw new Error('Senha deve possuir no mínimo 6 caracteres.')
        }

        const isUserRegistered = await this.userData.findUserByEmail(email)
        if (isUserRegistered) {
            throw new Error("Email já cadastrado")
        }

        const id = IdGenerator.generateId()
        const hashPassword = await HashManager.hash(password)

        const newUser: user = {
            id: id,
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }

        await this.userData.insert(newUser)

        const token = Authenticator.generateToken({ id })

        return token
    }

    login = async (input: LoginInputDTO) => {
        const { email, password } = input
        if (!email || !password) {
            throw new Error('Ausência de parâmetros. Preencha os devidos campos')
        }

        const emailCorrect = ValidateEmail.validateEmail(email)
        if (emailCorrect === false) {
            throw new Error('Email inválido, preencha com um válido.')
        }

        const isUser = await this.userData.findUserByEmail(email)
        if (!isUser) {
            throw new Error('Email ou senha incorretos')
        }

        const isPasswordCorrect = await HashManager.compare(password, isUser.password)
        if (!isPasswordCorrect) {
            throw new Error('Email ou senha incorretos')
        }

        const token = Authenticator.generateToken({ id: isUser.id })

        return token
    }
}

