const ruleFile = "reaction_rules.json"

// include file system module
var fs = require('fs');

var jsonParsed = [];
fs.readFile(ruleFile, 'utf8',
    // callback function that is called when reading file is done
    function (err, data) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log(data);
        // parse json
        jsonParsed = JSON.parse(data);

        // access elements

    });
console.log("File is",jsonParsed);   