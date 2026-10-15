
import { Router } from 'express';
import { CarController } from '../controllers/cars';
import { authenticateKey } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  createCarZSchema,
  updateCarZSchema,
  carParamsSchema
} from '../models/cars';

const router = Router();
const carController = new CarController();

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: List of cars
 */
router.get('/', carController.getCars);

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Get a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car found
 *       404:
 *         description: Car not found
 */
router.get(
  '/:id',
  validate(carParamsSchema),
  carController.getCarById
);

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create a car
 *     tags: [Cars]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: Car created
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  authenticateKey,
  validate(createCarZSchema),
  carController.createCar
);

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update a car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Car updated
 *       404:
 *         description: Car not found
 */
router.put(
  '/:id',
  validate(carParamsSchema),
  validate(updateCarZSchema),
  carController.updateCar
);

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Car deleted
 *       404:
 *         description: Car not found
 */
router.delete(
  '/:id',
  validate(carParamsSchema),
  carController.deleteCar
);

export default router;
