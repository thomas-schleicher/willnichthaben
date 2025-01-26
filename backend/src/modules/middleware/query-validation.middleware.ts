import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";

export function validateQuery(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error, value } = schema.validate(req.query);

        if (error) {
            res.status(400).json({
                error: 'Invalid query parameters',
                details: error.details.map((err) => err.message),
            });
            return;
        }

        next();
    }
}
