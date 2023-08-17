
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const DATABASE_URL = "mongodb+srv://amritsinha:sinha3696@cluster0.vbkvyw4.mongodb.net/?retryWrites=true&w=majority";


const connection=await mongoose.connect(DATABASE_URL)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((error)=>{
    console.error('Error connecting to the database:', error);
})


export default connection;
export {connection};
