import express from "express";
import { connectDB } from "./config/db.js";
import router from "./routes/signup.routes.js";
import path from "path";
const app = express();
const __dirname=path.resolve();
app.use(express.json());
app.use("/api", router);
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist"))); 
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
});
}
app.listen(process.env.X_ZOHO_CATALYST_LISTEN_PORT||3001, () => {
    connectDB();
    console.log(`Server started at http://localhost:3001`);
});
