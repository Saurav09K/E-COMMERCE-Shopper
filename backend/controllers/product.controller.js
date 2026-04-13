import Product from '../models/product.model.js';
import { v2 as cloudinary } from "cloudinary";

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({
                message: "Required fields missing"
            });
        }

        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];

        const images = [image1, image2, image3].filter(item => item != undefined);

        if (images.length === 0) {
            return res.status(400).json({
                message: "At least one image is required"
            });
        }

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                return (await cloudinary.uploader.upload(item.path, {
                    resource_type: "image"
                })).secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true",
            sizes: sizes ? JSON.parse(sizes) : [],
            image: imagesUrl,
            date: Date.now()
        };

        const product = await Product.create(productData);

        return res.status(201).json({
            message: "Product added successfully",
            product
        });

    } catch (error) {
        console.log("ERROR IN ADD PRODUCT :", error);
        return res.status(500).json({
            message: "Product cannot be added"
        });
    }
};



// List product
async function listProduct(req,res){
    try{
        const product = await Product.find({});
        return res.status(200).json({
            message:"Product list",
            product
        })
    }catch(error){
        console.log("ERROR IN LIST PRODUCT :", error);
        return res.status(500).json({
            message: "Failed to fetch products"
        });
    }
}

//Remove product
async function removeProduct(req,res){
    try{

        const {id} = req.params;

        if(!id){
            return res.status(400).json({
                message: "Product ID is required"
            });
        }
        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            message:"Product removed successfully"
        })

    }catch(error){
        console.log("ERROR IN REMOVE PRODUCT :", error);
        return res.status(500).json({
            message: "Failed to remove product"
        });
    }
}

//single product
async function singleProdcut(req,res){
    try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                message: "Product ID is required"
            });
        }
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({
                message: "Product not found"
            });
        }
        return res.status(200).json({
            message:"Product details",
            product
        })
        
    }catch(error){
        console.log("ERROR IN SINGLE PRODUCT :", error);
        return res.status(500).json({
            message: "Failed to fetch product details"
        });
    }
}

export {addProduct,removeProduct,singleProdcut,listProduct}