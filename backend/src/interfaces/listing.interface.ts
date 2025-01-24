import Joi from "joi";

export interface Listing {
    id?: number;
    seller_id: string;
    type: 'retail' | 'property' | 'vehicle';
    title: string;
    description: string;
    price: number;
    is_sold: boolean;
    created_at?: string;
}

export const listingSchema = Joi.object({
    id: Joi.number().integer().positive().optional(),
    seller_id: Joi.string().uuid().required(),
    type: Joi.string().valid('retail', 'property', 'vehicle').required(),
    title: Joi.string().max(255).default(""),
    description: Joi.string().default("No additional infromation availible."),
    price: Joi.number().precision(2).required(),
    is_sold: Joi.boolean().default(false),
    created_at: Joi.string().optional(),
});

export interface ListingImage {
    id?: number;
    listingID: number;
    image_url: string;
}

export const listingImageShema = Joi.object({
    id: Joi.number().integer().positive().optional(),
    listingID: Joi.number().integer().positive().required(),
    image_url: Joi.string().max(255).required(),
});