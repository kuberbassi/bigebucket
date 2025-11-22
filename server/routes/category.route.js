import { Router } from 'express'
import auth from '../middleware/auth.js'
import { AddCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from '../controllers/category.controller.js'

const categoryRouter = Router()

categoryRouter.post("/add-category",auth,AddCategoryController)
// existing route used by frontend
categoryRouter.get('/get',getCategoryController)
// alias for older clients or external code that expects /get-all
categoryRouter.get('/get-all', getCategoryController)
categoryRouter.put('/update',auth,updateCategoryController)
categoryRouter.delete("/delete",auth,deleteCategoryController)

export default categoryRouter