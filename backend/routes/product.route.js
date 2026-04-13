import express from 'express'
import { addProduct,listProduct,removeProduct,singleProdcut } from '../controllers/product.controller.js'
import upload from '../middleware/multer.middleware.js'
import { protectRoute,isAdmin } from '../middleware/auth.middleware.js'
const router = express.Router()

//public routes
router.get('/list',listProduct)
router.get('/single/:id',singleProdcut)


//admin routes
router.delete('/remove/:id',protectRoute,isAdmin,removeProduct)
router.post('/add',protectRoute,isAdmin,upload.fields([
    {name:'image1',maxCount:1},
    {name:'image2',maxCount:1},
    {name:'image3',maxCount:1}])
    ,addProduct)



export default router;