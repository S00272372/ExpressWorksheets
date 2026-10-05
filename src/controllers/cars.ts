import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { CarService } from '../services/cars';
import { createCarZSchema, updateCarZSchema } from '../models/cars';

const carService = new CarService();

export class CarController {
  getCars = async (_req: Request, res: Response): Promise<void> => {
    try {
      const cars = await carService.getAllCars();
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cars', error });
    }
  };

  getCarById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const car = await carService.getCarById(id);
      if (!car) {
        res.status(404).json({ message: 'Car not found' });
        return;
      }
      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching car', error });
    }
  };

  createCar = async (req: Request, res: Response): Promise<void> => {
    const validation = createCarZSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({ message: 'Invalid car data', errors: validation.error.issues });
      return;
    }

    try {
      const newCar = await carService.createCar(validation.data);
      res.status(201).json(newCar);
    } catch (error) {
      res.status(500).json({ message: 'Error inserting into MongoDB', error });
    }
  };

  updateCar = async (req: Request, res: Response): Promise<void> => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const validation = updateCarZSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({ message: 'Invalid car data', errors: validation.error.issues });
      return;
    }

    try {
      const updatedCar = await carService.updateCar(id, validation.data);
      if (!updatedCar) {
        res.status(404).json({ message: 'Car not found' });
        return;
      }
      res.status(200).json(updatedCar);
    } catch (error) {
      res.status(500).json({ message: 'Error updating car', error });
    }
  };

  
  deleteCar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

      if (!id || !Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid car ID' });
        return;
      }

      const deleted = await carService.deleteCar(id);
      if (!deleted) {
        res.status(404).json({ message: 'Car not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting car', error });
    }
  };

}

export default new CarController();
/**
 * @openapi
 * /cars:
 *   get:
 *     summary: Retrieve all cars
 *     tags:
 *       - Cars
 *     responses:
 *       200:
 *         description: Successfully retrieved cars
 *       500:
 *         description: Internal server error
 */
  /**
* @openapi
* /cars/{id}:
*   get:
*     summary: Get a car by ID
*     tags:
*       - Cars
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
*       500:
*         description: Internal server error
*/
/**
   * @openapi
   * /cars/{id}:
   *   delete:
   *     summary: Delete a car by ID
   *     tags:
   *       - Cars
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Car deleted successfully
   *       400:
   *         description: Invalid car ID
   *       404:
   *         description: Car not found
   *       500:
   *         description: Internal server error
   */ 
/**
 * @openapi
 * /cars:
 *   post:
 *     summary: Create a new car
 *     tags:
 *       - Cars
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCarInput'
 *     responses:
 *       201:
 *         description: Successfully created car
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
