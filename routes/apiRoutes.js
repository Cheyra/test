var db = require("../models");

module.exports = function(app) {
  //**** hiker table api calls */
  // Get logged in hiker
  app.get("/api/hiker/:user", function(req, res) {
    db.hiker
      .findOne({
        where: {
          user: req.params.user
        },
        include: [db.hikes]
      })
      .then(function(dbHiker) {
        res.json(dbHiker);
      });
  });

  // Get all hikers
  app.get("/api/hiker", function(req, res) {
    db.hiker.findAll({include: [db.hikes]}).then(function(dbHiker) {
      res.json(dbHiker);
    });
  });

  // Create a new hiker
  app.post("/api/hiker", function(req, res) {
    db.hiker.create(req.body).then(function(dbHiker) {
      console.log(req.body);
      res.json(dbHiker);
    });
  });

  // Delete a hiker by id
  app.delete("/api/hiker/:user", function(req, res) {
    db.hiker
      .destroy({
        where: {
          user: req.params.user
        }
      })
      .then(function(dbHiker) {
        res.json(dbHiker);
      });
  });
  //**** mountain table api call to get mountain info */
  app.get("/api/mountains", function(req, res) {
    db.mountains.findAll({}).then(function(data) {
      console.log(data);
      res.json(data);
    }).catch(function(err) {
      console.log(err);
    });
  });
  app.get("/api/mountains/:Name", function(req, res) {
    db.mountains.findOne({
      where: {
        Name: req.params.Name
      },
     
    }).then(function(dbmountain) {
      res.json(dbmountain);
    }).catch(function(err) {
      console.log(err);
    });
  });
  // ***************************************************************
  // *********** hikes table api calls****************************************************

  // GET route for getting all of the hikes
  app.get("/api/hikes", function(req, res) {
    var query = {};
    if (req.query.id) {
      query.id = req.query.id;
    }
    db.hikes.findAll({
      where: query,
      include: [db.hiker]
    }).then(function(dbhikes) {
      res.json(dbhikes);
    });
  });

  // Get route for retrieving a single hike for a single user
  app.get("/api/hikes/:user", function(req, res) {
    db.hikes.findAll({
      where: {
        user: req.params.user
      },
      include: [db.hiker]
    }).then(function(dbhikes) {
      res.json(dbhikes);
    });
  });

  // Get route for retrieving all hikes for a single user
  app.get("/api/hikes/:user", function(req, res) {
    db.hikes.findOne({
      where: {
        user: req.params.user
      },
      include: [db.hiker]
    }).then(function(dbhikes) {
      res.json(dbhikes);
    });
  });

  // POST route for saving a new hike
  app.post("/api/hikes", function(req, res) {
    db.hikes.create(req.body).then(function(dbhikes) {
      res.json(dbhikes);
    });
  });

  // DELETE route for deleting hike
  app.delete("/api/hikes/:user", function(req, res) {
    db.hikes.destroy({
      where: {
        id: req.params.user
      }
    }).then(function(dbhikes) {
      res.json(dbhikes);
    });
  });

  // PUT route for updating hikes
  app.put("/api/hikes", function(req, res) {
    db.hikes.update(
      req.body,
      {
        where: {
          id: req.body.user
        }
      }).then(function(dbhikes) {
      res.json(dbhikes);
    });
  });
};


