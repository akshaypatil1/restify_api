let response = require('./src/response');

function ProductController(){
    let self = this;
    self.store = [];
    let findProductById = function(req){
        let found = self.store.filter(function(p){
            return p.id === parseInt(req.params.id)
        });
        if(found && found.length > 0){
            return found[0];
        }
        return null;
    };

    self.get = function(req,res,next){
       response.sendResult(res,200,self.store,next);
    };

    self.getById = function(req,res,next){
        let found = findProductById(req);
        if(found){
            response.sendResult(res,200,found,next);
        }else{
            response.sendError(res,404,"Product not found",next);
        }
    };

    self.post = function(req,res,next){
        if(!req.body.hasOwnProperty('name')){
            response.sendError(res,500,'Field missing',next);
        }else{
            let index = self.store.length + 1;
            dataObject = {
                id : parseInt(index),
                name : req.body.name
            };
            self.store.push(dataObject);
            response.sendResult(res,201,dataObject,next);
        }
    };

    self.put = function(req,res,next){
        if(!req.body.hasOwnProperty('name')){
            response.sendError(res,500,'Field missing',next);
        }else{
            let found = findProductById(req);
            if(found){
                found.name = req.body.name;
                response.sendResult(res,200,found,next);
            }else{
                response.sendError(res,404,"Product not found",next);
            }
        }
    };

    self.del = function(req, res, next){
        self.store = self.store.filter(function(p){
            return p.id !== parseInt(req.params.id)
        });
        response.sendResult(res,200,{},next);
    }
};

module.exports = new ProductController();