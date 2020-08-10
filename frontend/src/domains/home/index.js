
let countryIn=document.getElementById('countryInput').value;
countryIn=new String(countryIn);


const zeroPadding = (number) => {
    return String(number).padStart(2, "0");
}

async function newCasesConfirmed(countryInput) {
    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = hoje.getMonth();
    const ano = hoje.getFullYear();
    // const dataInicio = `${ano}-${zeroPadding(mes - 1)}-${dia}T00:00:00Z`;
    const dataFim = `${ano}-${zeroPadding(mes)}-${dia}T00:00:00Z`;
    const filtroData = `from=${dataFim}&to=${dataFim}`;

    const result = await axios.get(
        `https://api.covid19api.com/total/country/${countryInput}/status/confirmed?${filtroData}`);
    const casosPorDia = result.data;

    return casosPorDia[casosPorDia.length - 1].Cases - casosPorDia[0].Cases;
}




// let casesNumber;

function getCountryCode(countryIn) {
    return axios.get (`https://api.covid19api.com/country/${countryIn}`)
    .then (res => {
        const [data] = res.data;
        const country = data.Country;
        const countryCode = data.CountryCode;
        const date = data.Date;
        
        const countryOut= document.getElementById('country').value
        countryOut.innerHTML = country;

        const countryCodeOut = document.getElementById('countryCode').value;
        countryCodeOut.innerHTML = countryCode;

        const casesConfirmedOut = document.getElementById('casesConfirmed').value;
        casesConfirmedOut.innerHTML = casesNumber;
    })

    .catch (error =>
        console.log(error))
}



newCasesConfirmed(countryIn)
    .then( res => {     
        getCountryCode(countryIn);
        casesNumber = res;

    })
    .catch(function (error) {
        console.log(error);
      });



