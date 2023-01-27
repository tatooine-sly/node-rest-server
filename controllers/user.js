const { request, response } = require( 'express' );



const usersGet = ( req = request, res = response ) => {
    const { page = 1, limit = 10 } = req.query;
    res.json( {
        msg: 'get API',
        page, limit
    } );
};

const usersPut = ( req, res ) => {
    const { id } = req.params;
    const body = req.body;
    res.json( {
        msg: 'put API',
        id,
        body
    } );
};


const UsersPost = ( req = request, res = response ) => {
    const { nombre, edad } = req.body;
    res.status( 201 ).json( {
        msg: 'post API',
        nombre, edad,
        body: req.body
    } );
};

const usersDelete = ( req, res ) => {
    res.json( {
        msg: 'delete API'
    } );
};


const usersPatch = ( req, res ) => {
    res.json( {
        msg: 'patch API'
    } );
};


module.exports = {
    usersGet,
    usersPut,
    UsersPost,
    usersDelete,
    usersPatch,
};