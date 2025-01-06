import Joi from "joi";

export interface VehicleModel {
    id?: number;
    name: string;
    markId: number;
}

export const vehicleModelSchema = Joi.object({
    id: Joi.number().positive().optional(),
    name: Joi.string().max(100).required(),
    markId: Joi.number().positive().required()
});