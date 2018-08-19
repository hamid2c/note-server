"use strict";

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bodyParser = require('body-parser');
const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');
const showdown = require("showdown");

function runCmd(cmd) {
    console.log("CMD: " + cmd);
    execSync(cmd);
}


const gitRepoPath = process.env.GIT_REPO_PATH;
// Check user input
if (gitRepoPath === undefined) {
    console.log("The path to the Git repository should be defined as GIT_REPO_PATH environment variable");
    process.exit(1);
}

const repoMainFile = path.join(gitRepoPath, "README.md");
const portNumber = 3300;

const router = express.Router();

function convertToHtml() {
    const text = fs.readFileSync(repoMainFile, 'utf-8');
    const converter = new showdown.Converter();
    const html = converter.makeHtml(text);
    fs.writeFile(path.join(gitRepoPath, "index.html"), 
              html, 'utf8', function(err) {
                  if (err) {
                      console.log("Error in writing html to file");
                  }
              });
}

function processNote(note) {
    var text = "\n# ";
    note.tags.forEach(function (tag, index, array) {
        text += tag;
        if (index !== array.length -1) text += ', ';
    });
    text += "\n" + note.markdown + "\n";
    fs.appendFileSync(repoMainFile, text, 'utf-8');
    convertToHtml();
}
router.route('/notes').get(function(req, res, next) {
    res.json("That's all you get for now!");
});
router.route('/note').post(function(req, res, next) {
   console.log(req.body);
   var note = req.body; // TODO: check the structure
   processNote(note);
   res.json("OK"); 
});


//rest API requirements
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

console.log("Note Server is running on port " + portNumber);
app.listen(portNumber);
//
