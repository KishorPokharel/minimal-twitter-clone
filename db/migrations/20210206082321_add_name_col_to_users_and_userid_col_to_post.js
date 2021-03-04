exports.up = async function (knex) {
    await knex.schema.table('posts', (table) => {
        table.integer('userId').unsigned().notNullable();

        table.foreign('userId').references('id').inTable('users');
    });

    await knex.schema.table('users', (table) => {
        table.string('name').notNullable();
    });
};

exports.down = async function (knex) {
    await knex.schema.dropColumn('users');
    await knex.schema.dropColumn('posts');
};
