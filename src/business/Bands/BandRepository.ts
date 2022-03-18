import { Band } from "../../model/Band"

export interface BandRepository {
    insertBand(band: Band): Promise<void>
}