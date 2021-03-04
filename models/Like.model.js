const { BaseModel } = require('./BaseModel.model');

class Like extends BaseModel {
    static get tableName() {
        return 'likes';
    }
}

module.exports = Like;
