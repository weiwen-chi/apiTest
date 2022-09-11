const router = require("express").Router();
const { User } = require("../../models");
const { Crypto } = require("../../models");
const https = require("https");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    try {
      const api_url =
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=e3efea13-b74b-49bc-9eec-95f5d0473a69";

      await getapi(api_url);
      console.log(`finished`);
    } catch (err) {
      console.log(err);
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

async function getapi(url) {
  https.get(url, (resp) => {
    let data = "";

    // A chunk of data has been received.
    resp.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on("end", async () => {
      try {
        var coin = JSON.parse(data);
        console.log("========================");
        console.log(coin);
        console.log("========================");

        for (let r of coin.data) {
          const name = r.name;
          const price = r.quote.USD.price;
          const marketcap = r.quote.USD.market_cap;
          const day_volume = r.quote.USD.volume_24h;

          const temmp = { name:name, price:price, marketcap:marketcap, day_volume:day_volume };

          console.log("========================");
          console.log(temmp);
          console.log("========================");

          const newCoin = await Crypto.create(temmp);
          newCoin.save();
        }
      } catch (err) {
        console.log(err);
      }
    });
  });
}

// async function getapi(url) {
//   const response = await fetch(url);
//   const coin = await response.json();

//   console.log(coin);
//   try {
//     for (let r of coin.data) {
//       const name = r.name;
//       const price = r.quote.USD.price;
//       const marketcap = r.quote.USD.market_cap;
//       const day_volume = r.quote.USD.volume_24h;

//       const temmp = JSON.stringify({ name, price, marketcap, day_volume });
//       console.log(temmp);
//       console.log("add to database");
//       const newCoin = await Crypto.create(temmp);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }
module.exports = router;
