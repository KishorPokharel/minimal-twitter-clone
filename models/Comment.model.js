const { BaseModel } = require('./BaseModel.model');

class Comment extends BaseModel {
    static get tableName() {
        return 'comments';
    }

    static relationMappings = {
        user: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: 'User.model',
            join: {
                from: 'comments.userId',
                to: 'users.id',
            },
        },
    };
}

module.exports = Comment;
