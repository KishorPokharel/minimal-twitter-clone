require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DB_URL,
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds/development',
        },
        debug: true,
    },

    // staging: {
    //     client: 'postgresql',
    //     connection: {
    //         database: 'my_db',
    //         user: 'username',
    //         password: 'password',
    //     },
    //     pool: {
    //         min: 2,
    //         max: 10,
    //     },
    //     migrations: {
    //         tableName: 'knex_migrations',
    //     },
    // },

    // production: {
    //     client: 'postgresql',
    //     connection: {
    //         database: 'my_db',
    //         user: 'username',
    //         password: 'password',
    //     },
    //     pool: {
    //         min: 2,
    //         max: 10,
    //     },
    //     migrations: {
    //         tableName: 'knex_migrations',
    //     },
    // },
};
