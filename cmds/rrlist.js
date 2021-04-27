////const ruleFile = "reaction_rules.json"

////// include file system module
////var fs = require('fs');

////module.exports = {
////    name: 'rrlist',
////    description: 'List all Reaction Rules',
////    execute(message, Member, args) {
////        var jsonParsed = [];
////        fs.readFile(ruleFile,'utf8',
////            // callback function that is called when reading file is done
//            function (err, data) {
//                if (err) {
//                    console.log("An error occured while writing JSON Object to File.");
//                    return console.log(err);
//                }

//                // parse json
//                jsonParsed = JSON.parse(data);

//                // access elements

//            });
//        if (!jsonParsed)
//            message.channel.send(`Hey Buddy - I'm still pretty dumb and haven't learned anything`);
//        else {
//            jsonParsed.keys().forEach(function (key) {
//                console.log(key, jsonParsed[key]);
//            });

//        }


//    },
//};