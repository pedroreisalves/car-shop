import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

export const motorcycleZodSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().gte(1).lte(2500),
}).merge(vehicleZodSchema).strict();

export type IMotorcycle = z.infer<typeof motorcycleZodSchema>;
