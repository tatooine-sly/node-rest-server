const Role = require( '../models/role' );
const User = require( '../models/user' );


const isValidRole = async ( role = '' ) => {
    const exist = await Role.findOne( { role } );
    if ( !exist ) {
        throw new Error( `El rol ${ rol } no está registrado en la BD` );
    }
};
const isValidOrNullRole = async ( role ) => {
    if ( role ) {
        const exist = await Role.findOne( { role } );
        if ( !exist ) {
            throw new Error( `El rol ${ rol } no está registrado en la BD` );
        }
    }
};

const existsMail = async ( mail = '', { req } ) => {
    console.log( req.params.id );
    const exist = await User.findOne( { mail } );
    const id = req.params.id;
    if ( exist ) {
        throw new Error( `El email ${ mail } está registrado en la BD` );
    }
};

const userIdExists = async ( id = '' ) => {
    const exist = await User.findById( id );
    if ( !exist ) {
        throw new Error( `User with id ${ id } dont exists` );
    }
};

module.exports = {
    isValidRole,
    existsMail,
    userIdExists,
    isValidOrNullRole
};