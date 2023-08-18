import axios from "axios";

async function changeCurrVal(dateVal, fromCurr, initValue) {
  try {
    // Convert the date object to ISO 8601 format
    const isoDate = dateVal.toISOString();
    // Extract only the YYYY-MM-DD part
    const yyyyMMdd = isoDate.split('T')[0];
    
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.exchangerate.host/${yyyyMMdd}`,
      headers: {},
    };
    
    const response = await axios.request(config);
    const INRValue=response.data.rates.INR;
    const initCurrency=response.data.rates[fromCurr];
    const factor=INRValue/initCurrency;
    const finalValue =factor*initValue;
    console.log(finalValue);
    return finalValue;
  } catch (error) {
    console.log(error);
  }
}

export { changeCurrVal };
