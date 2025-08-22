import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    regularPrice: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    fully_furnished: {
        type: Boolean,
        required: true
    },
    semi_furnished: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    offer: {
        type: Boolean,
        required: true
    },
    imageUrls: {
        type: Array,
        required: true
    },
    userRef: {
        type: String,
        required: true
    },
    bhk: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    facing: {
        type: String,
        required: true
    },
    greenScore: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    yearBuilt: {
        type: Number,
        required: true
    },
    swimmingPool: {
        type: Boolean,
        required: true
    },
    gardenArea: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
