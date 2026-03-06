import express from 'express';
const router = express.Router();
import {
    createItem,
    getItems,
    updateItem,
    deleteItem,
    deleteOption,
} from '../app/controllers/itemController.js';
import { protect, admin } from '../app/middleware/authMiddleware.js';

// Get all items (public access for viewing kits)
router.get('/getitems', getItems);

// Create item category (admin only)
router.post('/createitem', protect, admin, createItem);

// Update item category (admin only)
router.put('/updateitem/:id', protect, admin, updateItem);

// Delete item category (admin only)
router.delete('/deleteitem/:id', protect, admin, deleteItem);

router.delete('/deleteoption/:id', protect, admin, deleteOption);

export default router;
