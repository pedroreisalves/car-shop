import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

export const carZodSchema = z.object({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
}).merge(vehicleZodSchema).strict();

export type ICar = z.infer<typeof carZodSchema>;
