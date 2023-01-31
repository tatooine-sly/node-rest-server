
const { Router } = require( 'express' );
const { check, query } = require( 'express-validator' );

const { validateFields } = require( '../middlewares/validate-fields' );
const {
    isValidRole,
    existsMail,
    userIdExists,
    isValidOrNullRole } = require( '../helpers/db-validators' );

const {
    usersGet,
    usersPut,
    UsersPost,
    usersDelete,
    usersPatch
} = require( '../controllers/user' );

const router = Router();

router.get( '/', [
    query( 'limit', 'limit has to be numeric' ).isNumeric().optional(),
    query( 'page', 'page has to be numeric' ).isNumeric().optional(),
    validateFields
], usersGet );

router.put( '/:id', [
    check( 'id', 'Not a valid ID' ).isMongoId(),
    check( 'id' ).custom( userIdExists ),
    // check( 'mail' ).custom( existsMail ),
    check( 'role' ).custom( isValidOrNullRole ),
    validateFields
], usersPut );

router.post( '/', [
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'password', 'El password debe de ser de más de 6 caracteres' ).isLength( { min: 6 } ),
    check( 'mail', 'El correo no es válido' ).isEmail(),
    check( 'mail' ).custom( existsMail ),
    check( 'role' ).custom( isValidRole ),
    validateFields
], UsersPost );

router.delete( '/:id', [
    check( 'id', 'Not a valid ID' ).isMongoId(),
    check( 'id' ).custom( userIdExists ),
    validateFields
], usersDelete );

router.patch( '/', usersPatch );



module.exports = router;