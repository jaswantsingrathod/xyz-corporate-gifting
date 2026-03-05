import React from 'react';

const ProductCard = ({ item, isSelected, onToggleSelect }) => {
    return (
        <div
            className={`relative bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col cursor-pointer ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-200'
                }`}
            onClick={onToggleSelect}
        >
            <div className="absolute top-4 right-4">
                <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer pointer-events-none"
                />
            </div>

            <div className="mt-2 mb-4 h-40 w-full bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {item.image ? (
                    <img src={item.image} alt={item.name} className="object-contain h-full w-full" />
                ) : (
                    <span className="text-gray-400">No Image</span>
                )}
            </div>

            <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
                <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                        {item.category || 'Standard'}
                    </span>
                    {item.price && (
                        <span className="text-sm font-medium text-gray-900">${item.price}</span>
                    )}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                    type="button"
                    className={`w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isSelected
                            ? 'border-indigo-600 text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
                            : 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700'
                        }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleSelect();
                    }}
                >
                    {isSelected ? 'Selected' : 'Select Item'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
