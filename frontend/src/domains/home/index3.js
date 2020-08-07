const url = 'https://api.covid19api.com/total/country/south-africa/status/confirmed';

function readJson() 
{
  fetch(url)
    .then(response => {
    if (!response.ok) {
      throw new Error("Erro HTTP: " + response.status);
    }
    return response.json();
  })

    .then(json => {
    this.response = json;
    document.getElementById('country').innerHTML = response.data;
    document.getElementById('countryCode').innerHTML = response.data.last_name;
  })
    .catch(function () {
    this.dataError = true;
  })
}

readJson();