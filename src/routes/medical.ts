import { Router } from "express";
import { attend_appointment, get_appointment, schedule } from "../controllers/appointmet/appointment";
import { medicosMiddleWare } from "../middlewares/admin";
import authMiddleware from '../middlewares/auth';
import { listmedicalRecord } from "../controllers/patient/medicalrecord";


const medicalRoutes: Router = Router()

/**
 * @swagger
 * tags:
 *   name: Medical
 *   description: Gestión de citas médicas y registros médicos
 */

/**
 * @swagger
 * /api/app/appointment:
 *   post:
 *     summary: Programa una nueva cita médica
 *     tags: [Medical]
 *     security:
 *       - apiAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-15"
 *               hora:
 *                 type: string
 *                 example: "14:00:00"
 *               cedula:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Cita programada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "schedule"
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Paciente o Doctor no encontrado
 *       500:
 *         description: Error interno del servidor
 */
medicalRoutes.post('/appointment', [authMiddleware, medicosMiddleWare], schedule);

/**
 * @swagger
 * /api/app/appointment:
 *   get:
 *     summary: Obtiene todas las citas programadas de un médico
 *     tags: [Medical]
 *     security:
 *       - apiAuth: []
 *     responses:
 *       200:
 *         description: Lista de citas del médico
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   estado:
 *                     type: string
 *                     example: "Revisión"
 *                   pk_agendacita:
 *                     type: number
 *                     example: 1
 *                   paciente:
 *                     type: object
 *                     properties:
 *                       nombres:
 *                         type: string
 *                         example: "Juan"
 *                       apellidos:
 *                         type: string
 *                         example: "Pérez"
 *                       nrocedula:
 *                         type: string
 *                         example: "12345678"
 *                       expediente:
 *                         type: object
 *                         properties:
 *                           nroexpediente:
 *                             type: string
 *                             example: "ABC123"
 *       404:
 *         description: Doctor no encontrado
 *       500:
 *         description: Error interno del servidor
 */
medicalRoutes.get('/appointment', [authMiddleware, medicosMiddleWare], get_appointment);

/**
 * @swagger
 * /api/app/attendappointment:
 *   post:
 *     summary: Registra la asistencia a una cita
 *     tags: [Medical]
 *     security:
 *       - apiAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_agendacita:
 *                 type: number
 *                 example: 1
 *               motivo:
 *                 type: string
 *                 example: "Consulta de seguimiento"
 *               sintomas:
 *                 type: string
 *                 example: "Dolor de cabeza"
 *               diagnostico:
 *                 type: string
 *                 example: "Migraña"
 *               indicaciones:
 *                 type: string
 *                 example: "Reposo y analgésicos"
 *     responses:
 *       200:
 *         description: Asistencia registrada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Paciente no encontrado
 *       500:
 *         description: Error interno del servidor
 */
medicalRoutes.post('/attendappointment', [authMiddleware, medicosMiddleWare], attend_appointment);

/**
 * @swagger
 * /api/app/medicalRecord:
 *   get:
 *     summary: Lista el registro médico de los pacientes
 *     tags: [Medical]
 *     security:
 *       - apiAuth: []
 *     responses:
 *       200:
 *         description: Registro médico listado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombres:
 *                     type: string
 *                     example: "Carlos"
 *                   apellidos:
 *                     type: string
 *                     example: "Martínez"
 *                   nrocedula:
 *                     type: string
 *                     example: "87654321"
 *                   nroexpediente:
 *                     type: string
 *                     example: "DEF456"
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error interno del servidor
 */
medicalRoutes.get('/medicalRecord', [authMiddleware, medicosMiddleWare], listmedicalRecord);

export default medicalRoutes;