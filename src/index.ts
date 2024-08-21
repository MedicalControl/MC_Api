import express, {Express, Request, Response} from 'express'

const app:Express = express()


app.get('/', (req:Request, res:Response) => {
    res.send('Listen on port 3000')

})


app.listen(3000, () => {console.log('App workinh on port 3000')})