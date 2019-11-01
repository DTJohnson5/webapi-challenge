const express = require("express");
const dbase = require("../data/helpers/actionModel");
const route = express.Router();

route.use(express.json());

route.get("/", (req, res) => {
  dbase
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({error: "Your request was unsuccessful."});
    });
});

route.get("/:id", (req, res) => {
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

route.post("/", validateActionsId, (req, res) => {
  const action = req.body;
  dbase
    .insert(action)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({error: "The action was unable to be added."});
    });
});

route.delete("/:id", (req, res) => {
  const id = req.params.id;
  dbase
    .remove(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: "That action ID does not exist."});
    });
});

route.put("/:id", (req, res) => {
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

function validateActionsId(req, res, next) {
  let id = req.params.id;

  dbase
    .get(id)
    .then(actions => {
      if (actions) {
        next();
      } else {
        res
          .status(400)
          .json({message: "That user was not found on this server."});
      }
    })
    .catch(err => {
      res.status(500).json({error: "That action is not allowed."});
    });
}

module.exports = route;
