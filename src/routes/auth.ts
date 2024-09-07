import { Router } from 'express'
import { login, signup, me } from '../controllers/auth'
import { errorHandler } from '../error-handler'
import authMiddleware from '../middlewares/auth'


const authRoutes: Router = Router()

authRoutes.post('/signup', errorHandler(signup))
authRoutes.post('/login', errorHandler(login))
authRoutes.get('/me', [authMiddleware], errorHandler(me))

export default authRoutes

/**
 * @swagger
 * /api/signup/{district}:
 *   get:
 *     summary: List of medicine
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - Register
 *     parameters: 
 *      - in: path
 *        name: district
 *        required: true
 *        description: Id of district from department
 *        schema: 
 *          type: number
 *     responses:
 *       200:
 *         description: Get district OK
 *       401:
 *         description: No auth
 *       400: 
 *         description: Error in validation
 *       404: 
 *         description: No such district 
 *       500:
 *         description: Error
 */
