import Joi from "joi";

/**
 * Represents further properties of a category of a retail item
 */
export interface RetailCategoriesProperties {
    id?:                number,
    name:               string,
    category_id:        number,
    property_type?:     'text' | 'boolean'
}

/**
 * Schema to validate further retail item categories properties on creation / update
 */
export const retailCategoriesPropertiesSchema = Joi.object({
    id:                 Joi.number().positive().optional(),
    name:               Joi.string().max(50).required(),
    category_id:        Joi.number().positive().required(),
    property_type:      Joi.string().valid('text', 'boolean').optional()
});