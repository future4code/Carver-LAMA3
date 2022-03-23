import { Request, Response } from "express";
import { BandBusiness } from "../business/Bands/BandBusiness";
import { BandInputDTO } from "../model/Band";

export class BandController {
    constructor(
        private bandBussiness:BandBusiness
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

    getBandDetails = async (req:Request, res:Response) => {
        const token = req.headers.authorization as string
        const id = req.query.id as string
        const name = req.query.name as string

        try {

            const band = await this.bandBussiness.getBandDetails(id, name, token)

            res.status(200).send({result: band})

        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send('Erro ao pegar detalhes de banda.')
        }
    }
}