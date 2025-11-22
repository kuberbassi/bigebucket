import connectDB from '../config/connectDB.js'
import mongoose from 'mongoose'
import fs from 'fs'
import CategoryModel from '../models/category.model.js'
import SubCategoryModel from '../models/subCategory.model.js'

async function run(){
    await connectDB()

    // categories
    const categories = await CategoryModel.find({})
    let catUpdated = 0
    for(const cat of categories){
        const img = cat.image
        if(typeof img === 'string'){
            let parsed = null
            try{
                // try JSON parse
                parsed = JSON.parse(img)
            }catch(e){
                // try to convert quoted single-quote array like "[ 'a', 'b' ]"
                const cleaned = img.replace(/'/g,'"')
                try{
                    parsed = JSON.parse(cleaned)
                }catch(e2){
                    parsed = [img]
                }
            }

            if(Array.isArray(parsed)){
                cat.image = parsed
                await cat.save()
                catUpdated++
            } else {
                cat.image = [String(parsed)]
                await cat.save()
                catUpdated++
            }
        }
    }

    // subcategories
    const subs = await SubCategoryModel.find({})
    let subUpdated = 0
    for(const s of subs){
        const img = s.image
        if(typeof img === 'string'){
            let parsed = null
            try{
                parsed = JSON.parse(img)
            }catch(e){
                const cleaned = img.replace(/'/g,'"')
                try{
                    parsed = JSON.parse(cleaned)
                }catch(e2){
                    parsed = [img]
                }
            }

            if(Array.isArray(parsed)){
                s.image = parsed
                await s.save()
                subUpdated++
            } else {
                s.image = [String(parsed)]
                await s.save()
                subUpdated++
            }
        }
    }

    console.log('Migration complete. Categories updated:', catUpdated, 'Subcategories updated:', subUpdated)
    process.exit(0)
}

run().catch(err=>{
    console.error(err)
    process.exit(1)
})
