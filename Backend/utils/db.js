import mongoose from "mongoose";
const connectDB= async () => {
    try{
     //connects database
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Mongodb Connected Successfully');
    } catch(error){
        console.log("error");
    } 
}

export default connectDB