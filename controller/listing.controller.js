import Listing from "../models/listing.model.js";
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
    console.log(req.body);
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only delete your own listings!'));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!');
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only update your own listings!'));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }
        res.status(200).json(listing);

    } catch (error) {
        next(error);
    }
}

export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        let parking = req.query.parking;
        let type = req.query.type;
        let facing = req.query.facing;
        let greenScore = req.query.greenScore;
        let area = req.query.area;
        let yearBuilt = req.query.yearBuilt;
        let swimmingPool = req.query.swimmingPool;
        let gardenArea = req.query.gardenArea;
        let fully_furnished = req.query.fully_furnished;
        let semi_furnished = req.query.semi_furnished;

        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
        }

        if (facing === undefined) {
            facing = { $in: ['N', 'S', 'E', 'W'] };
        }

        if (greenScore === undefined) {
            greenScore = { $gte: 0 };
        }

        if (area === undefined) {
            area = { $gte: 0 };
        }

        if (yearBuilt === undefined) {
            yearBuilt = { $gte: 0 };
        }

        if (swimmingPool === undefined || swimmingPool === 'false') {
            swimmingPool = { $in: [false, true] };
        }

        if (gardenArea === undefined || gardenArea === 'false') {
            gardenArea = { $in: [false, true] };
        }

        if (fully_furnished === undefined || fully_furnished === 'false') {
            fully_furnished = { $in: [false, true] };
        }

        if (semi_furnished === undefined || semi_furnished === 'false') {
            semi_furnished = { $in: [false, true] };
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            parking,
            type,
            facing,
            greenScore,
            area,
            yearBuilt,
            swimmingPool,
            gardenArea,
            fully_furnished,
            semi_furnished,
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }

};
