const fs = require('fs');
const path = require('path');
const pkPath = path.resolve(__dirname, '../../package.json');
const pk = fs.readFileSync(pkPath, 'utf-8');
const version = JSON.parse(pk).version;
const { program } = require('commander');

program
 .version(version)
 .option('-d, --debug', 'output extra debugging')
 .option('-s, --small', 'small pizza size')
 .option('-p, --port <type>', 'add server poty','8989');

program.parse(process.argv);
// console.log(program.opts())


module.exports = program.opts();
