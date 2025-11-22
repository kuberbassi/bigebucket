
import { Router } from 'express'
import auth from '../middleware/auth.js'
import ProductModel from '../models/product.model.js'
import { createProductController, deleteProductDetails, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails, searchProduct, updateProductDetails } from '../controllers/product.controller.js'
import { admin } from '../middleware/Admin.js'

const productRouter = Router()

// simple GET endpoint so visiting /api/product in a browser returns a product list
productRouter.get('/', async (req, res) => {
	try {
		const products = await ProductModel.find().limit(50).populate('category subCategory')
		return res.json({
			message: 'Product list',
			error: false,
			success: true,
			data: products
		})
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false
		})
	}
})

productRouter.post("/create", auth, admin, createProductController)
productRouter.post('/get', getProductController)
productRouter.post("/get-product-by-category", getProductByCategory)
productRouter.post('/get-product-by-category-and-subcategory', getProductByCategoryAndSubCategory)
productRouter.post('/get-product-details', getProductDetails)

//update product
productRouter.put('/update-product-details', auth, admin, updateProductDetails)

//delete product
productRouter.delete('/delete-product', auth, admin, deleteProductDetails)

//search product 
productRouter.post('/search-product', searchProduct)

export default productRouter