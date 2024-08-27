import express  from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from 'cors'
import bodyParser from "body-parser"
import connectDB from "./config/db"


import productRoutes from './routes/product.route';

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.get('/', (req, res)=> {
    res.send("Spring Bing backend on notch")
})


app.use('/product', productRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

export default app;

