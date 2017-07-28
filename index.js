const express = require("express"),
  cfg = require("./config/api"),
  http = require("http"),
  qs = require("querystring"),
  logger = require("morgan"),
  request = require("request"),
  expHbs = require("express-handlebars"),
  bodyParser = require("body-parser"),
  app = express();

app.use(logger("dev"));
app.engine("hbs", expHbs({ defaultLayout: "app", extname: "hbs" }));
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("kiwkiwkiw");
});

app.get("/province", (req, res) => {
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

app.get("/city", (req, res) => {
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

app.post("/cost", (req, res) => {
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
      let data = body.toString();
      console.log(data);
    });
  });

  post_req.write(post_data);
  post_req.end();
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
