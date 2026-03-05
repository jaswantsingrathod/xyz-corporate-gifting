import Item from '../models/Item.js';

// @desc    Create an item category with options
// @route   POST /api/items
// @access  Private/Admin
const createItem = async (req, res) => {
    let { category, options } = req.body;

    if (!category) {
        return res.status(400).json({ message: 'Category is required' });
    }

    const trimmedCategory = category.trim();

    try {
        // Find existing category (case-insensitive)
        let item = await Item.findOne({
            category: { $regex: new RegExp(`^${trimmedCategory}$`, 'i') }
        });

        if (item) {
            // Merge options
            item.options.push(...options);
            const updatedItem = await item.save();
            return res.json(updatedItem);
        }

        // Create new if not found
        const newItem = new Item({
            category: trimmedCategory,
            options,
        });

        const createdItem = await newItem.save();
        res.status(201).json(createdItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all items
// @route   GET /api/items
// @access  Private
const getItems = async (req, res) => {
    try {
        const items = await Item.find({});
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update an item category
// @route   PUT /api/items/:id
// @access  Private/Admin
const updateItem = async (req, res) => {
    const { category, options } = req.body;

    try {
        const item = await Item.findById(req.params.id);

        if (item) {
            item.category = category || item.category;
            item.options = options || item.options;

            const updatedItem = await item.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an item category
// @route   DELETE /api/items/:id
// @access  Private/Admin
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (item) {
            await Item.deleteOne({ _id: item._id });
            res.json({ message: 'Item removed' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a specific option from an item category
// @route   DELETE /api/items/deleteoption/:id
// @access  Private/Admin
// Expects { optionId } in request body
const deleteOption = async (req, res) => {
    const { optionId } = req.body;

    if (!optionId) {
        return res.status(400).json({ message: "optionId is required" });
    }

    try {

        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        const subDoc = item.options.id(optionId);

        if (!subDoc) {
            return res.status(404).json({ message: "Option not found" });
        }

        subDoc.deleteOne();

        await item.save();

        res.json({
            message: "Option removed successfully",
            item
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createItem, getItems, updateItem, deleteItem, deleteOption };
