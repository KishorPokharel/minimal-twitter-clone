const { BaseModel } = require('./BaseModel.model');

class User extends BaseModel {
    static get tableName() {
        return 'users';
    }

    static relationMappings = {
        posts: {
            relation: BaseModel.HasManyRelation,
            modelClass: 'Post.model',
            join: {
                from: 'users.id',
                to: 'posts.userId',
            },
        },
    };
}

module.exports = User;
