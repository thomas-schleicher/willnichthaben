import Joi from "joi";

/**
 * Represents a category of a retail item
 */
export interface RetailCategory {
    id?:        number;
    name:       string;
}

/**
 * Schema to validate a retail item category on creation / update
 */
export const retailCategorySchema = Joi.object({
    id:         Joi.number().positive().optional(),
    name:       Joi.string().max(50).required(),
});