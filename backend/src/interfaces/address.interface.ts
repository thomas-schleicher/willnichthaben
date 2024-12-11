import Joi from "joi";

export interface Address {
    id?: string,
    postal_code: string,
    city: string,
    street_address: string,
}

export const addressShema = Joi.object({
    id: Joi.string().uuid(),
    postal_code: Joi.string().required(),
    city: Joi.string().required(),
    street_address: Joi.string().required(),
});