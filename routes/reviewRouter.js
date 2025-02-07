import express from 'express';
import { addReview,deleteReviews,getReviews,approveReview } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post("/",addReview);
reviewRouter.get("/",getReviews);
reviewRouter.put("/approve/:email",approveReview);
reviewRouter.delete("/:email",deleteReviews);

export default reviewRouter;