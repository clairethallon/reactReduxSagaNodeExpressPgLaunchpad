const router = require( 'express' ).Router();

router.get( '/', ( req, res )=>{
    console.log( 'test GET:', req.body );
    res.send( 'meow' )
})

module.exports = router;