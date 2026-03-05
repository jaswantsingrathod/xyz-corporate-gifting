import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        selections: [
            {
                category: {
                    type: String,
                    required: true,
                },
                option: {
                    type: String,
                    required: true,
                },
            },
        ],
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Preparing', 'Ready', 'Delivered'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
