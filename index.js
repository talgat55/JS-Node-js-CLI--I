#!/usr/bin/env node
const clear = require('clear');
const app = require('commander');
const figlet = require('figlet');
const jsonfile = require('jsonfile');
const mysqldump = require('mysqldump');
const findRemoveSync = require('find-remove');
clear();

const fileConfig = `${process.cwd()}/asmart.json`;
const  parseFileConfig = jsonfile.readFileSync(fileConfig);



app
    .version('1.0.0')
    .option('-d, --db', 'Сделать только дамп базы данных')
    .action(options => {
        // console.log(options.name, 'The name parsed');

        if (options.db){
            findRemoveSync(process.cwd(), {prefix: 'dumppd'});
            mysqldump({
                connection: {
                    host: parseFileConfig.db.host,
                    user: parseFileConfig.db.user,
                    password: parseFileConfig.db.password,
                    database: parseFileConfig.db.database,
                },
                dumpToFile: `${process.cwd()}/dumppd_db${Date.now()}.sql.gz`,
                compressFile: true,
            });
            console.log('success create dump database');
        }

        if(options){

            // figlet('Asmart GIT CLI', function(err, data) {
            //     if (err) {
            //         console.log('Something went wrong...');
            //         console.dir(err);
            //         return;
            //     }
            //     console.log(data)
            // });
        }

    });




app.parse(process.argv);