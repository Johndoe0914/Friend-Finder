var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

    // requiring Routes
    require("./app/routing/htmlRoutes")(app);
    require("./app/routing/apiRoutes")(app);


app.listen(PORT,function(){
    console.log("App listening on http://localhost:" + PORT)
    

});

