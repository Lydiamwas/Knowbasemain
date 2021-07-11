const db = require("../models");
const Kbdoc = db.kbdocs;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  
  const kbdoc = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  
  Kbdoc.create(kbdoc)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Kbdoc."
      });
    });
};


exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Kbdoc.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Kbdocs."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Kbdoc.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Kbdoc with id=" + id
      });
    });
};


exports.update = (req, res) => {
  const id = req.params.id;

  Kbdoc.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Kbdoc was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Kbdoc with id=${id}. Maybe Kbdoc was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Kbdoc with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Kbdoc.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Kbdoc was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Kbdoc with id=${id}. Maybe Kbdoc was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Kbdoc with id=" + id
      });
    });
};


exports.deleteAll = (req, res) => {
  Kbdoc.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Kbdocs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Kbdocs."
      });
    });
};


exports.findAllPublished = (req, res) => {
  Kbdoc.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Kbdocs."
      });
    });
};
