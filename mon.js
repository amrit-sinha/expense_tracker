import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import fs from 'fs';
import {Product} from './model.js';
const moment=require('moment');
const csv=require('csv-parse');
import { changeCurrVal } from './exchange.js';


async function ProcessData(x){
fs.readFile(`./uploads/${x}`, 'utf8', (err, csvData) => {
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
const modifiedData = await modifyDateAndCurrency(data)
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


async function modifyDateAndCurrency(data) {
  console.log(data.length);
  let list=[];
  const dateMap=new Map();
  for (let i = 1; i < data.length; ++i) {
    const dateVal=moment(data[i][0], "DD-MM-YYYY").toDate();
    const amt=await changeCurrVal(dateVal,data[i][3],data[i][2],dateMap) ;
    const temp = await new Product({
      Date: dateVal,
      Description: data[i][1],
      Amount: amt,
      Currency: "INR"
    });
   list.push(temp);
  }
  return list;
}

export {ProcessData};