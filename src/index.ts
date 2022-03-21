import { BandBusiness } from "./business/Bands/BandBusiness";
import { ShowBusiness } from "./business/Shows/ShowBusiness";
import { app } from "./controller/app";
import { BandController } from "./controller/BandController";
import { ShowController } from "./controller/ShowController";
import { UserController } from "./controller/UserController";
import { BandDatabase } from "./data/BandDatabase";
import { ShowDatabase } from "./data/ShowDatabase";

const userController = new UserController()
const bandController = new BandController(
    new BandBusiness(
        new BandDatabase()
    )
)
const showController = new ShowController(
    new ShowBusiness(
        new ShowDatabase()
    )
)

app.post('/users/signup', userController.signup)
app.post('/users/login', userController.login)


app.get('/band/detail', bandController.getBandDetails)
app.post('/band/register', bandController.insertNewBand)

app.get('/show/lineup', showController.findShowByWeekDay)
app.post('/show/register', showController.insertBandShow)



