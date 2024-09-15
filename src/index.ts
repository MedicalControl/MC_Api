import express, {Express, Request, Response} from 'express'
import { PORT } from './config'
import rootRouter from './routes'
import { PrismaClient } from '@prisma/client'
import { errrorMidleware } from './middlewares/errors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './documentation/swagger'
import { seed } from './seed/seed'
const app:Express = express()

app.use(express.json())

app.use('/api', rootRouter)

export const prismaClient = new PrismaClient({
    log:['query']
})

app.use(errrorMidleware)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.listen(PORT, () => {console.log('App workinh on port 3000')})
seed()