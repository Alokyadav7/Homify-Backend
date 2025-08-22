import Contact from '../models/contact.model.js';
import nodemailer from 'nodemailer';

export const submitContactForm = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: 'yalok0319@gmail.com',
            to: email,
            subject: 'Thank You for Contacting Us',
            text: `Dear ${name},\n\nThank you for contacting Homify Real Estate Marketplace. 
           We appreciate your interest and are excited to assist you with your real estate needs. 
           Our team of dedicated professionals is committed to providing you with the best service possible.
           Whether you are looking to buy, sell, or rent a property, we are here to help. Our extensive knowledge of the 
           local market and our commitment to customer satisfaction set us apart from the competition.

            We will review your inquiry and get back to you as soon as possible.
            \n\nBest regards,\nYour Team`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email', error });
            }
            console.log('Email sent: ' + info.response);
            res.status(201).json({ message: 'Message sent successfully!' });
        });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ message: 'Error saving contact', error });
    }
};
