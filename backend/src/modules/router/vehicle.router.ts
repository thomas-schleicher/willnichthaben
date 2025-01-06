import { Router } from 'express';

const vehicleRouter = Router();

vehicleRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'Vehicle Router!' });
});

export default vehicleRouter;
