import Joi from "joi";

export interface User {
    id?: string,
    email: string,
    password: string,
    address_id?: string,
}

export const userIDShema = Joi.string().uuid();

export const passwordShema = Joi.string().min(8).required(); 

export const userShema = Joi.object({
    id: userIDShema,
    email: Joi.string().email().required(),
    password: passwordShema,
    address_id: Joi.string().uuid(),
});