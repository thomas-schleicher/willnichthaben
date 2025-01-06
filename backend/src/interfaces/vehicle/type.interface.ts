import Joi from "joi";

export interface VehicleType {
    id?: number;
    name: string;
    categoryId: number;
}

export const vehicleTypeSchema = Joi.object({
    id: Joi.number().positive().optional(),
    name: Joi.string().max(50).required(),
    categoryId: Joi.number().positive().required()
});