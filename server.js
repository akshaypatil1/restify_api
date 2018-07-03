'use strict';
const restify = require('restify');
const products = require('./products');
const files = require('./files');
const DEFAULT_PORT = 8080;
const server = restify.createServer({
	name: 'server',
	version: '1.0.0',
	// formatters: {
	// 	'application/json': function (req, res, body, cb) {
	// 		try {
	// 			return cb(null, stringify(body, null, '\t'));
	// 		}
	// 		catch (err) {
	// 			return cb(err);
	// 		}
	// 	},
	// 	'application/vnd.api+json': function (req, res, body, cb) {
	// 		try {
	// 			return cb(null, stringify(body, null, '\t'));
	// 		}
	// 		catch (err) {
	// 			return cb(err);
	// 		}
	// 	}
	// }
});

server.use(function(req,res,next){
	console.log('>>>>>',req.method);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	return next();
});

function corsHandler(req, res, next) {

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
	res.setHeader('Access-Control-Max-Age', '1000');
	
	return next();
}
function optionsRoute(req, res, next) {
	res.send(200);
	return next();
}
server.opts('/\.*/', corsHandler, optionsRoute);

server.use(restify.plugins.bodyParser());

server.get('api/products',products.get);
server.get('api/products/:id',products.getById);
server.post('api/products',products.post);
server.put('api/products/:id',products.put);
server.del('api/products/:id',products.del);

server.get('api/file/:name',files.get);
server.post('api/file',files.post);
server.del('api/file/:name',files.del);

server.listen(DEFAULT_PORT, function(){
	console.log('SERVER STATED AT '+DEFAULT_PORT);
});