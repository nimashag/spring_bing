import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import productRoutes from "./routes/product.route";
import orderRoute from "./routes/order.route";
import categoryRoutes from './routes/category.route';
import subCategoryRoutes from './routes/sub.category.route';
import faqRoutes from './routes/faq.route';

dotenv.config();


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Spring Bing backend on notch");
});


app.get('/', (req, res)=> {
    res.send("Spring Bing backend on notch")
})

app.use("/order", orderRoute);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/subCategory', subCategoryRoutes);

app.use('/faqs', faqRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
