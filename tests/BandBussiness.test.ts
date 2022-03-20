import { BandBusiness } from "../src/business/Bands/BandBusiness"
import { BandDatabase } from "../src/data/BandDatabase"

const bandBusiness = new BandBusiness(
    new BandDatabase()
)

describe('teste InsertBandOnFestival', () => {
    test('Erro ao não inserir informações necessárias', async () => {
        expect.assertions(1)
        try {
            await bandBusiness.insertNewBandTest(
                {
                    name: "banda 01",
                    music_genre: "",
                    responsible: "Pedro"
                }, 
                "12345"
            )
        } catch (e: any) {
            expect(e.message).toEqual('Ausência de parâmetros. Preencha os devidos campos.')
        }
    })
})

describe('teste InsertBandOnFestival', () => {
    test('Sucesso ao enviar informações', async () => {
       
        try {
            const insertedBand = await bandBusiness.insertNewBandTest(
                {
                    name: "banda 01",
                    music_genre: "rock",
                    responsible: "Pedro"
                }, 
                "12345"
            )

            expect(insertedBand).toEqual('Cadastro realizado com sucesso!')
        } catch (e: any) {
            console.log(e)
        }
    })
})

