import { ShowBusiness } from "../src/business/Shows/ShowBusiness"
import { ShowDatabase } from "../src/data/ShowDatabase"

const showBusiness = new ShowBusiness(
    new ShowDatabase()
)

describe('teste InsertBandShow', () => {
    test('Erro ao não inserir informações incorretas', async () => {
        expect.assertions(1)
        try {
            await showBusiness.insertBandShowTest(
                {
                    week_day: 'terça',
                    start_time: 12,
                    end_time: 13,
                    band_id: '1234'
                }
            )
        } catch (e: any) {
            expect(e.message).toEqual('Adicione dias válidos.')
        }
    })
})

describe('teste InsertBandShow', () => {
    test('Erro ao não inserir informações duplicadas', async () => {
        expect.assertions(1)
        try {
            await showBusiness.insertBandShowTest(
                {
                    week_day: 'Domingo',
                    start_time: 22,
                    end_time: 23,
                    band_id: '1234'
                }
            )
        } catch (e: any) {
            expect(e.message).toEqual('Esta data já foi preenchida')
        }
    })
})