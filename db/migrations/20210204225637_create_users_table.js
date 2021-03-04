exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.text('googleId').notNullable();
        table.text('email').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
