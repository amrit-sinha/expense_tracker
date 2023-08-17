import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import fs from 'fs';
import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import {Product} from './model.js';
const moment=require('moment');
const csv=require('csv-parse');

//import {crud} from './routes.js';

const freecurrencyapi = new Freecurrencyapi('fca_live_bdEe90qdIuwXHpkYzxfV6crN6S8HSbyCdyD2ZS4a');



//const DATABASE="mongodb+srv://amritsinha:sinha3696@cluster0.vbkvyw4.mongodb.net/?retryWrites=true&w=majority";

async function ProcessData(x){
fs.readFile(x, 'utf8', (err, csvData) => {
  if (err) {
    console.error('Error reading CSV file:', err);
  } else {
    csv.parse(csvData, {
      delimiter: ','
    }, async (parseErr, data) => {
      if (parseErr) {
        console.error('Error parsing CSV:', parseErr);
      }
      else{
        console.log('Successfully parsed data');
        
// Modify the parsed data as needed
const modifiedData = await up(data)
//console.log(modifiedData);
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


async function up(data) {
  console.log(data.length);
  let list=[];
  for (let i = 1; i < data.length; ++i) {
    //await modifyData(i,data);
    const temp = await new Product({
      Date: moment(data[i][0], "DD-MM-YYYY").toDate(),
      Description: data[i][1],
      Amount: data[i][2],
      Currency: "INR"
    });
    //console.log(temp);
   list.push(temp);
  }
  return list;
}

/*async function modifyData(i,data) {
  try {
    const response = await freecurrencyapi.latest({
      base_currency: data[i][3],
      currencies: 'INR'
    });
    data[i][2] = response.data.INR * data[i][2];
  } catch (error) {
    console.error('Error modifying data:', error);
  }
}*/

export {ProcessData};