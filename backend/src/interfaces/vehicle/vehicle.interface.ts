import Joi from "joi";

export interface Vehicle {
    id: number;
    sellerId: string;
    name: string;
    modelId: number;
    typeId: number;
    description?: string;
    price: number;
    dateOfFirstRegistration: string;
    mileage: number;
    fuelType: 'diesel' | 'benzin' | 'electric' | 'hybrid';
    color: string;
    condition: 'new' | 'used' | 'broken';
    isSold: boolean;
    createdAt: string;
}

export const vehicleSchema = Joi.object({
    id: Joi.number().integer().positive(),
    sellerId: Joi.string().uuid().required(),
    name: Joi.string().max(150).required(),
    modelId: Joi.number().integer().positive().required(),
    typeId: Joi.number().integer().positive().required(),
    description: Joi.string().optional(),
    price: Joi.number().precision(2).positive().required(),
    dateOfFirstRegistration: Joi.date().iso().required(),
    mileage: Joi.number().integer().min(0).required(),
    fuelType: Joi.string().valid('diesel', 'benzin', 'electric', 'hybrid').required(),
    color: Joi.string().max(50).optional(),
    condition: Joi.string().valid('new', 'used', 'broken').optional(),
    isSold: Joi.boolean().default(false),
    createdAt: Joi.date().iso().default(() => new Date().toISOString()),
});