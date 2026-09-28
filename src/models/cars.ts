import { Schema, model } from 'mongoose';
import { z } from 'zod';

export interface ICar {
  make: string;
  model: string;
  year: number;
}

export const createCarZSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1950),
});

export const updateCarZSchema = z
  .object({
    make: z.string().min(1).optional(),
    model: z.string().min(1).optional(),
    year: z.number().min(1950).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required for update',
  });

const carSchema = new Schema<ICar>(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true, min: 1950 },
  },
  { timestamps: true }
);

export const CarModel = model<ICar>('Car', carSchema);