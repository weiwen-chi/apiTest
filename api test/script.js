/*
THIS WILL DISPLAY ONE CRYPTO NAME AND IT'S PRICE
*/

// var apikey = {
//   key: "e3efea13-b74b-49bc-9eec-95f5d0473a69",
// };

// fetch(
//   "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=" +
//     apikey.key
// )
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error("NETWORK RESPONSE ERROR");
//     }
//   })
//   .then((coin) => {
//     console.log(coin);
//     displayData(coin);
//   })
//   .catch((error) => console.error("FETCH ERROR:", error));

// function displayData(coin) {
//   const crypto1 = coin.data[0];
//   const displayCoin = document.getElementById("disp");

//   const coinName = crypto1.name;
//   const heading = document.createElement("h1");
//   heading.innerHTML = coinName;
//   displayCoin.appendChild(heading);

//   const coinPrice = crypto1.quote.USD.price;
//   const heading2 = document.createElement("h2");
//   heading2.innerHTML = coinPrice;
//   displayCoin.appendChild(heading2);
// }

//---------------------------------------------------------------------
/*
TRY DISPLY A TABLE FROM API CALL
*/
const api_url =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=e3efea13-b74b-49bc-9eec-95f5d0473a69";

async function getapi(url) {
  const response = await fetch(url);

  var coin = await response.json();
  console.log(coin);

  show(coin);
}

getapi(api_url);

function show(coin) {
  let tab = `<tr>
          <th>NAME</th>
          <th>PRICE</th>
          <th>DAY VOLUME</th>
          <th>MARKETCAP</th>
         </tr>`;

  for (let r of coin.data) {
    tab += `<tr>
    <td>${r.name} </td>
    <td>${r.quote.USD.price}</td>
    <td>${r.quote.USD.market_cap}</td>
    <td>${r.quote.USD.volume_24h}</td>
</tr>`;
  }

  document.getElementById("disp").innerHTML = tab;
}
