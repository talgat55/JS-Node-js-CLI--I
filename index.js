#!/usr/bin/env node
const clear = require('clear');
const app = require('commander');
const figlet = require('figlet');
const fs = require('fs');
const git = require('simple-git')();

const fsE = require('fs-extra');
const dbDump = require('./db');

clear();





app
    .version('1.0.0')
    .option('-d, --db', 'Сделать только дамп базы данных')
    .option('-c, --commit [commit]', 'Коммит')
    .option('-b, --branch [branch] ', 'Ветка')
    .option('-i, --init [init] ', 'Добавить файл конфигурации')
    .action(options => {
        // console.log(options.name, 'The name parsed');

        if (options.db){  // create dump DB
            dbDump();
        }

        if (options.init){ // add file config in folder project
            // fs.mkdirSync('test');
            // // console.log(options.name,  process.cwd());
            // fs.chmodSync(process.cwd() + '/test', '775');
            //
            fsE.copySync( __dirname+ '/asmart.json.example',process.cwd()  + '/' , err => {
                if (err) return console.error(err);
                console.log('success add file config');
            })

            // fs.mkdirSync('test');
            // // console.log(options.name,  process.cwd());
            // fs.chmodSync(process.cwd() + '/test', '775');
            // fsE.copy( __dirname+ '/asmart.json.example',process.cwd() +  '/test/'  , err => {
            //     if (err) return console.error(err);
            //     console.log('success!');
            // })
            // fs.copyFile(__dirname+ '/asmart.json.example', process.cwd() + '/', (err) => {
            //     if (err) throw err;
            //     console.log('success add file config');
            // });

        }


        if (options.commit){  //   commit
            let stepsCommit = new Promise((resolve, reject) => {
                dbDump();
                resolve(true)
            });
            stepsCommit.then(() =>{
                let readyBranch;
                if(options.branch){
                    readyBranch =  options.branch;
                }else{
                    readyBranch = 'master';
                }
                function initialiseRepo (git) {
                    return git.init()
                        .then(() => git.addRemote('origin', parseFileConfig.git.remote_url))
                }

                git.checkIsRepo()
                    .then(isRepo => !isRepo && initialiseRepo(git))
                    .then(() =>{
                        git.add('./*')
                            .commit(options.commit)
                            .push(['-u', 'origin', readyBranch], () => console.log('done  push in git '));
                    });
            });

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