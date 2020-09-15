import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLID, GraphQLList, GraphQLSkipDirective} from "graphql"
import {Schema, model} from "mongoose"

type compareId<T,U> = (id1: T, id2: U) => boolean


const news = [
    {id: '1', heading: 'qwewqeqwe', text: 'qwertyuiop', date: new Date(), author: '1'},
    {id: '2', heading: 'asdfasdasd', text: 'asdfghjkl;', date: new Date(), author: '2'},
    {id: '3', heading: 'zxczxczcx', text: 'qwertyuiop', date: new Date(), author: '1'},
    {id: '4', heading: 'fefefefefe', text: 'ghfjkdls;a', date: new Date(), author: '2'}
]

const authors = [
    {id: '1', fio: 'Hachaturyan Anushavan Petrovich', nickname: 'qwertyuiop'},
    {id: '2', fio: 'Иванов Иван Иванович', nickname: 'asdfghjkl;'},
];


const authorSchema = new Schema({
    fio: String,
    nickname: String,
})

const articleSchema = new Schema({
    heading: String,
    text: String,
    date: Date,
    authorId: String
})

const articlesModel = model('articles', articleSchema)
const authorsModel = model('authors', authorSchema)


// схема
let AuthorsType: GraphQLObjectType
let ArticlesType: GraphQLObjectType
ArticlesType = new GraphQLObjectType({
    name: 'article',
    fields: () => ({
        id: {type: GraphQLID},
        heading: {type: GraphQLString},
        text: {type: GraphQLString},
        date: {type: GraphQLString},
        author: {
            type: AuthorsType,
            resolve(parent, args){
                return authorsModel.findById(parent.authorId)
            }
        }
    })
})
AuthorsType  = new GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: {type: GraphQLID},
        fio: {type: GraphQLString},
        nickname: {type: GraphQLString},
        articles: {
            type: new GraphQLList(ArticlesType),
            resolve(parent, args){
                return articlesModel.find({authorId: parent.id})
            }
        }
    })
})



//// корневой запрос
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        article: {
            type: ArticlesType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return articlesModel.findById(args.id)
            }
        },
        author: {
            type: AuthorsType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return authorsModel.findById(args.id)
            }
        },
        news: {
            type: new GraphQLList(ArticlesType),
            resolve(parent,args) {
                return articlesModel.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorsType),
            resolve(parent,args) {
                return authorsModel.find({})
            }
        }
    }
} )

export const schema = new GraphQLSchema({
    query: Query
})
// module.exports