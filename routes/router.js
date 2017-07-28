const express = require("express"),
  cfg = require("../config/api");
  request = require("request"),
  http = require("http"),
  qs = require("querystring"),
  router = express.Router();

//INDEX PAGE
router.get("/", (req, res) => {
  res.send("kiwkiwkiw");
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
router.post("/cost", (req, res) => {
  let post_data = qs.stringify({
    origin: req.body.origin,
    destination: req.body.destination,
    weight: req.body.weight,
    courier: req.body.courier
  });

  let post_options = {
    method: "POST",
    hostname: "api.rajaongkir.com",
    port: null,
    path: "/starter/cost",
    headers: {
      key: cfg.key,
      "content-type": "application/x-www-form-urlencoded"
    }
  };

  let post_req = http.request(post_options, function(response) {
    var chunks = [];

    response.on("data", function(chunk) {
      chunks.push(chunk);
    });

    response.on("end", function() {
      var body = Buffer.concat(chunks);
      let data = JSON.parse(body);
      //   console.log(data);
      res.send(data);
    });
  });

  post_req.write(post_data);
  post_req.end();
});

module.exports = router;