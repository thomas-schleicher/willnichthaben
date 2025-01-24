import { Router } from 'express';
import listingRepository from '../db/listing.repository';

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

export default listingRouter;
