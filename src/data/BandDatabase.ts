import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";
import { BandRepository } from "../business/Bands/BandRepository";
import { authenticationData } from "../model/User";

export class BandDatabase extends BaseDatabase implements BandRepository {
    protected tableBandFest = 'festBandas'
    protected tableUserFest = 'festUsers'

    insertBand = async (band:Band) => {
        try {
            
            await BaseDatabase.connection(this.tableBandFest)
            .insert(band)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    validateUserRole = async (id:authenticationData) => {
        try{

            const infoById = await BaseDatabase.connection(this.tableUserFest)
            .select('*')
            .where(id)

            if(infoById[0].role === 'ADMIN'){
                return true
            }

            return false
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    validateBandOnFest = async (name:string) => {
        try{

            const infoByName = await BaseDatabase.connection(this.tableBandFest)
            .select('*')
            .where({name})

            if(infoByName){
                return true
            }

            return false
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    getBandDetails = async (query: string) => {
        try {

            const result = await BaseDatabase.connection(this.tableBandFest)
            .select('*')
            .where('id', query)
            .orWhere('name', 'like', `%${query}%`)

            return result[0]
            
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }


}