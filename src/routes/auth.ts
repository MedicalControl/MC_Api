import { Router } from 'express'
import { login, signup, me, medical_create } from '../controllers/auth'
import { errorHandler } from '../error-handler'
import authMiddleware from '../middlewares/auth'


const authRoutes: Router = Router()


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicio de sesión de un usuario
 *     description: Autentica a un usuario existente y genera un token JWT.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: usuario@ejemplo.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: contraseña123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT generado para el usuario autenticado.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Error en la solicitud. Contraseña incorrecta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: "Incorrect password!"
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: "User not found"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error del servidor.
 *                   example: "Error al iniciar sesión."
 */
authRoutes.post('/login', errorHandler(login))

authRoutes.get('/me', [authMiddleware], errorHandler(me))

export default authRoutes

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Registro de un nuevo paciente
 *     description: Registra un nuevo paciente en el sistema con los datos proporcionados en el cuerpo de la solicitud.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: usuario@ejemplo.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: contraseña123
 *               name:
 *                 type: string
 *                 description: Nombre del usuario.
 *                 example: Juan
 *               lastname:
 *                 type: string
 *                 description: Apellido del usuario.
 *                 example: Pérez
 *               address:
 *                 type: string
 *                 description: Dirección del usuario.
 *                 example: Calle Falsa 123
 *               ocupation:
 *                 type: string
 *                 description: Ocupación del usuario.
 *                 example: Ingeniero
 *               bloodType:
 *                 type: string
 *                 description: Tipo de sangre del usuario.
 *                 example: O+
 *               idCard:
 *                 type: string
 *                 description: Número de identificación del usuario.
 *                 example: 123456789
 *               number:
 *                 type: string
 *                 description: Número de teléfono del usuario.
 *                 example: +50512345678
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del usuario.
 *                 example: 1990-01-01
 *               inssnumber:
 *                 type: string
 *                 description: Número INSS del usuario.
 *                 example: 987654321
 *               sex:
 *                 type: string
 *                 description: Sexo del usuario.
 *                 example: M
 *               districtid:
 *                 type: number
 *                 description: ID del distrito al que pertenece el usuario.
 *                 example: 1
 *               municipalityid:
 *                 type: number
 *                 description: ID del municipio al que pertenece el usuario.
 *                 example: 1
 *               healthunitid:
 *                 type: number
 *                 description: ID de la unidad de salud a la que pertenece el usuario.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Registro exitoso del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID del paciente registrado.
 *                   example: 1
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del paciente registrado.
 *                   example: usuario@ejemplo.com
 *                 name:
 *                   type: string
 *                   description: Nombre del paciente registrado.
 *                   example: Juan
 *       400:
 *         description: Error de validación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: "User already exists!"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error del servidor.
 *                   example: "Error al registrar el usuario."
 */
authRoutes.post('/signup', errorHandler(signup))


authRoutes.post('medical/signup', errorHandler(medical_create))