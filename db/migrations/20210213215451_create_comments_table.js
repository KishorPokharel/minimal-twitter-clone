exports.up = function (knex) {
    return knex.schema.createTable('comments', (table) => {
        table.increments('id');
        table.text('body').notNullable();
        table.integer('userId');
        table.integer('postId');

        table.foreign('userId').references('id').inTable('users');
        table.foreign('postId').references('id').inTable('posts');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('comments');
};
