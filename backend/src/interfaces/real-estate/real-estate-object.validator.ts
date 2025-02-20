import Joi from "joi";

// Schema for the address object.
const addressSchema = Joi.object({
    province: Joi.string().max(50).required(),
    city: Joi.string().max(50).required(),
    postalCode: Joi.string().max(20).required(),
    streetAddress: Joi.string().max(255).required()
});

// Main schema for a full real estate listing.
export const realEstateListingSchema = Joi.object({
    id: Joi.number().integer().positive().optional(),
    listing_id: Joi.number().integer().positive().required(),
    name: Joi.string().max(100).required(),
    description: Joi.string().optional(),
    topLevelCategory: Joi.string().valid('houses', 'rooms/apartments').required(),
    type: Joi.string().max(50).required(),
    address: addressSchema.required(),
    price_per_month: Joi.number().positive().precision(2).required(),
    renting_period: Joi.string().max(50).required(),
    advance_payment: Joi.number().positive().precision(2).optional(),
    immediate_availability: Joi.boolean().required(),
    owner_id: Joi.number().integer().positive().required(),
    status: Joi.string().valid('open', 'rented').optional(),
    // Merged additional properties:
    balcony: Joi.boolean().optional(),
    balcony_size: Joi.number().positive().optional(),
    garden: Joi.boolean().optional(),
    parking: Joi.boolean().optional(),
    storage_room: Joi.boolean().optional(),
    land_plot_size: Joi.number().positive().optional(),
    num_floors: Joi.number().positive().optional(),
    living_area: Joi.number().positive().optional(),
    room_count: Joi.number().integer().positive().optional(),
    availability: Joi.date().optional(),
    term_type: Joi.string().max(50).optional(),
    kitchen: Joi.boolean().optional(),
    cellar: Joi.boolean().optional()
});

// Helper: Accepts either a single value or an array of values.
const arrayOrSingle = (schema: Joi.Schema) =>
    Joi.alternatives()
        .try(Joi.array().items(schema), schema)
        .custom((value) => (Array.isArray(value) ? value : [value]));

// Schema for query parameters. We now include filters for the merged additional properties.
export const realEstateQuerySchema = Joi.object({
    topLevelCategory: Joi.string().valid('houses', 'rooms/apartments').optional(),
    type_ids: arrayOrSingle(Joi.number().integer().positive()).optional(),
    listing_id: Joi.number().integer().positive(),
    province_id: Joi.number().integer().positive().optional(),
    city_ids: arrayOrSingle(Joi.number().integer().positive()).optional(),
    price_min: Joi.number().positive().optional(),
    price_max: Joi.number().positive().optional(),
    renting_period: Joi.string().max(50).optional(),
    immediate_availability: Joi.boolean().optional(),
    living_area_min: Joi.number().positive().optional(),
    living_area_max: Joi.number().positive().optional(),
    room_count_min: Joi.number().integer().positive().optional(),
    room_count_max: Joi.number().integer().positive().optional(),
    // Merged additional properties filters (all optional)
    balcony: Joi.boolean().optional(),
    balcony_size_min: Joi.number().positive().optional(),
    balcony_size_max: Joi.number().positive().optional(),
    garden: Joi.boolean().optional(),
    parking: Joi.boolean().optional(),
    storage_room: Joi.boolean().optional(),
    land_plot_size_min: Joi.number().positive().optional(),
    land_plot_size_max: Joi.number().positive().optional(),
    num_floors: Joi.number().positive().optional(),
    kitchen: Joi.boolean().optional(),
    cellar: Joi.boolean().optional(),
    postal_code: Joi.string().optional()
});