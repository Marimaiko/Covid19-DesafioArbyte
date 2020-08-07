const axios = require("axios");
let rs=require('readline-sync');

function showResponse(res){
    document.querySelector('country').innerHTML = `
        <h1>Informações</h1>
        <pre>
            ${JSON.stringify(res.data,null,'\t')}
        </pre>
    `
}

const zeroPadding = (number) => {
    return String(number).padStart(2, "0");
}

async function newCasesConfirmed(countryInput) {
    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = hoje.getMonth();
    const ano = hoje.getFullYear();

    const dataInicio = `${ano}-${zeroPadding(mes - 1)}-${dia}T00:00:00Z`;
    const dataFim = `${ano}-${zeroPadding(mes)}-${dia}T00:00:00Z`;
    const filtroData = `from=${dataFim}&to=${dataFim}`;


    const result = await axios.get(
        `https://api.covid19api.com/total/country/${countryInput}/status/confirmed?${filtroData}`);
    const casosPorDia = result.data;


   
    return casosPorDia[casosPorDia.length - 1].Cases - casosPorDia[0].Cases;
}

let countryInput=rs.question('Insira um pais: ');
let casesNumber;

function getCountryCode(countryInput) {
    return axios.get (`https://api.covid19api.com/country/${countryInput}/status/confirmed`)
    .then (res => {
        const [data] = res.data;
        const country = data.Country;
        const countryCode = data.CountryCode;
        const date = data.Date;
        showResponse=res;
    })

    .catch (error =>
        console.log(error))
}



newCasesConfirmed(countryInput)
    .then( res => {     
        getCountryCode(countryInput);
        casesNumber = res;
    })
    .catch(function (error) {
        console.log(error);
      });



