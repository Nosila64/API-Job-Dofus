/**
 * Created by Alison on 25/01/2018.
 */
var mysql = require("mysql");
function REST_ROUTER(router, connection) {
    var self = this;
    self.handleRoutes(router, connection);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection) {
    router.get('/', function(req,res) {
        res.json({"Message" : "GG POTO"});
    });

    router.post('/perso', function(req,res) {
        var query = "INSERT INTO ??(??) VALUES(?)";
        var table = ["personnage","nompersonnage",req.body.nomPersonnage];
        query = mysql.format(query,table);
        connection.query(query, function(err,rows)
        {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"error":"false","message":"personnage ajouté !"});
            }
        })
    });
    router.get('/perso', function(req,res) {
        var query = "SELECT * FROM ??";
        var table = ["personnage"];
        query = mysql.format(query,table);
        connection.query(query, function(err, rows) {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"error":"false","message":"success", "Personnages": rows});
            }
        });
    });
    router.post('/job', function(req,res) {
        var query = "INSERT INTO ??(??) VALUES(?)";
        var table = ["metier","nommetier",req.body.nomMetier];
        query = mysql.format(query,table);
        connection.query(query, function(err,rows)
        {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"error":"false","message":"Job ajouté !"});
            }
        })
    });
    router.get('/job', function(req,res) {
        var query = "SELECT * FROM ??";
        var table = ["metier"];
        query = mysql.format(query,table);
        connection.query(query, function(err, rows) {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"error":"false","message":"success", "Jobs": rows});
            }
        });
    });
    router.post('/recipe', function(req,res) {
        var query = "INSERT INTO ??(??,??,??) VALUES(?,?,?)";
        var table = ["recette","idmetier","nomrecette","niveaurecette",req.body.idMetier,req.body.nomRecette, req.body.niveauRecette];
        query = mysql.format(query,table);
        connection.query(query, function(err,rows)
        {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"error":"false","message":"Recette ajouté !"});
            }
        })
    });
    router.get('/recipe', function(req,res) {
        var query = "SELECT * FROM ??";
        var table = ["recette"];
        query = mysql.format(query,table);
        connection.query(query, function(err, rows) {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"error":"false","message":"success", "Recettes": rows});
            }
        });
    });
    router.post('/ingredients', function(req,res) {
        var query = "INSERT INTO ??(??) VALUES(?)";
        var table = ["ingredient","nomingredient",req.body.nomIngredient];
        query = mysql.format(query,table);
        connection.query(query, function(err,rows)
        {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"error":"false","message":"Ingredient ajouté !"});
            }
        })
    });
    router.get('/ingredients', function(req,res) {
        var query = "SELECT * FROM ??";
        var table = ["ingredient"];
        query = mysql.format(query,table);
        connection.query(query, function(err, rows) {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"error":"false","message":"success", "Ingredients": rows});
            }
        });
    });
    router.post('/recing', function(req,res) {
        var query = "INSERT INTO ??(??,??,??,??) VALUES(?,?,?,?)";
        var table = ["ingredientrecette","idrecette","idingredient","idmetier","quantite",req.body.idrecette, req.body.idingredient, req.body.idmetier, req.body.quantite];
        query = mysql.format(query,table);
        connection.query(query, function(err,rows)
        {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"error":"false","message":"IngRecette ajouté !"});
            }
        })
    });
    router.get('/recing', function(req,res) {
        var query = "SELECT * FROM ?? WHERE idrecette = ? AND idmetier = ?";
        var table = ["ingredientrecette", req.body.idrecette, req.body.idmetier];
        query = mysql.format(query,table);
        connection.query(query, function(err, rows) {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"error":"false","message":"success", "recing": rows});
            }
        });
    });

};
module.exports = REST_ROUTER;