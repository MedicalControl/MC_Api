import {z} from 'zod'


const dateSchema = z.string().superRefine((value, ctx) => {
    if (isNaN(Date.parse(value))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid date format',
      });
    }
  });

export const signUpSchema = z.object({
    name: z.string(),
    lastname: z.string(), 
    address: z.string(), 
    number: z.string().max(8),
    bloodType: z.string().max(3), 
    birthDate: dateSchema,
    ocupation: z.string(),
    idCard: z.string(),
    email: z.string().email(),
    password: z.string().min(6), 
    inssnumber: z.string(), 
    municipalityid: z.number(), 
    districtid: z.number()
})
 

export const consultationSchema = z.object({
  plan: z.string(), 
  reasonsConsultation: z.string(), 
  medicalRecordId: z.number()
})