import { Router } from 'express';
import { validateQuery } from '../middleware/query-validation.middleware';
import VehicleRepository from '../db/vehicle.repository';
import { vehicleQuerySchema } from '../../interfaces/vehicle/vehicle.interface';

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

export default vehicleRouter;
