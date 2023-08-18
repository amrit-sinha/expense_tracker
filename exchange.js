import axios from "axios";

async function changeCurrVal(dateVal,fromCurr,initValue) {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.exchangerate.host/${dateVal}`,
      headers: {},
    };
    
    const response = await axios.request(config);
    console.log(dateVal, response.data.rates.AED);
    //const rates=JSON.parse(response.data.rates);
    //const factor=rates.INR/rates.fromCurr;
    const finalValue=0;//factor*initValue;
    //console.log(finalValue);
    return finalValue;
    //console.log(JSON.parse(response.data));
  } catch (error) {
    console.log(error);
  }
}

export {changeCurrVal};
