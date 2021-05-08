var fs = require('fs');
const ruleFile = "reaction_rules.json"

module.exports = {
    name: 'rr',
    description: 'Learn new Reaction Rule',
    execute(message, Member, args) {
        if (!args.length || args.length < 2) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        message.channel.send(`Learning reaction ${args[0]} ${args[1]}`);

        // read file sample.json file
        var jsonParsed = [];
        fs.readFile(ruleFile, 'utf8',
            // callback function that is called when reading file is done
            function (err, data) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
  
                // parse json
                jsonParsed = JSON.parse(data);

            });
        if (!jsonParsed)
            jsonParsed = [];
        jsonParsed.push({
            key: args[0].toLowerCase(),
            value: args[1]
        });
        fs.writeFile(ruleFile, JSON.stringify(jsonParsed), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
        });


    },
};