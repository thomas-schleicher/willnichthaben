import { Router } from 'express';
import { validateQuery } from '../middleware/query-validation.middleware';
import VehicleRepository from '../db/vehicle.repository';
import { vehicleQuerySchema } from '../../interfaces/vehicle/vehicle.interface';
import authService from '../service/auth.service';
import sessionService from '../service/session.service';
import listingRepository from '../db/listing.repository';

const vehicleRouter = Router();

vehicleRouter.get('/', validateQuery(vehicleQuerySchema), async (req, res) => {
    try {
        const filters = req.query;
        const vehicles = await VehicleRepository.getVehicles(filters);
        res.json({ vehicles: vehicles });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching vehicle listings.' });
    } 
});

vehicleRouter.get('/brands', validateQuery(vehicleQuerySchema), async (req, res) => {
    try {
        const filters = req.query;
        const brands = await VehicleRepository.getBrands(filters);
        res.json({ brands: brands});
    } catch (error) {
        res.status(500).json({ error: 'An error occured while fetching vehicle brands.'});
    }
});

vehicleRouter.get('/models', validateQuery(vehicleQuerySchema), async (req, res) => {
    try {
        const filters = req.query;
        const models = await VehicleRepository.getModels(filters);
        res.json({ models: models});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching possible models.' });
    }
});

vehicleRouter.post('/', authService.isAuthenticated, async (req, res) => {
    const userID = sessionService.getSessionUserID(req);
    if (!userID) {
        res.status(500).json({ error: 'Authentication Failed' });
        return;
    }

    try {
        await VehicleRepository.createVehicle(req.body, userID);
        res.status(200).json({ message: 'Vehicle listing created successfully' });
    } catch(error) {
        res.status(500).json({ error: 'An error occurred while creating the vehicle listing: ' + error  });
        return;
    }
});

vehicleRouter.put('/', authService.isAuthenticated, async (req, res) => {
    const userID = sessionService.getSessionUserID(req);
    if (!userID) {
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

        const listing_user_uuid = await listingRepository.getUserIDByListingID(parsed_listing_id);
        if (listing_user_uuid !== userID) {
            res.status(403).json({ error: 'You are not authorized to modify this listing' });
            return;
        }

        console.log(req.body, listing_id, userID);

        await VehicleRepository.updateVehicle(req.body, listing_id, userID);
        res.status(200).json({ message: 'Vehicle listing updated successfully' });

        console.log("after");

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the vehicle listing: ' + error });
        return;
    }
}); 

export default vehicleRouter;
