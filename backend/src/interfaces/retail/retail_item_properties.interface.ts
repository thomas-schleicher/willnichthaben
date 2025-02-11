import Joi from "joi";

/**
 * Represents further properties of a retail item
 */
export interface RetailItemProperties {
    id?:                        number,
    retail_item_id:             number,
    additional_property_id:     number,
    value:                      string
}

/**
 * Schema to validate further retail item properties on creation / update
 */
export const retailCategoriesPropertiesSchema = Joi.object({
    id:                         Joi.number().positive().optional(),
    retail_item_id:             Joi.number().positive().required(),
    additional_property_id:     Joi.number().positive().required(),
    value:                      Joi.string().required()
});