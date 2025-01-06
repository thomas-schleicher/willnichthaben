import Joi from "joi";

export interface VehicleMark{
    id?: number;
    name: string;
    categoryId: number;
}

export const vehicleMarkSchema = Joi.object({
    id: Joi.number().positive().optional(),
    name: Joi.string().max(100).required(),
    categoryId: Joi.number().positive().required()
});