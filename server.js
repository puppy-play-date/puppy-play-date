const express = require(`express`);
const bodyParser = require(`body-parser`);
const methodOverride = require(`method-override`);
const handlebars = require(`express-handlebars`);
const app = express();
const morgan = require(`morgan`);
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8080;

// Set up Express to handle parsing data
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride(`method`));
app.use(cookieParser());
app.use(morgan());

// Set Handlebars
const routes = require('./routes/puppsController');
app.use('/', routes);

const apiRoutes = require('./routes/api-routes');
app.use('/api', apiRoutes);
app.engine(`handlebars`, handlebars({
  extname: `handlebars`,
  defaultLayout: `main`,
  layoutsDir: __dirname + `/views/layouts/`,
  partialsDir: __dirname + `/views/partials/`,
}));
app.set(`view engine`, `handlebars`);

// Static directory
app.use(express.static(`public`));

// Listen for connections on the port
app.listen(PORT, ()=> console.log(`Server listening on: http://localhost:${PORT}`));
