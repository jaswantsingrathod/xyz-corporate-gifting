import Order from '../models/Order.js';

// @desc    Create a new order (employee submits request)
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    const { selections } = req.body;

    if (!selections || selections.length === 0) {
        return res.status(400).json({ message: 'No selections provided' });
    }

    try {
        const existingOrder = await Order.findOne({ employee: req.user._id });
        if (existingOrder) {
            return res.status(400).json({ message: 'You have already placed an order.' });
        }

        const order = new Order({
            employee: req.user._id,
            selections,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in employee's orders
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ employee: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('employee', 'id employeeName email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = status || order.status;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
};
