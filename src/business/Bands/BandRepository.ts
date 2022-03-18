import { Band } from "../../model/Band"

export interface BandRepository {
    insertBand(band: Band): Promise<void>
    getBandDetails(input: string): Promise<Band>
}