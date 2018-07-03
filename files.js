let response = require('./src/response');
let path = require('path');
let mime = require('mime');
let fs = require('fs');

function FileController(){
    let self = this;

    self.get = function(req,res,next){
        let file = `${__dirname}/public/${req.params.name}`;
        
        if (!fs.existsSync(file)) {
            response.sendError(res,500,'File not found',next);
        }else{
            let filename = path.basename(file);
            let mimetype = mime.lookup(file);

            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);

            let filestream = fs.createReadStream(file);
            filestream.pipe(res);
            next();
        }
    };

    self.post = function(req,res,next){
        if(!req.body.hasOwnProperty('data') || !req.body.hasOwnProperty('name')){
            response.sendError(res,500,'Field missing',next);
        }else{
            let file = `${__dirname}/public/${req.body.name}`;
        
            if (fs.existsSync(file)) {
                response.sendError(res,500,'Duplicate File name',next);
            }else{
                fs.writeFile(file, req.body.data, function (err) {
                    if (err){
                        console.log(err, err.message);
                        response.sendError(res,500,err.message,next);
                    }
                    response.sendResult(res,201,`${req.params.name} created successfully.`,next);
                });
                
            }    
        }
    };

    self.del = function(req, res, next){
        let file = `${__dirname}/public/${req.params.name}`;
        if (!fs.existsSync(file)) {
            response.sendError(res,500,'File not found',next);
        }else{
            fs.unlink(file, function(err) {
                if (err) {
                    response.sendError(res,500,err.message,next);
                }
                response.sendResult(res,200,`${req.params.name} deleted successfully.`,next);
            });
        }
    }
};

module.exports = new FileController();