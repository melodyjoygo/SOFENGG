const mysql = require("mysql");

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'us-cdbr-iron-east-02.cleardb.net',
            user: 'bcedc81032a31e', 
            port: '3306',
            password: '9a923e5d',
            database: 'heroku_1bf7b538e973671'
        });
    }
    async query(sql, args) {
        try {
            return await new Promise((resolve, reject) => {
                this.connection.query(sql, args, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(rows);
                });
            });
        } catch (error) { }
    }
    async close() {
        try {
            return await new Promise((resolve, reject ) => {
                this.connection.end(err => {
                    if (err)
                        return reject(err);
    
                    resolve();
                });
            });
        } catch (error) { }
    }
}

module.exports = Database;