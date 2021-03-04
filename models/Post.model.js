const { BaseModel } = require('./BaseModel.model');

class Post extends BaseModel {
    static get tableName() {
        return 'posts';
    }

    static relationMappings = {
        user: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: 'User.model',
            join: {
                from: 'posts.userId',
                to: 'users.id',
            },
        },
        likes: {
            relation: BaseModel.HasManyRelation,
            modelClass: 'Like.model',
            join: {
                from: 'posts.id',
                to: 'likes.postId',
            },
        },
    };
}

module.exports = Post;
