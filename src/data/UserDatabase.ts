import { UserRepository } from "../business/User/UserRepository";
import { user } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase implements UserRepository {
    protected TABLE_U = 'festUsers'

    insert = async (user: user) => {
        try {

            await BaseDatabase.connection(this.TABLE_U)
                .insert(user)

            return user
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }


    findUserByEmail = async (email: string) => {
        try {

            const result = await BaseDatabase
                .connection(this.TABLE_U)
                .select('*')
                .where({ email })

            return result.length ? result[0] : null
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}

