import express  from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from "body-parser";

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.get('/', (req, res)=> {
    res.send("Spring Bing backend on notch")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})