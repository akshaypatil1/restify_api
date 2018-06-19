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
        res.send(200,self.store);
        return next();
    };

    self.getById = function(req,res,next){
        let found = findProductById(req);
        if(found){
            res.send(200, found);
        }else{
            res.send(404, "product not found")
        }
        return next();
    };

    self.post = function(req,res,next){
        if(!req.body.hasOwnProperty('name')){
            res.send(500);
        }else{
            let index = self.store.length + 1;
            self.store.push({
                id : parseInt(index),
                name : req.body.name
            });
            res.send(201,{
                id : parseInt(index),
                name : req.body.name
            });
        }
        return next();
    };

    self.put = function(req,res,next){
        if(!req.body.hasOwnProperty('name')){
            res.send(500);
        }
        let found = findProductById(req);
        if(found){
            found.name = req.body.name;
            res.send(200, found);
        }else{
            res.send(404, "Product not found");
        }
        return next();
    };

    self.del = function(req, res, next){
        self.store = self.store.filter(function(p){
            return p.id !== parseInt(req.params.id)
        });
        res.send(200,{});
        return next();
    }
};

module.exports = new ProductController();