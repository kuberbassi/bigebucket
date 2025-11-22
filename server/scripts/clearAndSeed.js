import mongoose from 'mongoose';
import Product from './models/product.model.js';

// Clear existing products and reseed with correct categories
const clearAndReseed = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/BigebucketDB', { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Import the products array
    const products = (await import('./productsData.js')).default;
    
    // Insert new products
    await Product.insertMany(products);
    console.log('Products seeded successfully!');
    
    // Verify the categories
    const dairyCount = await Product.countDocuments({ category: 'Dairy, Bread & Eggs' });
    const fruitsCount = await Product.countDocuments({ category: 'Fruits & Vegetables' });
    
    console.log(`Dairy products: ${dairyCount}`);
    console.log(`Fruits & Vegetables products: ${fruitsCount}`);
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    mongoose.disconnect();
  }
};

clearAndReseed();
