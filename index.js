#!/usr/bin/env node
const clear = require('clear');
const app = require('commander');
const figlet = require('figlet');


clear();
figlet('Asmart GIT CLI', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

app
    .version('1.0.0')
    .option('-d, --db [db]', 'Сделать только дамп базы данных')
    .action(options => {
        // console.log(options.name, 'The name parsed');

        if (options.db){
            console.log('db work');


        }
    });




app.parse(process.argv);