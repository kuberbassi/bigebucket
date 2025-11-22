import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const SubCategorySchema = new mongoose.Schema({
    name: String,
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
}, { strict: false });
const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

const CategorySchema = new mongoose.Schema({
    name: String
}, { strict: false });
const Category = mongoose.model('Category', CategorySchema);

async function check() {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb+srv://ior2017_bigebucket:cW0xBr5lgSHOWh2n@bigebucket.ysugviz.mongodb.net/?appName=bigebucket';
        await mongoose.connect(uri);
        console.log('Connected.');

        const categories = await Category.find({});
        const subcategories = await SubCategory.find({});

        console.log(`Total Categories: ${categories.length}`);
        console.log(`Total SubCategories: ${subcategories.length}`);

        for (const cat of categories) {
            const linkedSubs = subcategories.filter(sub => {
                if (!sub.category) return false;
                const cats = Array.isArray(sub.category) ? sub.category : [sub.category];
                return cats.some(c => c.toString() === cat._id.toString());
            });

            console.log(`Category: ${cat.name} (${cat._id}) -> ${linkedSubs.length} subcategories`);
            if (linkedSubs.length > 0) {
                console.log(`  - ${linkedSubs.map(s => s.name).join(', ')}`);
            }
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

check();
