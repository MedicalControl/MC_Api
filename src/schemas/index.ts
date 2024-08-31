import {z} from 'zod'


export const SignUpSchema = z.object({
    name: z.string(),
    lastname: z.string(), 
    address: z.string(), 
    number: z.string().max(8),
    bloodType: z.string().max(3), 
    placeBirth: z.string(),
    proffession: z.string(),
    identityCard: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})
