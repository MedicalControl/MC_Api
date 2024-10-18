import dotenv from 'dotenv'

dotenv.config({path: '.env'})

export const PORT = process.env.PORT || 4000    
export const JWT_SECRET = process.env.JWT_SECRET!
export const JWT_ROUND = Number(process.env.JWT_ROUND!)
export const API_URL = process.env.API_URL || " "