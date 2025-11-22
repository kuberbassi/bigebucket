// 500+ product image links and random names
import screenshot33 from '../assets/Screenshot (33).png';
import screenshot35 from '../assets/Screenshot (35).png';
import screenshot36 from '../assets/Screenshot (36).png';
import screenshot37 from '../assets/Screenshot (37).png';

const webGroceryItems = [
  {
    name: 'Fresh Apples',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Bananas',
    image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e8f8?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Tomatoes',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Potatoes',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Green Peas',
    image: 'https://images.unsplash.com/photo-1464306076886-debede6bbf94?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Carrots',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Broccoli',
    image: 'https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Milk',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Eggs',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Bread',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
  }
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

export const productImages = [
  { name: 'Screenshot 35', image: screenshot35 },
  { name: 'Screenshot 36', image: screenshot36 },
  { name: 'Screenshot 37', image: screenshot37 },
  { name: 'Reference Grocery', image: screenshot33 },
  ...webGroceryItems,
  ...Array.from({ length: 500 }, (_, i) => ({
    name: productNames[Math.floor(Math.random() * productNames.length)],
    image: `https://source.unsplash.com/400x400/?grocery,food,product,${i}`
  }))
];
