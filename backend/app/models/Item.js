import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true
        },

        options: [
            {
                name: {
                    type: String,
                    required: true
                },

                brand: {
                    type: String
                },

                description: {
                    type: String
                },

                image: {
                    type: String
                }
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
