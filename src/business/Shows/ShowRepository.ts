import { Show } from "../../model/Show"

export interface ShowRepository {
    insertBandShow(show:Show): Promise<void>
}