import Joi from "joi";

export interface Chat {
    id?: number;
    listing_id: number;
    user1_id: string;
    user2_id: string;
    created_at?: Date;
}

export interface ChatMessage {
    chat_id: number;
    sender_id: string;
    message: string;
    created_at?: Date;
}

export const chatSchema = Joi.object({
    listing_id: Joi.number().required(),
    user1_id: Joi.string().uuid().required(),
    user2_id: Joi.string().uuid().required(),
    created_at: Joi.date().optional()
});

export const chatMessageSchema = Joi.object({
    chat_id: Joi.number().required(),
    sender_id: Joi.string().uuid().required(),
    message: Joi.string().min(1).max(500).required(),
    created_at: Joi.date().optional()
});
