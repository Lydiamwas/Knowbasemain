const { kbdocs } = require("../models/index.js");

module.exports = app => {
    const kbdocs = require("../controllers/kbdoc.controller.js");
  
    var router = require("express").Router();
  
    // Create a new document
    router.post("/", kbdocs.create);
  
    // Retrieve all documents
    router.get("/", kbdocs.findAll);
  
    // Retrieve all published documents
    router.get("/published", kbdocs.findAllPublished);
  
    // Retrieve a single document with id
    router.get("/:id", kbdocs.findOne);
  
    // Update a Kbdoc with id
    router.put("/:id", kbdocs.update);
  
    // Delete a document with id
    router.delete("/:id", kbdocs.delete);
  
    // Create a new document by deleting all
    router.delete("/", kbdocs.deleteAll);
  
    app.use('/api/kbdocs', router);
  };