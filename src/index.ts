// src/index.ts
import express, { Express } from 'express';
import { PORT } from './config';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/errors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './documentation/swagger';
import main from './use.example';

const app: Express = express();

app.use(express.json());

app.use('/api', rootRouter);

export const prismaClient = new PrismaClient({
    log: ['query'],
});

app.use(errorMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
    console.log(`App working on port ${PORT}`);
});
