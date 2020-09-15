"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const news = [
    { id: '1', heading: 'qwewqeqwe', text: 'qwertyuiop', date: new Date(), author: '1' },
    { id: '2', heading: 'asdfasdasd', text: 'asdfghjkl;', date: new Date(), author: '2' },
    { id: '3', heading: 'zxczxczcx', text: 'qwertyuiop', date: new Date(), author: '1' },
    { id: '4', heading: 'fefefefefe', text: 'ghfjkdls;a', date: new Date(), author: '2' }
];
const authors = [
    { id: '1', fio: 'Hachaturyan Anushavan Petrovich', nickname: 'qwertyuiop' },
    { id: '2', fio: 'Иванов Иван Иванович', nickname: 'asdfghjkl;' },
];
// схема
let AuthorsType;
let ArticlesType;
ArticlesType = new graphql_1.GraphQLObjectType({
    name: 'article',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        heading: { type: graphql_1.GraphQLString },
        text: { type: graphql_1.GraphQLString },
        date: { type: graphql_1.GraphQLString },
        author: {
            type: AuthorsType,
            resolve(parent, args) {
                return authors.find(author => author.id === parent.id);
            }
        }
    })
});
AuthorsType = new graphql_1.GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        fio: { type: graphql_1.GraphQLString },
        nickname: { type: graphql_1.GraphQLString },
        articles: {
            type: new graphql_1.GraphQLList(ArticlesType),
            resolve(parent, args) {
                return news.filter(article => article.author === parent.id);
            }
        }
    })
});
//// корневой запрос
const Query = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        article: {
            type: ArticlesType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return news.find(article => article.id === args.id);
            }
        },
        author: {
            type: AuthorsType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return authors.find(author => author.id === args.id);
            }
        },
        news: {
            type: new graphql_1.GraphQLList(ArticlesType),
            resolve(parent, args) {
                return news;
            }
        },
        authors: {
            type: new graphql_1.GraphQLList(AuthorsType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});
exports.schema = new graphql_1.GraphQLSchema({
    query: Query
});
// module.exports
//# sourceMappingURL=schema.js.map