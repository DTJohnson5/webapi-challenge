const express = require("express");
const dbase = require("../data/helpers/projectModel");
const route = express.Router();

route.use(express.json());

route.get("/", (req, res) => {
  dbase
    .get()
    .then(task => {
      res.status(200).json({task});
    })
    .catch(err => {
      res.status(500).json({error: "Your request was unsuccessful."});
    });
});

route.get("/:id", validateProjectsId, (req, res) => {
  const id = req.params.id;
  dbase
    .get(id)
    .then(task => {
      res.status(200).json(task);
    })
    .catch(err => {
      res.status(500).json({error: "That project ID doesn't exist."});
    });
});

route.post("/", (req, res) => {
  const task = req.body;
  dbase
    .insert(task)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({error: "That project was unable to be added."});
    });
});

route.delete("/:id", validateProjectsId, (req, res) => {
  const id = req.params.id;
  dbase
    .remove(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: "That project ID does not exist."});
    });
});

route.put("/:id", validateProjectsId, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  dbase
    .update(id, changes)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      res.status(500).json({error: "The update attempt was unsuccessful."});
    });
});

route.get("/:id/actions", validateProjectsId, (req, res) => {
  const { id } = req.params;

  dbase
    .getProjectActions(id)
    .then(task => {
      res.status(200).json(task);
    })
    .catch(err => {
      res.status(500).json({error: "You request did not go through."});
    });
});

function validateProjectsId(req, res, next) {
  let id = req.params.id;

  dbase
    .get(id)
    .then(task => {
      if (task) {
        next();
      } else {
        res.status(400).json({message: "That user was not found on this server."});
      }
    })
    .catch(err => {
      res.status(500).json({error: "That action is not allowed."});
    });
}

module.exports = route;
