var stream = require("stream");

const db = require("../models");
const Op = db.Sequelize.Op;
const File = db.files;

exports.uploadFile = (req, res) => {
  File.create({
    title: req.body.title,
    description: req.body.description,
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer,
  })
    .then(() => {
      res.json({
        msg:
          "File uploaded successfully! -> filename = " + req.file.originalname,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Error", detail: err });
    });
};

exports.listAllFiles = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  File.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Kbdocs.",
      });
    });

  // File.findAll({ attributes: ["id", "title", "description", "name"] })
  //   .then((files) => {
  //     res.json(files);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.json({ msg: "Error", detail: err });
  //   });
};
exports.findOne = (req, res) => {
  const id = req.params.id;

  File.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Kbdoc with id=" + id,
      });
    });
};

exports.downloadFile = (req, res) => {
  File.findByPk(req.params.id)
    .then((file) => {
      var fileContents = Buffer.from(file.data, "base64");
      var readStream = new stream.PassThrough();
      readStream.end(fileContents);

      res.set("Content-disposition", "attachment; filename=" + file.name);
      res.set("Content-Type", file.type);

      readStream.pipe(res);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Error", detail: err });
    });
};
