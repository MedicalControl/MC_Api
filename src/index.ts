import express, {Express, Request, Response} from 'express'
import { PORT } from './config'
const app:Express = express()


app.get('/', (req:Request, res:Response) => {
    res.send('Listen on port 3000')

})


app.listen(PORT, () => {console.log('App workinh on port 3000')})