import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Try loading from current directory
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SubCategorySchema = new mongoose.Schema({}, { strict: false });
const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

const imageMap = {
    'oil': '/subcategory-images/oil.png',
    'rice': '/subcategory-images/rice.png',
    'atta': '/subcategory-images/atta.png',
    'dal': '/subcategory-images/dal.png',
    'milk': '/subcategory-images/milk.png',
    'bread': '/subcategory-images/bread.png',
    'egg': '/subcategory-images/eggs.png',
    'tea': '/subcategory-images/tea.png',
    'coffee': '/subcategory-images/coffee.png',
    'vegetable': '/subcategory-images/vegetables.png',
    'fruit': '/subcategory-images/fruits.png',
    'dry fruit': '/subcategory-images/placeholder.png',
    'masala': '/subcategory-images/placeholder.png'
};

async function updateSubCategories() {
    try {
        // Hardcode the URI if env fails, just to be safe for this task
        const uri = process.env.MONGODB_URI || 'mongodb+srv://ior2017_bigebucket:cW0xBr5lgSHOWh2n@bigebucket.ysugviz.mongodb.net/?appName=bigebucket';
        console.log('Connecting to:', uri);
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB');

        const subs = await SubCategory.find({});
        console.log(`Found ${subs.length} subcategories`);

        for (const sub of subs) {
            let imagePath = '/subcategory-images/placeholder.png';
            const nameLower = (sub.name || '').toLowerCase();

            for (const [key, path] of Object.entries(imageMap)) {
                if (nameLower.includes(key)) {
                    imagePath = path;
                    break;
                }
            }

            await SubCategory.updateOne(
                { _id: sub._id },
                { $set: { image: [imagePath] } }
            );
            console.log(`✅ Updated ${sub.name} -> ${imagePath}`);
        }

        console.log('\n✅ SubCategory images updated');
        await mongoose.disconnect();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

updateSubCategories();
