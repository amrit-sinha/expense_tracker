import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import fs from 'fs';
import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import {Product} from './model.js';
const csv=require('csv-parse');
//import {crud} from './routes.js';

const freecurrencyapi = new Freecurrencyapi('fca_live_bdEe90qdIuwXHpkYzxfV6crN6S8HSbyCdyD2ZS4a');

let arr=[];

//const DATABASE="mongodb+srv://amritsinha:sinha3696@cluster0.vbkvyw4.mongodb.net/?retryWrites=true&w=majority";

async function ProcessData(x){
fs.readFile(x, 'utf8', (err, csvData) => {
  if (err) {
    console.error('Error reading CSV file:', err);
  } else {
    csv.parse(csvData, {
      delimiter: ','
    }, (parseErr, data) => {
      if (parseErr) {
        console.error('Error parsing CSV:', parseErr);
      }
      else{
        console.log('Successfully parsed data',data);
        
        arr=data;
// Modify the parsed data as needed
const modifiedData = up();

// Insert the modified data into MongoDB using Mongoose
Product.insertMany(modifiedData)
  .then(() => {
    console.log('Data inserted into MongoDB');
  })
  .catch(insertErr => {
    console.error('Error inserting data into MongoDB:', insertErr);
  });

    }
  }
 )}
});
}


async function up() {
  console.log(arr.length);
  for (let i = 1; i < arr.length; ++i) {
    await modifyData(i);
    const temp = new Product({
      Date: arr[i][0],
      Description: arr[i][1],
      Amount: arr[i][2],
      Currency: "INR"
    });
    try {
      await temp.save();
    } catch (err) {
      console.log('ERROR :', err);
    }
  }
}

async function modifyData(i) {
  try {
    const response = await freecurrencyapi.latest({
      base_currency: arr[i][3],
      currencies: 'INR'
    });
    arr[i][2] = response.data.INR * arr[i][2];
  } catch (error) {
    console.error('Error modifying data:', error);
  }
}

export {ProcessData};