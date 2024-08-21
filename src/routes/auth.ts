import {Router} from 'express'
import {login} from '../controllers/auth.ts'

const authRoutes:Router = Router()

authRoutes.get('/login', login)