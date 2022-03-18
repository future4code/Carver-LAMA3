import { Request, Response } from "express";
import { BandBussiness } from "../business/Bands/BandBusiness";
import { BandInputDTO } from "../model/Band";

export class BandController {
    constructor(
        private bandBussiness:BandBussiness
    ){}   

    insertNewBand = async (req:Request, res:Response) => {
        const token:string = req.headers.authorization as string
        const {
            name, 
            music_genre,
            responsible
        } = req.body

        //input model 
        const input: BandInputDTO = {
            name, 
            music_genre,
            responsible
        }

        try {

            //adding input req 
            await this.bandBussiness.insertNewBand(input, token)

            res.status(201).send('Cadastro realizado com sucesso!')

        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send('Erro ao realizar cadastro.')
        }

    }
}