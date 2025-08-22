import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';
import UserRoute from './route/user.route.js';
import authRoute from './route/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRoute from "./route/listing.route.js";
import contactRoute from "./route/contact.route.js";
import adminRoute from "./route/admin.route.js";
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI,{
    serverSelectionTimeoutMS: 30000,
})
    .then(() => {
        console.log("Connected to MongoDB Database...");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB limit

app.use(cookieParser());

app.use("/api/user", UserRoute);
app.use("/api/auth", authRoute);
app.use('/api/listing', listingRoute);
app.use('/api/auth', contactRoute);

// admin route
app.use('/api/admin',adminRoute);

// Example route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // Handle the file upload
    res.send('File uploaded successfully.');
});

app.use((err, req, res, next) => {
    const statuscode = err.status || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statuscode).json({
        success: false,
        statuscode,
        message
    });
});

const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});
