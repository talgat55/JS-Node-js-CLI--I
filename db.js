const mysqldump = require('mysqldump');
const findRemoveSync = require('find-remove');
const jsonfile = require('jsonfile');
const dbDump = function () {
    const fileConfig = `${process.cwd()}/asmart.json`;
    const  parseFileConfig = jsonfile.readFileSync(fileConfig);
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
};

module.exports = dbDump;