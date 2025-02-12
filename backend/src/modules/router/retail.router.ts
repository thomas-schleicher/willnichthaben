import { Router } from "express";

import authService from '../service/auth.service';
import sessionService from '../service/session.service';
import retailRepository from "../db/retail.repository";
import listingRepository from '../db/listing.repository';

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
    const user_id = sessionService.getSessionUserID(req);

    // check if user is authenticated
    if (!user_id) {
        res.status(500).json({ error: 'Authentication Failed' });
        return;
    }

    try {
        await retailRepository.createRetailListing(req.body, user_id);
        res.status(200).json({ message: 'Retail item listing created successfully' });
    } catch(error) {
        res.status(500).json({ error: 'An error occurred while creating the retail item listing: ' + error});
        return;
    }
});

/**
 * Route to update a retail listing.
 * 
 * Requires authentication and retrieves the user's ID from the session.
 * If authentication fails, it returns a 500 error.
 * 
 * It verifies if the authenticated user is the owner of the listing before allowing the update.
 * If verification fails, it returns a 403 error.
 * 
 * Otherwise, it attempts to update a retail listing and returns a success message.
 * 
 * @route PUT /
 * @access Protected (Requires authentication)
 * @param {Object} req - Express request object containing updated listing data in the body.
 * @param {Object} res - Express response object.
 */
retailRouter.put('/', authService.isAuthenticated, async (req, res) => {
    const user_id = sessionService.getSessionUserID(req);

    // check if user is authenticated
    if (!user_id) {
        res.status(500).json({ error: 'Authentication Failed' });
        return;
    }

    const { listing_id } = req.body;
    const parsed_listing_id = parseInt(listing_id, 10);

    if (isNaN(listing_id)) {
        res.status(400).json({ message: 'Invalid ID!' });
        return;
    }

    try {
        // retrieve the user ID associated with the listing
        const listing_user_uuid = await listingRepository.getUserIDByListingID(parsed_listing_id);

        // check if the authenticated user is authorized to update this listing
        if (listing_user_uuid !== user_id) {
            res.status(403).json({ error: 'You are not authorized to modify this listing' });
            return;
        }
    
        await retailRepository.updateRetailListing(req.body, user_id, listing_id);
        res.status(200).json({ message: 'Retail item listing updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the retail item listing: ' + error });
        return;
    }
});

export default retailRouter;