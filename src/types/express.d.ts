import { User } from '@prisma/client';
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Ajusta el tipo según sea necesario
    }
  }
}