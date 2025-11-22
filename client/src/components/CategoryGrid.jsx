import React, { useState } from 'react';


const CategoryGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[2].name); // Default: Fruits & Vegetables
  const [cart, setCart] = useState([]);

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
  };

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };



  return (
    <div className="flex w-full h-[600px] bg-gray-50 rounded-lg shadow-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-40 bg-white border-r flex flex-col py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`flex items-center gap-2 px-3 py-2 mb-2 rounded-lg hover:bg-gray-100 transition-colors ${selectedCategory === cat.name ? 'bg-green-100 font-bold' : ''}`}
            onClick={() => handleCategoryClick(cat.name)}
          >
            <img src={cat.img} alt={cat.name} className="w-8 h-8 object-cover rounded-full border border-gray-200" />
            <span className="text-xs text-left">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Buy {selectedCategory} Online</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No products found.</div>
          ) : (
            products.map((product) => (
              <div key={product.name} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform">
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded mb-2 border border-gray-200" />
                <span className="text-sm font-semibold text-gray-700 text-center mt-2">{product.name}</span>
                <span className="text-green-600 font-bold mt-1">₹{product.price}</span>
                <button
                  className="mt-2 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-sm font-bold shadow-lg"
                  onClick={() => handleAddToCart(product)}
                >
                  ADD
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
