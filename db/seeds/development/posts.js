const faker = require('faker');

exports.seed = function (knex) {
    let seedData = [];

    for (let i = 0; i <= 20; i++) {
        seedData.push({
            title: faker.random.words(9),
            body: faker.random.words(50)
        });
    }

    console.log(seedData);

    return knex('posts')
        .del()
        .then(function () {
            return knex('posts').insert(seedData);
        });
};
