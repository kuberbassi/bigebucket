import React, { useState } from 'react';
import AddToCartButton from './AddToCartButton'

const blinkitCategories = [
  { name: 'Fruits & Vegetables', image: 'https://images.pexels.com/photos/1431335/pexels-photo-1431335.jpeg' },
  { name: 'Dairy & Eggs', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Bakery', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Snacks & Branded Foods', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' },
  { name: 'Beverages', image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg' },
  { name: 'Frozen Foods', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Meat & Seafood', image: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg' },
  { name: 'Breakfast & Cereals', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Oil & Masala', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Dry Fruits & Nuts', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Personal Care', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Cleaning & Household', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Baby Care', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Pet Care', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Instant Food', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Gourmet & World Food', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Stationery', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Health & Wellness', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Home & Kitchen', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' },
  { name: 'Beauty & Hygiene', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg' }
];

const productNames = [
  'Apple', 'Banana', 'Carrot', 'Tomato', 'Potato', 'Onion', 'Milk', 'Bread', 'Eggs', 'Rice',
  'Lentils', 'Spinach', 'Orange', 'Cucumber', 'Chicken', 'Fish', 'Cheese', 'Butter', 'Yogurt', 'Beans',
  'Peas', 'Corn', 'Broccoli', 'Cauliflower', 'Mushroom', 'Grapes', 'Strawberry', 'Pineapple', 'Watermelon', 'Papaya',
  'Chili', 'Garlic', 'Ginger', 'Pumpkin', 'Cabbage', 'Lettuce', 'Celery', 'Avocado', 'Peach', 'Plum',
  'Pear', 'Kiwi', 'Mango', 'Lime', 'Lemon', 'Coconut', 'Cashew', 'Almond', 'Walnut', 'Hazelnut',
  'Oats', 'Flour', 'Sugar', 'Salt', 'Pepper', 'Tea', 'Coffee', 'Juice', 'Soda', 'Butter Beans',
  'Chickpeas', 'Tofu', 'Paneer', 'Sausage', 'Ham', 'Bacon', 'Shrimp', 'Crab', 'Squid', 'Octopus',
  'Ice Cream', 'Chocolate', 'Candy', 'Jam', 'Honey', 'Maple Syrup', 'Mustard', 'Ketchup', 'Mayonnaise', 'Pickles',
  'Olive Oil', 'Sunflower Oil', 'Soy Sauce', 'Vinegar', 'Pasta', 'Noodles', 'Soup', 'Cereal', 'Granola', 'Muesli',
  'Energy Bar', 'Protein Powder', 'Biscuits', 'Cookies', 'Cake', 'Pastry', 'Donut', 'Muffin', 'Waffle', 'Pancake'
];

function getProducts(category) {
  return Array.from({ length: 50 }, (_, i) => ({
    name: productNames[Math.floor(Math.random() * productNames.length)],
    _id: `${category.replace(/[^a-z0-9]+/gi, '')}_${i}`,
    price: Math.floor(Math.random() * 500) + 10,
    image: `https://source.unsplash.com/400x400/?${category},food,product,${i}`,
    unit: '500 g',
    stock: 10,
    popularity: Math.floor(Math.random() * 1000),
  }));
}

const CategoryProductGrid = () => {
  const [sortBy, setSortBy] = useState('name');
  const [wishlist, setWishlist] = useState([]);

  const handleWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((p) => p.name === product.name) ? prev.filter((p) => p.name !== product.name) : [...prev, product]
    );
  };

  const handleBuyNow = (product) => {
    alert(`Buying: ${product.name}`);
  };

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {blinkitCategories.map((cat) => (
          <div key={cat.name} className="bg-white rounded shadow p-2 flex flex-col items-center">
            <span className="font-semibold text-center">{cat.name}</span>
          </div>
        ))}
      </div>
      {blinkitCategories.map((cat, idx) => {
        let products = getProducts(cat.name);
        products = products.sort((a, b) => {
          if (sortBy === 'name') return a.name.localeCompare(b.name);
          if (sortBy === 'price') return a.price - b.price;
          if (sortBy === 'popularity') return b.popularity - a.popularity;
          return 0;
        });
        return (
          <div key={cat.name + '-products'} className="mb-12">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold">{cat.name}</h3>
              <select
                className="border rounded px-2 py-1"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map((product, i) => (
                  <div key={product.name + i} className="bg-white rounded shadow p-2 flex flex-col items-center">
                  <img src={product.image} alt={product.name} className="max-h-32 object-contain mb-2" />
                  <span className="font-medium text-center mb-1">{product.name}</span>
                  <span className="text-green-700 font-bold mb-1">₹{product.price}</span>
                  <a href={product.image} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 break-all mb-1 underline">{product.image}</a>
                  <div className="flex gap-2">
                    <div className="">
                      <AddToCartButton data={product} />
                    </div>
                    <button
                      className={`px-2 py-1 rounded text-xs ${wishlist.some((p) => p.name === product.name) ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => handleWishlist(product)}
                    >
                      {wishlist.some((p) => p.name === product.name) ? 'Wishlisted' : 'Wishlist'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CategoryProductGrid;
