import { Request, Response } from 'express';
import ProductReview from '../models/product.review';
import { IProductReview } from '../interfaces/IReview';
import { User } from '../models/user.model';  // Import the User model

class ProductReviewController {
    // Create a new review
    public async createReview(req: Request, res: Response): Promise<Response> {
        try {
            const { user_id, title, description, rating, images_path } = req.body;

            // Required fields
            if (!user_id || !title || !description || !rating) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Validate user_id exists in the User model
            const userExists = await User.findById(user_id);
            if (!userExists) {
                return res.status(400).json({ message: 'User not found' });
            }

            const newReview: IProductReview = new ProductReview({
                user_id,
                title,
                description,
                rating,
                images_path,
                status: 'pending' 
            });

            await newReview.save();

            return res.status(201).json(newReview);
        } catch (error) {
            console.error('Error creating review:', error);
            return res.status(500).json({ message: 'Error creating review', error });
        }
    }

    // Get all reviews with user details populated
    public async getAllReviews(req: Request, res: Response): Promise<Response> {
        try {
            const reviews = await ProductReview.find()
                .populate('user_id', 'fname')  // Populate the user details, only fetching 'fname'
                .exec();
            return res.status(200).json(reviews);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching reviews', error });
        }
    }

    // Get review by ID
    public async getReviewById(req: Request, res: Response): Promise<Response> {
        try {
            const review = await ProductReview.findById(req.params.id).populate('user_id', 'fname lname');  // Populate user details
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }
            return res.status(200).json(review);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching review', error });
        }
    }

    // Update a review by ID
    public async updateReview(req: Request, res: Response): Promise<Response> {
        try {
            const updatedReview = await ProductReview.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            }).populate('user_id', 'fname lname');  // Populate user details
            if (!updatedReview) {
                return res.status(404).json({ message: 'Review not found' });
            }
            return res.status(200).json(updatedReview);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating review', error });
        }
    }

    // Delete a review by ID
    public async deleteReview(req: Request, res: Response): Promise<Response> {
        try {
            const deletedReview = await ProductReview.findByIdAndDelete(req.params.id);
            if (!deletedReview) {
                return res.status(404).json({ message: 'Review not found' });
            }
            return res.status(200).json({ message: 'Review deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting review', error });
        }
    }


}

export default new ProductReviewController();
