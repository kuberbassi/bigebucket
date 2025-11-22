import mongoose from "mongoose";
import ProductModel from "../models/product.model.js";
import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";

export const createProductController = async (request, response) => {
    try {
        const {
            name,
            image,
            category: categoryInput,
            subCategory: subCategoryInput,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
            pricePerKilo,
            deliveryTime
        } = request.body

        if (!name || !price || !unit || !description) {
            return response.status(400).json({
                message: "Enter required fields: name, price, unit, description",
                error: true,
                success: false
            })
        }

        const ObjectId = mongoose.Types.ObjectId

        const resolveCategoryIds = async (input) => {
            const ids = []
            if (!input) return ids
            if (Array.isArray(input)) {
                for (const it of input) {
                    if (!it) continue
                    if (ObjectId.isValid(it)) {
                        ids.push(it)
                        continue
                    }
                    let cat = await CategoryModel.findOne({ name: { '$regex': it, '$options': 'i' } })
                    if (!cat) {
                        cat = new CategoryModel({ name: it })
                        await cat.save()
                    }
                    ids.push(cat._id)
                }
            } else {
                if (ObjectId.isValid(input)) {
                    ids.push(input)
                } else {
                    let cat = await CategoryModel.findOne({ name: { '$regex': input, '$options': 'i' } })
                    if (!cat) {
                        cat = new CategoryModel({ name: input })
                        await cat.save()
                    }
                    ids.push(cat._id)
                }
            }
            return ids
        }

        const resolveSubCategoryIds = async (input) => {
            const ids = []
            if (!input) return ids
            if (Array.isArray(input)) {
                for (const it of input) {
                    if (!it) continue
                    if (ObjectId.isValid(it)) {
                        ids.push(it)
                        continue
                    }
                    let sub = await SubCategoryModel.findOne({ name: { '$regex': it, '$options': 'i' } })
                    if (!sub) {
                        sub = new SubCategoryModel({ name: it })
                        await sub.save()
                    }
                    ids.push(sub._id)
                }
            } else {
                if (ObjectId.isValid(input)) {
                    ids.push(input)
                } else {
                    let sub = await SubCategoryModel.findOne({ name: { '$regex': input, '$options': 'i' } })
                    if (!sub) {
                        sub = new SubCategoryModel({ name: input })
                        await sub.save()
                    }
                    ids.push(sub._id)
                }
            }
            return ids
        }

        const categoryIds = await resolveCategoryIds(categoryInput)
        const subCategoryIds = await resolveSubCategoryIds(subCategoryInput)

        const product = new ProductModel({
            name,
            description,
            image: image || [],
            category: categoryIds,
            subCategory: subCategoryIds,
            unit,
            stock: stock === undefined ? null : stock,
            price,
            discount: discount || 0,
            more_details: more_details || {},
            pricePerKilo: pricePerKilo || '',
            deliveryTime: deliveryTime || ''
        })

        const saveProduct = await product.save()

        return response.json({
            message: "Product Created Successfully",
            data: saveProduct,
            error: false,
            success: true
        })

    } catch (error) {
        console.error('[createProductController] error:', error)
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getProductController = async (request, response) => {
    try {
        let { page, limit, search } = request.body

        if (!page) {
            page = 1
        }

        if (!limit) {
            limit = 10
        }

        const query = search ? {
            $text: {
                $search: search
            }
        } : {}

        const skip = (page - 1) * limit

        const [data, totalCount] = await Promise.all([
            ProductModel.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message: "Product data",
            error: false,
            success: true,
            totalCount: totalCount,
            totalPage: Math.ceil(totalCount / limit),
            data: data
        })
    } catch (error) {
        console.error('[getProductController] error:', error)
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getProductByCategory = async (request, response) => {
    try {
        const { id } = request.body

        if (!id) {
            return response.status(400).json({
                message: "provide category id",
                error: true,
                success: false
            })
        }

        const product = await ProductModel.find({
            category: { $in: [id] },
            publish: true
        }).limit(24).populate('category subCategory')

        return response.json({
            message: "category product list",
            data: product,
            error: false,
            success: true
        })
    } catch (error) {
        console.error('[getProductByCategory] error:', error)
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getProductByCategoryAndSubCategory = async (request, response) => {
    try {
        const { categoryId, subCategoryId } = request.body

        let page = request.body.page || 1
        let limit = request.body.limit || 10

        if (!categoryId || !subCategoryId) {
            return response.status(400).json({
                message: "Provide categoryId and subCategoryId",
                error: true,
                success: false
            })
        }

        const query = {
            category: { $in: [categoryId] },
            subCategory: { $in: [subCategoryId] },
            publish: true
        }

        const skip = (page - 1) * limit

        const [data, dataCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message: "Product list",
            data: data,
            totalCount: dataCount,
            page: page,
            limit: limit,
            success: true,
            error: false
        })

    } catch (error) {
        console.error('[getProductByCategoryAndSubCategory] error:', error)
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getProductDetails = async (request, response) => {
    try {
        const { productId } = request.body

        if (!productId) {
            return response.status(400).json({
                message: 'provide productId',
                data: null,
                error: true,
                success: false
            })
        }

        const product = await ProductModel.findOne({ _id: productId }).populate('category subCategory')

        if (!product) {
            return response.status(404).json({
                message: 'Product not found',
                data: null,
                error: true,
                success: false
            })
        }

        return response.json({
            message: "product details",
            data: product,
            error: false,
            success: true
        })

    } catch (error) {
        console.error('[getProductDetails] error:', error)
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateProductDetails = async (request, response) => {
    try {
        const { _id } = request.body

        if (!_id) {
            return response.status(400).json({
                message: "provide product _id",
                error: true,
                success: false
            })
        }

        const updateProduct = await ProductModel.updateOne({ _id: _id }, {
            ...request.body
        })

        return response.json({
            message: "updated successfully",
            data: updateProduct,
            error: false,
            success: true
        })

    } catch (error) {
        console.error('[updateProductDetails] error:', error)
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const deleteProductDetails = async (request, response) => {
    try {
        const { _id } = request.body

        if (!_id) {
            return response.status(400).json({
                message: "provide _id",
                error: true,
                success: false
            })
        }

        const deleteProduct = await ProductModel.deleteOne({ _id: _id })

        return response.json({
            message: "Delete successfully",
            error: false,
            success: true,
            data: deleteProduct
        })
    } catch (error) {
        console.error('[deleteProductDetails] error:', error)
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const searchProduct = async (request, response) => {
    try {
        let { search, page, limit } = request.body
        page = parseInt(page, 10) || 1
        limit = parseInt(limit, 10) || 10
        const skip = (page - 1) * limit

        // if no search provided, return paginated products
        if (!search) {
            const [data, dataCount] = await Promise.all([
                ProductModel.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('category subCategory'),
                ProductModel.countDocuments({})
            ])
            return response.json({
                message: 'Product data',
                error: false,
                success: true,
                data,
                totalCount: dataCount,
                totalPage: Math.ceil((dataCount || 0) / limit),
                page,
                limit
            })
        }

        const escapeRegex = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const re = new RegExp(escapeRegex(search), 'i')

        let categoryIds = []
        let subCategoryIds = []
        try {
            const catMatches = await CategoryModel.find({ name: { $regex: re } }, { _id: 1 })
            categoryIds = catMatches.map(c => c._id)
        } catch (e) {
            // ignore
        }
        try {
            const subMatches = await SubCategoryModel.find({ name: { $regex: re } }, { _id: 1 })
            subCategoryIds = subMatches.map(s => s._id)
        } catch (e) {
            // ignore
        }

        const query = {
            $or: [
                { name: { $regex: re } },
                { description: { $regex: re } },
                ...(categoryIds.length ? [{ category: { $in: categoryIds } }] : []),
                ...(subCategoryIds.length ? [{ subCategory: { $in: subCategoryIds } }] : [])
            ]
        }

        const [data, dataCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message: 'Product data',
            error: false,
            success: true,
            data,
            totalCount: dataCount,
            totalPage: Math.ceil((dataCount || 0) / limit),
            page,
            limit
        })

    } catch (error) {
        console.error('[searchProduct] error:', error)
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}