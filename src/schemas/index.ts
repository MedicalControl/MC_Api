import {date, z} from 'zod'


const dateSchema = z.string().superRefine((value, ctx) => {
    if (isNaN(Date.parse(value))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid date format',
      });
    }
  });

export const signUpSchemaMedicalToPatiente = z.object({
    nombres: z.string().max(50),
    apellidos: z.string(), 
    direccion: z.string().max(100),
    telefono: z.string().max(8),
    sexo: z.boolean(), 
    fechanacimiento: z.string(),
    ocupacion: z.string().max(20),
    nrocedula: z.string().max(30).optional(),
    correo: z.string().email().max(30).optional(),
    contraseña: z.string().min(6).max(20).optional(), 
    religion: z.string().max(20),
    escolaridad: z.string().max(20),
    estadocivil: z.string().max(20),
    nombremad: z.string().max(50).optional(),
    nombrepad: z.string().max(50).optional(),
})
 
export const signUpSchema = z.object({
  nombres: z.string().max(50),
  apellidos: z.string().max(50), 
  direccion: z.string().max(100),
  telefono: z.string().max(8),
  sexo: z.boolean(), 
  fechanacimiento: z.string(),
  ocupacion: z.string().max(20),
  nrocedula: z.string().max(30),
  correo: z.string().email().max(30),
  contraseña: z.string().min(6).max(20), 
  religion: z.string().max(20),
  escolaridad: z.string().max(20),
  estadocivil: z.string().max(20),
  nombremad: z.string().max(50).optional(),
  nombrepad: z.string().max(50).optional(),
})

export const signupMedicalSchema = z.object({
  name: z.string(), 
  lastname: z.string(),
  healthunitid: z.number(), 
  specialityid: z.number(),
  email: z.string().email(), 
  password: z.string().min(6), 
})
export const consultationSchema = z.object({
  plan: z.string(), 
  reasonsConsultation: z.string(), 
  medicalRecordId: z.number()
})