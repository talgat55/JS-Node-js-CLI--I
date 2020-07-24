const jsonfile = require('jsonfile');

const config = function(){
    const fileConfig = `${process.cwd()}/asmart.json`;
    const  parseFileConfig = jsonfile.readFileSync(fileConfig);
    console.log(parseFileConfig);
     return parseFileConfig;
};


module.exports = config;

