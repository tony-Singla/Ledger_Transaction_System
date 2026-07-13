import {app} from './src/app.js'
import dotenv from 'dotenv'
import {connectdb} from './src/config/db.js'

dotenv.config();

app.listen(3000,() => {
    console.log("The server has started and is running on port 3000")
})
connectdb()