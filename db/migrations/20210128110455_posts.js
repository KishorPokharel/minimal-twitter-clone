exports.up = function (knex) {
    return knex.schema.createTable('posts', (table) => {
        table.increments('id');
        table.text('title').notNullable();
        table.text('body').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};
