"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema/schema");
const app = express_1.default();
const PORT = 8080;
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schema_1.schema, graphiql: true
}));
app.listen(PORT, () => {
    // console.log( `server started at http://localhost:${ PORT }` );
});
// schema ? null : null;
//# sourceMappingURL=index.js.map