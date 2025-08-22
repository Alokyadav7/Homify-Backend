import express from 'express';
import {DeleteUsers, getAllContact, getAllProperty, getAllUsers, UpdateUsers} from '../controller/admin.controller.js';


const router = express.Router();

router.route('/users').get(getAllUsers);
router.route('/users/:id').delete(DeleteUsers);
router.route('/users/:id').put(UpdateUsers);
router.route('/contacts').get(getAllContact);
router.route('/propertyList',).get(getAllProperty);


export default router;
