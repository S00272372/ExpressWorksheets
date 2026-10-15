import { NotFoundError } from '../errors/NotFoundError';
import { Types } from 'mongoose';
import { CarModel, ICar } from '../models/cars';


export class CarService {
  async getAllCars(): Promise<ICar[]> {
    return CarModel.find().exec();
  }

  async getCarById(id: string): Promise<ICar> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundError(`Car with ID ${id} not found`);
    }

    const car = await CarModel.findById(id).exec();

    if (!car) {
      throw new NotFoundError(`Car with ID ${id} not found`);
    }

    return car;
  }

  async createCar(data: ICar): Promise<ICar> {
    const car = new CarModel(data);
    return car.save();
  }

  async updateCar(
    id: string,
    data: Partial<ICar>
  ): Promise<ICar> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundError(`Car with ID ${id} not found`);
    }

    const car = await CarModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    ).exec();

    if (!car) {
      throw new NotFoundError(`Car with ID ${id} not found`);
    }

    return car;
  }

  async deleteCar(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundError(`Car with ID ${id} not found`);
    }

    const car = await CarModel.findByIdAndDelete(id).exec();

    if (!car) {
      throw new NotFoundError(`Car with ID ${id} not found`);
    }
  }
}
