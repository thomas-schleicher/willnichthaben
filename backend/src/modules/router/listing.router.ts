import { Router } from 'express';
import multer from "multer";
import path from "path";
import fs from "fs";
import listingRepository from '../db/listing.repository';
import authService from '../service/auth.service';
import sessionService from '../service/session.service';

const listingRouter = Router();

listingRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
        res.status(400).json({ message: 'Invalid ID!' });
        return;
    }

    const listing = await listingRepository.getListingByID(parsedId);
    if (!listing) {
        res.status(400).json({ message: 'No such listing!'});
        return;
    }
    res.status(200).json(listing);
});


/****************************
 *                          *
 *      Image Handling      *
 *                          *
 ****************************/


/**
 * Multer configuration for handling file uploads.
 * This sets the destination folder and creates a unique filename for each uploaded file.
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "..", "uploads")); // folder for images (backend/uploads)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // unique file name
    }
});
const upload = multer({ storage });

/**
 * Route handler for uploading an image associated with a listing.
 * 
 * @route POST /:id/images
 * @param {string} id - The listing ID to associate the image with.
 * @access Protected
 * @param {Object} req - Express request object containing the listing id in the params and the image_url in the files.
 * @param {Object} res - Express response object.
 */
listingRouter.post('/:id/images', authService.isAuthenticated, upload.single("image"), async (req, res) => {
    const user_id = sessionService.getSessionUserID(req);

    // check if user is authenticated
    if (!user_id) {
        res.status(500).json({ error: 'Authentication Failed' });
        return;
    }

    const { id } = req.params;
    const image_url = `/uploads/${req.file?.filename}`;

    const parsed_listing_id = parseInt(id, 10);
    if (isNaN(parsed_listing_id)) {
        res.status(400).json({ message: 'Invalid ID!' });
        return;
    }

    try {
        // retrieve the user ID associated with the listing
        const listing_user_uuid = await listingRepository.getUserIDByListingID(parsed_listing_id);
        
        // check if the authenticated user is authorized to delete this listing
        if (listing_user_uuid !== user_id) {
            res.status(403).json({ error: 'You are not authorized to delete this listing' });
            return;
        }

        await listingRepository.createImageForListing(parsed_listing_id, image_url);
        res.status(200).json({ message: 'Image for listing successfully created' });
    } catch(error) {
        res.status(500).json({ error: 'An error occurred while creating the image for listing: ' + error });
        return;
    }
});

export default listingRouter;
