var server = require("express");
var handleBar = require("consolidate").handlebars
var app = server()
const PORT = 5000
var path = require("path")

app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization, Access-Control-Allow-Headers, Access-Control-Allow-Credentials, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Options');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


  app.set('view engine', 'handlebars');
  app.engine('handlebars', handleBar );
  app.use(server.static(path.resolve(__dirname, "Client/dist/darethetruth")))

  app.get("*", (req, res) => {

    res.sendFile(path.resolve(__dirname, "Client/dist/darethetruth/index.html"));
  });


app.listen(PORT, ()=>{
    console.log("server running on port "+ PORT)
})