const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
// const {connection}=require("./configs/db");
const {userRouter}=require("./routes/user.route");
const {adminRouter}=require("./routes/admin.route");
const {productRouter}=require("./routes/products.route");
const {authenticate}=require("./middlewares/authenticate.middleware");
const {cartRouter}=require("./routes/cart.route")
require("dotenv").config();
const app=express();

app.use(cors({
    origin:"*"
}))
app.use(express.json());

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.mongourl);
      console.log("MongoDB Connected");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

app.get("/",(req,res)=>{
    res.send("WELCOME")
})
app.use("/admin",adminRouter);
app.use("/user",userRouter);
app.use(authenticate);
app.use("/products",productRouter);
app.use("/cart",cartRouter)



const port=process.env.port;
// app.listen(port,async(req,res)=>{
//     try {
//         await connection;
//         console.log("Connected to DB");
//     } catch (error) {
//         console.log(error);
//         res.send({"err":"Something went wrong while connecting to db"});
//     }
//     console.log(`The server is running at ${port}`)
// })
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`The server is running at ${port}`);
    })
})