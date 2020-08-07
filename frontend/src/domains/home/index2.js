const axios = require('axios');

const config = {
  method: 'get',
  url: 'https://api.covid19api.com/total/country/south-africa/status/confirmed',
  headers: { }
};

axios(config)
.then(function (response) {
  const data= JSON.stringify(response.data);
  const country = document.getElementById('country')
  country.innerHTML=data;
  console.log(typeof data)
})
.catch(function (error) {
  console.log(error);
});
