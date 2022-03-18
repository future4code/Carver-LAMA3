import { BandBussiness } from "./business/Bands/BandBusiness";
import { app } from "./controller/app";
import { BandController } from "./controller/BandController";
import { UserController } from "./controller/UserController";
import { BandDatabase } from "./data/BandDatabase";

const userController = new UserController()
const bandController = new BandController(
    new BandBussiness(
        new BandDatabase()
    )
)

app.post('/users/signup', userController.signup)
app.post('/users/login', userController.login)


app.get('/band/detail', bandController.getBandDetails)
app.post('/band/register', bandController.insertNewBand)



