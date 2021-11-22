const express = require( 'express' );
const bodyParser = require( 'body-parser' );
//test route
const test = require( './routes/testRoute' );
const app = express();
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extendede: true } ) );
// use test route
app.use( '/test', test );
const port = 5000;

app.listen( port, ()=>{
    console.log( 'server up on:', port );
});