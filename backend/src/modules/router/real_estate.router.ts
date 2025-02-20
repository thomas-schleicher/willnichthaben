import { Router } from 'express';
import { validateQuery } from '../middleware/query-validation.middleware';
import RealEstateRepository from '../db/real_estate.repository';
import { realEstateQuerySchema } from '../../interfaces/real-estate/real-estate-object.validator';
import authService from '../service/auth.service';
import sessionService from '../service/session.service';
import listingRepository from '../db/listing.repository';

const realEstateRouter = Router();

realEstateRouter.get('/', validateQuery(realEstateQuerySchema), async (req, res) => {
    try {
        const filters = req.query;
        const listings = await RealEstateRepository.getRealEstateObjects(filters);
        res.json({ listings });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching real estate listings.' });
    }
});

realEstateRouter.get('/types', async (req, res) => {
    try {
        const { top_level_category_id } = req.query;
        const types = await RealEstateRepository.getTypes(
            top_level_category_id ? parseInt(top_level_category_id as string) : undefined
        );
        res.json({ types });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching property types.' });
    }
});

realEstateRouter.get('/cities', async (req, res) => {
    try {
        const { province_id } = req.query;
        const cities = await RealEstateRepository.getCities(
            province_id ? parseInt(province_id as string) : undefined
        );
        res.json({ cities });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching cities.' });
    }
});

realEstateRouter.get('/provinces', async (req, res) => {
    try {
        const provinces = await RealEstateRepository.getProvinces();
        res.json({ provinces });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching provinces.' });
    }
});

realEstateRouter.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID format' });
            return;
        }

        const listing = await RealEstateRepository.getRealEstateObjects({ id });
        if (!listing || listing.length === 0) {
            res.status(404).json({ error: 'Listing not found' });
            return;
        }

        res.json({ listing: listing[0] });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the real estate listing.' });
    }
});

realEstateRouter.post('/', authService.isAuthenticated, async (req, res) => {
    const userID = sessionService.getSessionUserID(req);
    if (!userID) {
        res.status(401).json({ error: 'Authentication Failed' });
        return;
    }

    try {
        await RealEstateRepository.createRealEstateObject(req.body, userID);
        res.status(201).json({ message: 'Real estate listing created successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: `An error occurred while creating the real estate listing: ${error.message}` });
        } else {
            res.status(500).json({ error: 'An error occurred while creating the real estate listing' });
        }
    }
});

realEstateRouter.put('/', authService.isAuthenticated, async (req, res) => {
    const userID = sessionService.getSessionUserID(req);
    if (!userID) {
        res.status(401).json({ error: 'Authentication Failed' });
        return;
    }

    const { listing_id } = req.body;
    const parsed_listing_id = parseInt(listing_id);

    if (isNaN(parsed_listing_id)) {
        res.status(400).json({ error: 'Invalid listing ID' });
        return;
    }

    try {
        const listing_user_uuid = await listingRepository.getUserIDByListingID(parsed_listing_id);
        if (listing_user_uuid !== userID) {
            res.status(403).json({ error: 'You are not authorized to modify this listing' });
            return;
        }

        await RealEstateRepository.updateRealEstateObject(req.body, parsed_listing_id, userID);
        res.status(200).json({ message: 'Real estate listing updated successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: `An error occurred while updating the real estate listing: ${error.message}` });
        } else {
            res.status(500).json({ error: 'An error occurred while updating the real estate listing' });
        }
    }
});

export default realEstateRouter;