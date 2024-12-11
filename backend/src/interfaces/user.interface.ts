import Joi from "joi";

export interface User {
    id?: string,
    email: string,
    password: string,
    address_id?: string,
}

export const userShema = Joi.object({
    id: Joi.string().uuid(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    address_id: Joi.string().uuid(),
});

