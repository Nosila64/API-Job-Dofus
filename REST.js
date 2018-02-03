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
//TODO:: CHANGE ADDRESS FOR :IdX
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
                res.json({"error":"false","message":"personnage ajouté !","idPersonnage":rows.insertId});
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

    router.get('/metier/:idPersonnage', function(req,res) {
        var query = "Select * FROM ?? where ?? = ?";
        var table = ["personnage","idPersonnage",req.params.idPersonnage];
        query = mysql.format(query,table);
        connection.query(query, function(err, rows) {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"Personnage":rows[0]});
            }
        });
    });

    router.post('/job', function(req,res) {
        var query = "INSERT INTO ??(??) VALUES(?)";
        var table = ["metier","nomMetier",req.body.nomMetier];
        query = mysql.format(query,table);
        connection.query(query, function(err,rows)
        {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"message":"Job ajouté !","idMetier":rows.insertId});
            }
        })
    });
    router.get('/jobs', function(req,res) {
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
        var query = "INSERT INTO ??(??,??,??) VALUES(?,?,?);";
        var table = ["recette","idmetier","nomrecette","niveaurecette",req.body.idMetier,req.body.nomRecette, req.body.niveauRecette];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query, [1,2], function(err,rows)
        {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"error":"false","message":"Recette ajouté !","idRecette":rows.insertId});
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
    router.get('/job/:idMetier', function(req,res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var table = ["metier","idMetier",req.params.idMetier];
        query = mysql.format(query,table);
        connection.query(query, function(err, rows) {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"message":"success", "Metier": rows[0]});
            }
        });
    });
    router.get('/recipe/:idRecette', function(req, res) {
        var query = "select * from ?? WHERE ?? = ?";
        var table = ['recette','idrecette',req.params.idRecette];
        query = mysql.format(query,table);
        connection.query(query, function(err, rows) {
            if(err)
            {
                res.json({"error":"true","message":err});
            }
            else
            {
                res.json({"message":"success", "Recette": rows[0]});
            }
        });
    });
    router.post('/ingredient', function(req,res) {
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