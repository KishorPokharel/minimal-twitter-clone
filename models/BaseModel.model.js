const { Model } = require('objection');
const knex = require('../db/db');

Model.knex(knex);

class BaseModel extends Model {
    static get modelPaths() {
        return [__dirname];
    }

    // $beforeInsert() {
    //     this.created_at = new Date().toISOString();
    // }

    // $beforeUpdate() {
    //     this.updated_at = new Date().toISOString();
    // }
}

module.exports = {
    BaseModel
};
