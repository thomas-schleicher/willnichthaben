import Joi from "joi";

export interface VehicleCategory {
    id?: number;
    name: string;
}

export const vehicleTypeSchema = Joi.object({
    id: Joi.number().positive().optional(),
    name: Joi.string().max(50).required(),
});