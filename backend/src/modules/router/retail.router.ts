import { Router } from "express";

import authService from '../service/auth.service';
import sessionService from '../service/session.service';
import retailRepository from "../db/retail.repository";

const retailRouter = Router();

/**
 * Route to create a new retail listing.
 * 
 * Requires authentication and retrieves the user's ID from the session.
 * If authentication fails, it returns a 500 error.
 * Otherwise, it attempts to create a new retail listing and returns a success message.
 * 
 * @route POST /
 * @access Protected (Requires authentication)
 * @param {Object} req - Express request object containing the listing data in the body.
 * @param {Object} res - Express response object.
 */
retailRouter.post('/', authService.isAuthenticated, async (req, res) => {
    const userID = sessionService.getSessionUserID(req);
    if (!userID) {
        res.status(500).json({ error: 'Authentication Failed' });
        return;
    }

    try {
        await retailRepository.createRetailListing(req.body, userID);
        res.status(200).json({ message: 'Retail item listing created successfully' });
    } catch(error) {
        res.status(500).json({ error: 'An error occurred while creating the retail item listing: ' + error});
        return;
    }
});

export default retailRouter;