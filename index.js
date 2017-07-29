const express = require("express"),
  logger = require("morgan"),
  expHbs = require("express-handlebars"),
  bodyParser = require("body-parser"),
  path = require('path'),
  app = express();

app.use(logger("dev"));
app.engine("hbs", expHbs({ defaultLayout: "app", extname: "hbs" }));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes/router"));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
