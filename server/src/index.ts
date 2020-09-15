import express from "express";
import {graphqlHTTP} from "express-graphql"
import {schema} from './schema/schema'
import {connect, connection} from "mongoose"

const app = express()
const PORT = 808
const connectionUrl =  'mongodb+srv://myTestGraph:Qweewq123@cluster0.z0qq5.mongodb.net/<dbname>?retryWrites=true&w=majority'
connect( connectionUrl , { useUnifiedTopology: true });


// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "qwe world!" );
} );

app.use('/graphql', graphqlHTTP({
    schema, graphiql: true
}))

connection.on('open', info=>console.log('[dbConnection] :started, url: ' + connectionUrl))
connection.on('error', info=>console.log('[dbConnection] : error, ',info))

app.listen(PORT, () => {
    console.log( `server started at http://localhost:${ PORT }` );
})

// schema ? null : null;