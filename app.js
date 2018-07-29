"use strict";

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bodyParser = require('body-parser');
const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');

function runCmd(cmd) {
    console.log("CMD: " + cmd);
    execSync(cmd);
}


const gitRepoPath = process.env.GIT_REPO_PATH;
// check user input
if (gitRepoPath === undefined) {
    console.log("The path to the Git repository should be defined as GIT_REPO_PATH environment variable");
    process.exit(1);
}

const repoMainFile = path.join(gitRepoPath, "main.md");
const portNumber = 3000;

const router = express.Router();

function processNote(note) {
    // write note.tags
    // write note.markdown
    // write new line
    //fs.appendFileSync(repoMainFile, text)
}
router.route('/notes').get(function(req, res, next) {
    res.json("that's all you get for now!");
});
router.route('/note').post(function(req, res, next) {
   console.log(req.body);
   var note = JSON.parse(req.body); // TODO: check the structure
   res.json("whatever"); 
});

//rest API requirements
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

console.log("Note Server is running on port " + portNumber);
app.listen(portNumber);
// yaml2json swagger.yaml -p -i4
