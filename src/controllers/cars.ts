import { Request, Response } from 'express';
import { CarService } from '../services/cars';

const carService = new CarService();

export class CarController {
  getCars = async (_req: Request, res: Response): Promise<void> => {
    const cars = await carService.getAllCars();
    res.status(200).json(cars);
  };

  getCarById = async (req: Request, res: Response): Promise<void> => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const car = await carService.getCarById(id);
    res.status(200).json(car);
  };

  createCar = async (req: Request, res: Response): Promise<void> => {
    const car = await carService.createCar(req.body);
    res.status(201).json(car);
  };

  updateCar = async (req: Request, res: Response): Promise<void> => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const car = await carService.updateCar(id, req.body);
    res.status(200).json(car);
  };

  deleteCar = async (req: Request, res: Response): Promise<void> => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await carService.deleteCar(id);
    res.status(204).send();
  };
}
