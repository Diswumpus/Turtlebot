const fs = require('fs');
const klawSync = require('klaw-sync')
const path = require('path');
const outFile = 'docs/commands.md'

console.log(`Generating ${outFile}`);
let mdDoc = `# TurtleBot's Commands\n`
mdDoc += `## , Commands\n`

Array.prototype.groupBy = function(prop) {
    return this.reduce(function(groups, item) {
      const val = item[prop]
      groups[val] = groups[val] || []
      groups[val].push(item)
      return groups
    }, {})
  }


// 2) Streams example, non for-await.
// Print out all JS files along with their size within the current folder & subfolders.
var commandFiles = klawSync('./cmds', {nodir: true, traverseAll: true, filter: f => f.path.endsWith('.js')})
let cmds = [];
for (const file of commandFiles) {
    const command = require(`${file.path}`);
    cmds.push({category: command.category, command: command.name, description: command.description, path: path.relative('/home/turtlepaw/TurtleBot',file.path)});
}

var grouped = cmds.groupBy('category');
for (var key in grouped)
{
    if (key != `undefined`)
    {
        mdDoc += `### ${key} \n`
        grouped[key].forEach(c =>
        {
            //mdDoc += "* ``" + `${c.command}` + "``"+ ` ${c.description} (${c.path})\n`
            mdDoc += "* ``" + `,${c.command}` + "``"+ ` ${c.description}\n`
        });
        mdDoc += `\n`;
    }
}

mdDoc += `## Slash Commands\n`

var slashFiles = klawSync('./slash', {nodir: true, traverseAll: true, filter: f => f.path.endsWith('.js')})
let scmds = [];
for (const file of slashFiles) {
    console.log(`loading slash/${file}`);
    const command = require(`${file.path}`);
    scmds.push({name: command.name, path: path.relative('/home/turtlepaw/TurtleBot',file.path)});
    //mdDoc += "* ``" + `${command.name}` + "``"+ ` (${path.relative('/home/turtlepaw/TurtleBot',file.path)})\n`
    mdDoc += "* ``" + `/${command.name}` + "``\n"
}


//## / commands

//* ``/help```
fs.writeFile(outFile, mdDoc, function(err) {
   if (err) {
      return console.error(err);
   }
   console.log("Data written successfully!");
});
