
  // let country = document.getElementById('countryInput').value;
  // country=new String(country);

  const zeroPadding = (number) => {
    return String(number).padStart(2, "0");
}




async function getData()
{
  const country = document.getElementById('countryInput').value;

  const hoje = new Date();
  const dia = hoje.getDate();
  const mes = hoje.getMonth();
  const ano = hoje.getFullYear();
  const dataFim = `${ano}-${zeroPadding(mes+1)}-${zeroPadding(dia)}T00:00:00Z`;
  const dataInicio = `${ano}-${zeroPadding(mes+1)}-${zeroPadding(dia-1)}T00:00:00Z`;

  const filtroData = `from=${dataInicio}&to=${dataFim}`;
  // const url =`https://api.covid19api.com/country/${country}/status/confirmed?${filtroData}`
  const url =`https://api.covid19api.com/total/country/${country}/status/confirmed?${filtroData}`


  
  try {
    const res = await axios.get(url);
    // const res = await axios.get(`https://api.covid19api.com/total/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`);

    const data = res.data;


    const goCountry = document.getElementById('country')
    goCountry.innerHTML = `<br><br><br>País selecionado: ${data[0].Country}`;
  
    const goCountryCode = document.getElementById('countryCode')
    goCountryCode.innerHTML = `Código do País: ${data[0].CountryCode}` ;

    const goConfirmed = document.getElementById('casesConfirmed')
    goConfirmed.innerHTML = `Número de casos: ${data[0].Cases}` ;

    const goDate = document.getElementById('lastDate')
    goDate.innerHTML = `Data da última atualização:<br> ${data[0].Date}`;


  }
  catch (error)  {
    console.log('Veeesh...deu ruim', error) 

}    


}




const info = `O primeiro caso da pandemia pelo <a href="https://pebmed.com.br/category/coronavirus">novo coronavírus</a> , SARS-CoV2, foi identificado em Wuhan, na China, no dia 31 de dezembro do último ano. Desde então, os casos começaram a se espalhar rapidamente pelo mundo: primeiro pelo continente asiático, e depois por outros países.

Em fevereiro, a transmissão da Covid-19, nome dado à doença causada pelo SARS-CoV2, no Irã e na Itália chamaram a atenção pelo crescimento rápido de novos casos e mortes, fazendo com que o Ministério da Saúde alterasse a definição de caso suspeito para incluir pacientes que estiveram em outros países. No mesmo dia,<a href="https://pebmed.com.br/ministerio-da-saude-confirma-primeiro-caso-de-coronavirus-no-pais/">o primeiro caso do Brasil foi identificado</a> , em São Paulo.

Em março, a Organização Mundial da Saúde (OMS) definiu o surto da doença como pandemia. Poucos dias depois, foi confirmada a primeira morte no Brasil, em São Paulo. No mesmo dia, dois pacientes que haviam testado positivo para coronavírus, do Rio de Janeiro, vieram a óbito, mas laudos das mortes ainda não foram divulgados`;
const infoCovid = document.getElementById('info-covid')
infoCovid.innerHTML=info;