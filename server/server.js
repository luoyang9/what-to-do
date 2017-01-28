var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');
var mongoose = require('mongoose');

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var { createStore } = require('redux');

var serverConfig = require('./config');
var todoRoutes = require('./routes/todo.routes.js');
var tagRoutes = require('./routes/tag.routes.js');

var app = new express();

//use native promises for mongoose
mongoose.Promise = global.Promise;

//mongodb connection
mongoose.connect(serverConfig.mongoURL, function(err) {
	if(err) {
		console.error('Make sure MongoDB is running!');
		throw err;
	}
})


app.use(compression());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../client")));
app.use('/api/todos', todoRoutes);
app.use('/api/tags', tagRoutes);


app.get('/', (req, res, next) => {
	res.send(path.resolve(__dirname, "../client/index.html"));
});

//server side rendering using route matching
/*
app.use((req, res, next) => {
	const store = createStore(app);

	const html = ReactDOMServer.renderToString(
		<Provider store={store}>
			<Layout />
		</Provider>
	);
});*/


// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`App is running on port: ${serverConfig.port}!`);
  }
  else {
  	console.log("Error starting app: ", error);
  }
});
