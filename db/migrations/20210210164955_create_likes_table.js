exports.up = function (knex) {
    return knex.schema.createTable('likes', (table) => {
        table.increments('id');
        table.integer('postId').unsigned().notNullable();
        table.integer('userId').unsigned().notNullable();

        table.foreign('userId').references('id').inTable('users');
        table.foreign('postId').references('id').inTable('posts');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('likes');
};
