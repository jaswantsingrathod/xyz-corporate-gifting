import React from 'react';
import ProductCard from './ProductCard';

const ItemSelector = ({ items, selectedItems, onToggleSelect }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
                <ProductCard
                    key={item._id}
                    item={item}
                    isSelected={selectedItems.some((i) => i._id === item._id)}
                    onToggleSelect={() => onToggleSelect(item)}
                />
            ))}
        </div>
    );
};

export default ItemSelector;
