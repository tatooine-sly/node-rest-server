const bcriptjs = require( 'bcryptjs' );

const { request, response } = require( 'express' );
const { addSampleUsers } = require( '../helpers/samples' );
const User = require( '../models/user' );

const usersGet = async ( req = request, res = response ) => {
    const { page = 0, limit = 10 } = req.query;
    const query = { status: true };

    const [ users, total ] = await Promise.all( [
        User.find( query ).
            limit( Number( limit ) ).
            skip( Number( page * limit ) ).
            sort( { name: 1 } ),
        User.countDocuments( query )
    ] );

    res.json( {
        total,
        users,
        // userNames: users.map( u => u.name ),
        page, limit
    } );
};

const usersPut = async ( req = request, res = response ) => {
    const { id } = req.params;
    const { _id, password, google, ...rest } = req.body;

    // TODO validar contra BD
    if ( password ) {
        const salt = bcriptjs.genSaltSync();
        rest.password = bcriptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json( {
        user
    } );
};

const UsersPost = async ( req = request, res = response ) => {

    //add sample users
    const { all } = req.query;
    if ( all !== undefined ) {
        const count = await addSampleUsers( 25 );
        return res.status( 200 ).json( {
            msg: `${ count } records added`
        } );
    }
    //End sample users

    const { name, mail, password, role } = req.body;
    const user = new User( { name, mail, password, role } );

    //Encriptar la contraseña
    const salt = bcriptjs.genSaltSync();
    user.password = bcriptjs.hashSync( password, salt );

    //Guardar en BD
    await user.save();

    res.status( 201 ).json( {
        user
    } );
};

const usersDelete = async ( req = request, res = response ) => {
    const { all } = req.query;
    if ( all !== undefined ) {
        console.log( 'TODOS' );
        await User.deleteMany( {} );

        return res.json( {
            msg: 'delete ALL'
        } );
    }

    const { id } = req.params;
    //Borrar de BD
    // const user = await User.findByIdAndDelete( id );

    //marcar como inactivo
    const user = await User.findByIdAndUpdate( id, { status: false } );

    res.json( {
        id, user
    } );
};

const usersPatch = ( req = request, res = response ) => {
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