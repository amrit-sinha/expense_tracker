/*import { createRequire } from 'module';
const require = createRequire(import.meta.url);*/
import mongoose from 'mongoose';

const csvSchema = mongoose.Schema({
	Date: {
    type: String,
    //required: true
  },
	Description:{
    type: String,
    //required: true           //schema for the csv data to upload on mongodb
  },
  Amount:{
    type: Number,
    //required: true
  },
  Currency:{
    type: String,
    //required: true
  }

});

const Product = mongoose.model('Product', csvSchema);

export default Product;
export {Product};