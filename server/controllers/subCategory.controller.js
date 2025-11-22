import mongoose from "mongoose";
import SubCategoryModel from "../models/subCategory.model.js";
import CategoryModel from "../models/category.model.js";

export const AddSubCategoryController = async (request, response) => {
    try {
        const { name, image, category } = request.body

        // normalize image to array (optional)
        const imageArr = Array.isArray(image) ? image : (image ? [image] : [])

        if (!name || !category || !category[0]) {
            return response.status(400).json({
                message: "Provide name and at least one category id",
                error: true,
                success: false
            })
        }

        // normalize category entries: accept array of ids or names; map names to ids
        let categoryIds = []
        if (Array.isArray(category)) {
            for (const c of category) {
                if (!c) continue
                // if it looks like an ObjectId
                try {
                    if (mongoose.Types.ObjectId.isValid(c)) {
                        categoryIds.push(c)
                        continue
                    }
                } catch (e) { }

                // otherwise treat as name and try to find
                const foundCat = await CategoryModel.findOne({ name: { '$regex': c, '$options': 'i' } })
                if (foundCat) {
                    categoryIds.push(foundCat._id)
                }
            }
        }

        const payload = {
            name,
            image: imageArr,
            category: categoryIds
        }

        const createSubCategory = new SubCategoryModel(payload)
        const save = await createSubCategory.save()

        return response.json({
            message: "Sub Category Created",
            data: save,
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getSubCategoryController = async (request, response) => {
    try {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            console.warn('⚠️  MongoDB not connected, returning empty subcategories')
            return response.json({
                message: "Database not connected",
                data: [],
                error: false,
                success: true
            })
        }

        const data = await SubCategoryModel.find().sort({ createdAt: -1 }).populate('category')
        return response.json({
            message: "Sub Category data",
            data: data || [],
            error: false,
            success: true
        })
    } catch (error) {
        console.error('Error in getSubCategoryController:', error.message)
        return response.json({
            message: error.message || "Error fetching subcategories",
            data: [],
            error: false,
            success: true
        })
    }
}

export const updateSubCategoryController = async (request, response) => {
    try {
        const { _id, name, image, category } = request.body
        console.log('Update request body:', request.body)

        if (!_id) {
            return response.status(400).json({
                message: "Missing subcategory ID",
                error: true,
                success: false
            })
        }

        // Validate _id format
        try {
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                return response.status(400).json({
                    message: "Invalid subcategory ID format",
                    error: true,
                    success: false
                })
            }
        } catch (e) {
            console.error('ObjectId validation error:', e)
        }

        const checkSub = await SubCategoryModel.findById(_id)
        if (!checkSub) {
            return response.status(400).json({
                message: "Subcategory not found",
                error: true,
                success: false
            })
        }

        // Normalize image array
        const imageArr = Array.isArray(image) ? image : (image ? [image] : [])
        console.log('Normalized image array:', imageArr)

        // Prepare update payload
        const updatePayload = {
            ...(name && { name }),
            image: imageArr
        }

        // Only include category if provided
        if (category && Array.isArray(category)) {
            updatePayload.category = category
        }

        console.log('Update payload:', updatePayload)

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(
            _id,
            updatePayload,
            {
                new: true,
                runValidators: true
            }
        ).populate('category')

        if (!updateSubCategory) {
            return response.status(500).json({
                message: "Update failed",
                error: true,
                success: false
            })
        }

        console.log('Updated document:', updateSubCategory)

        return response.json({
            message: 'Updated Successfully',
            data: updateSubCategory,
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const deleteSubCategoryController = async (request, response) => {
    try {
        const { _id } = request.body
        console.log("Id", _id)
        const deleteSub = await SubCategoryModel.findByIdAndDelete(_id)

        return response.json({
            message: "Delete successfully",
            data: deleteSub,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}