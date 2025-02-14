import Joi from "joi";

export interface Chat {
    id: number;
    listing_id: number;
    listing_title: string;
    listing_description?: string;
    user1_id: string;
    user2_id: string;
    created_at: string;
}

export interface ChatMessage {
    id: number;
    chat_id: number;
    sender_id: string;
    message: string;
    created_at: string;
}

export const chatSchema = Joi.object({
    listing_id: Joi.number().required(),
    listing_title: Joi.string().min(1).max(100).required(),
    listing_description: Joi.string().min(1).max(500).optional(),
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
