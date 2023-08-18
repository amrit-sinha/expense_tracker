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
    console.log(yyyyMMdd, response.data.rates.AED);
    
    const finalValue = 0; // Calculate your final value here
    return finalValue;
  } catch (error) {
    console.log(error);
  }
}

export { changeCurrVal };
