import Joi from "joi";

/**
 * Represents a retail item
 */
export interface RetailItem {
    id?: number,
    listing_id: number,
    name: string,
    category_id: number,
    description?: string,
    price?: number
    delivery_options: 'only pick up' | 'only delivery' | 'pick up or delivery',
    condition: 'new' | 'used' | 'broken'
}

/**
 * Schema to validate a retail item on creation / update
 */
export const retailSchema = Joi.object({
    id: Joi.number().integer().positive().optional(),
    listing_id: Joi.number().positive().optional(),
    name: Joi.string().max(100).required(),
    category_id: Joi.number().positive().required(),
    delivery_options: Joi.string().valid('only pick up', 'only delivery', 'pick up or delivery').required(),
    condition: Joi.string().valid('new', 'used', 'broken').required()
});

/**
 * Schema to validate search filters on retail items
 */
export const retailQuerySchema = Joi.object({
    category_id: Joi.number().integer().positive().required(),
    price_min: Joi.number().integer().positive().optional(),
    price_max: Joi.number().integer().positive().optional(),
    delivery_options: Joi.string().valid('only pick up', 'only delivery', 'pick up or delivery').optional(),
    conditions: Joi.alternatives().try(
        Joi.array().items(Joi.string().valid('new', 'used', 'broken')),
        Joi.string().valid('new', 'used', 'broken')
    ).optional().custom((value) => {
        if (typeof value === 'string') {
            return [value];
        }
        return value;
    })
});