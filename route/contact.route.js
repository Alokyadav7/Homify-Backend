import express from 'express';
import { submitContactForm } from '../controller/contact.controller.js';

const router = express.Router();

router.post('/contact', submitContactForm);

export default router;
