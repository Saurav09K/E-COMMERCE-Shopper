import express from 'express'
import { addProduct,listProduct,removeProduct,singleProdcut } from '../controllers/product.controller.js'
import upload from '../middleware/multer.middleware.js'

const router = express.Router()

router.post('/add',upload.fields([
    {name:'image1',maxCount:1},
    {name:'image2',maxCount:1},
    {name:'image3',maxCount:1}])
    ,addProduct)

router.get('/list',listProduct)
router.delete('/remove/:id',removeProduct)
router.get('/single/:id',singleProdcut)


export default router;