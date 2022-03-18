import { BandDatabase } from "../../data/BandDatabase";
import { Band, BandInputDTO  } from "../../model/Band";
import Authenticator from "../../services/Authenticator";
import IdGenerator from "../../services/IdGenerator";

export class BandBussiness {
    constructor(
        private bandDatabase:BandDatabase
    ){}

    insertNewBand = async (input:BandInputDTO, token:string): Promise<void> => {
        const {
            name, 
            music_genre,
            responsible
        } = input
        

        if (!name || !music_genre || !responsible) {
            throw new Error('Ausência de parâmetros. Preencha os devidos campos.')
        }

        //generate id
        const id = IdGenerator.generateId()

        //verify user role
        const getUserId =  Authenticator.getTokenData(token)
        const verifyUserRole = await this.bandDatabase.validateUserRole(getUserId)

        if(!verifyUserRole) {
            throw new Error('Sua conta não possui este tipo de permissão!')
        }

        //verify duplicate name
        const bandName = await this.bandDatabase.validateBandOnFest(name)

        if(bandName) {
            throw new Error('Esta banda já esta cadastrada no Festival.')
        }

        //input model bank
        const newBandInserted:Band = {
            id: id,
            name: name,
            music_genre: music_genre,
            responsible: responsible
        }

        //input to bank
        await this.bandDatabase.insertBand(newBandInserted)

    }

}
