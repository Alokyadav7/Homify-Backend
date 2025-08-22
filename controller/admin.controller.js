import User from '../models/user.model.js';
import Contacts from '../models/contact.model.js';
import Listing from "../models/listing.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, {password: 0});
        if (!users || users.length === 0) {
            console.log(users)
            return res.status(404).json({ message: "Users not found" });
        }

        // Return users along with the total count
        return res.status(200).json({
            totalUsers: users.length,
            users
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// DELETE user by ID
export const DeleteUsers = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// UPDATE user by ID
export const UpdateUsers =async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = req.body;
        const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getAllContact = async (req, res) => {
    try {
        // Fetch all contacts from the database
        const contacts = await Contacts.find({}, 'id name email message');

        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found" });
        }

        // Prepare the response with the count of messages
        const contactData = contacts.map(contact => ({
            name: contact.name,
            email: contact.email,
            message: contact.message,
        }));

        return res.status(200).json({
            count: contacts.length,
            contacts: contactData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getAllProperty = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const {
            offer = { $in: [false, true] },
            parking = { $in: [false, true] },
            type = { $in: ['sale', 'rent'] },
            facing = { $in: ['N', 'S', 'E', 'W'] },
            greenScore = { $gte: 0 },
            area = { $gte: 0 },
            yearBuilt = { $gte: 0 },
            swimmingPool = { $in: [false, true] },
            gardenArea = { $in: [false, true] },
            fully_furnished = { $in: [false, true] },
            semi_furnished = { $in: [false, true] },
            searchTerm = '',
            sort = 'createdAt',
            order = 'desc',
        } = req.query;

        // Fetch properties with matching filters
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
            .select('name offer parking type facing greenScore area yearBuilt swimmingPool gardenArea fully_furnished semi_furnished contactEmail contactPhone address imageUrls price regularPrice discountPrice') // Include the desired fields
            .skip(startIndex);

        // Return the listings
        return res.status(200).json({
            totalProperties: listings.length,
            properties: listings,
        });
    } catch (error) {
        next(error);
    }
};

