import Joi from "joi";

export interface Vehicle {
    id: number;
    listing_id: number;
    name: string;
    model_id: number;
    type_id: number;
    description?: string;
    price: number;
    dateOfFirstRegistration: string;
    mileage: number;
    fuelType: 'diesel' | 'benzin' | 'electric' | 'hybrid';
    color: string;
    condition: 'new' | 'used' | 'broken';
}

export const vehicleSchema = Joi.object({
    id: Joi.number().integer().positive().optional(),
    listing_id: Joi.number().positive().optional(),
    name: Joi.string().max(150).required(),
    model_id: Joi.number().integer().positive().required(),
    type_id: Joi.number().integer().positive().required(),
    date_first_registration: Joi.date().iso().required(),
    mileage: Joi.number().integer().min(0).required(),
    fuel_type: Joi.string().valid('diesel', 'benzin', 'electric', 'hybrid').required(),
    color: Joi.string().max(50).optional(),
    condition: Joi.string().valid('new', 'used', 'broken').optional(),
});

export const vehicleQuerySchema = Joi.object({
    category_id: Joi.number().integer().positive().required(),
    price_min: Joi.number().integer().positive().optional(),
    price_max: Joi.number().integer().positive().optional(),
    model_ids: Joi.array().items(Joi.number().integer().positive()).optional(),
    brand_ids: Joi.array().items(Joi.number().integer().positive()).optional(),
    type_ids: Joi.array().items(Joi.number().integer().positive()).optional(),
    date_first_registration_start: Joi.date().optional(),
    date_first_registration_end: Joi.date().optional(),
    mileage_min: Joi.number().integer().min(0).optional(),
    mileage_max: Joi.number().integer().min(0).optional(),
    fuel_types: Joi.array().items(Joi.string().valid('diesel', 'benzin', 'electric', 'hybrid')).optional(),
    colors: Joi.array().items(Joi.string().max(50)).optional(),
    conditions: Joi.array().items(Joi.string().valid('new', 'used', 'broken')).optional()
});