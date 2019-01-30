require("../models");


module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    res.render("index", {
      msg: "Welcome!"
      // examples: dbExamples
      // });
    });
  });
  app.get("/profile", function(req, res) {
    res.render("second-screen-design", {
      msg: "Welcome!"
    });
  });
 

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });
  
  app.get("/profile", function(req, res){
    // db.mountains.findAll({}).then(function(data) {
    res.render("second-screen-design", {
    //     mtns: data
    //   });
    // }).catch(function(err) {
    //   console.log(err);
    });
  });


  
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

};
