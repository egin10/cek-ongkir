const express = require("express"),
  cfg = require("../config/api");
  request = require("request"),
  axios = require('axios'),
  http = require("http"),
  qs = require("querystring"),
  router = express.Router();

//INDEX PAGE
router.get("/", (req, res) => {
  res.render('index');
});

//GET PROVINCE
router.get("/province", (req, res) => {
  let options = {
    url: cfg.urlGetProvince,
    headers: {
      key: cfg.key
    }
  };
  request(options, (err, response, results) => {
    if (err) return err;

    if (!err && response.statusCode == 200) {
      let data = JSON.parse(results);
      res.json(data.rajaongkir.results);
    }
  });
});

//GET CITY 
router.get("/city", (req, res) => {
  let options = {
    url: cfg.urlGetCity,
    headers: {
      key: cfg.key
    }
  };
  request(options, (err, response, results) => {
    if (err) return err;

    if (!err && response.statusCode == 200) {
      let data = JSON.parse(results);
      res.json(data.rajaongkir.results);
    }
  });
});

//GET CITY BY PROVINCE_ID
router.get("/city/:province_id", (req, res) => {
  let url = cfg.urlGetCity + "?province=" + req.params.province_id;
  let options = {
    url: url,
    headers: {
      key: cfg.key
    }
  };
  request(options, (err, response, results) => {
    if (err) return err;

    if (!err && response.statusCode == 200) {
      let data = JSON.parse(results);
      res.json(data.rajaongkir.results);
    }
  });
});


//GET COST
router.post('/cost', (req, res) => {
  let dataParse = qs.stringify({
    origin: req.body.origin,
    destination: req.body.destination,
    weight: req.body.weight,
    courier: req.body.courier
  });

  let options = {
    headers: {
      key: cfg.key,
      "content-type": "application/x-www-form-urlencoded"
    }
  }

  axios.post(cfg.urlPostCost, dataParse, options).then((response) => {
    // console.log(response.data);
    let data = response.data.rajaongkir.results;
    res.json(data);
  });
});

module.exports = router;