import express from 'express';
import { addProduct,deleteProduct,updateProduct,viewProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/",addProduct);
productRouter.get("/",viewProduct);
productRouter.delete("/:key",deleteProduct)
productRouter.put ("/:key",updateProduct)

export default productRouter;