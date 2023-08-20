import axios from "axios";

async function changeCurrVal(dateVal, fromCurr, initValue,dateMap) {
  
  // Convert the date object to ISO 8601 format
  const isoDate = dateVal.toISOString();
  // Extract only the YYYY-MM-DD part
  const yyyyMMdd = isoDate.split('T')[0];
  const existingDate=dateMap.get(yyyyMMdd);

  if(existingDate!=undefined) {
    const INRValue=existingDate.INR;
      const initCurrency=existingDate[fromCurr];
      const factor=INRValue/initCurrency;
      const finalValue =factor*initValue;
      console.log(finalValue);
      return finalValue;
   
    } else {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.exchangerate.host/${yyyyMMdd}`,
      headers: {},
    };

      const response = await axios.request(config);
      dateMap.set(yyyyMMdd,response.data.rates);
      const INRValue=response.data.rates.INR;
      const initCurrency=response.data.rates[fromCurr];
      const factor=INRValue/initCurrency;
      const finalValue =factor*initValue;
      console.log(finalValue);
      return finalValue;
    }
  }


export { changeCurrVal };
