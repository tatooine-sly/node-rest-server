
const { Router } = require( 'express' );
const {
    usersGet,
    usersPut,
    UsersPost,
    usersDelete,
    usersPatch
} = require( '../controllers/user' );

const router = Router();

router.get( '/', usersGet );

router.put( '/:id', usersPut );

router.post( '/', UsersPost );

router.delete( '/', usersDelete );

router.patch( '/', usersPatch );



module.exports = router;